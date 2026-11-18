import { NextResponse } from "next/server";
import { deliverLead } from "../../../lib/lead-delivery";

/**
 * Lead capture endpoint.
 *
 * Controls (brief section 23):
 * - server-side validation with field-level errors
 * - honeypot spam trap (silent accept, never delivered)
 * - per-IP sliding-window rate limit
 * - success only after LEAD_WEBHOOK_URL acknowledges receipt (no log-only fallback)
 * - free-text message is NEVER logged in full / never sent to analytics
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const MAX_BODY = 16_000;

const buckets = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (buckets.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    buckets.set(ip, hits);
    return true;
  }
  hits.push(now);
  buckets.set(ip, hits);
  // Occasional housekeeping so the map does not grow unbounded.
  if (buckets.size > 5_000) buckets.clear();
  return false;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_INTENTS = new Set([
  "consultation", "access", "waitlist", "community", "learning", "partnership", "newsletter", "media", "other",
]);

type Body = Record<string, unknown>;
const txt = (v: unknown, max = 4000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function validate(body: Body) {
  const fieldErrors: Record<string, string> = {};
  const intent = txt(body.intent, 40) || "other";
  const isNewsletter = intent === "newsletter";

  if (!VALID_INTENTS.has(intent)) fieldErrors.intent = "Unknown intent.";

  const email = txt(body.email, 320);
  if (!EMAIL.test(email)) fieldErrors.email = "A valid email address is required.";

  let name = "", organization = "", country = "", message = "";
  if (!isNewsletter) {
    name = txt(body.name, 200);
    organization = txt(body.organization, 200);
    country = txt(body.country, 120);
    message = txt(body.message, 4000);
    if (name.length < 2) fieldErrors.name = "Name is required.";
    if (!organization) fieldErrors.organization = "Organization is required ('Independent' is fine).";
    if (!country) fieldErrors.country = "Country is required.";
    if (message.length < 10) fieldErrors.message = "Please describe the challenge briefly.";
    if (body.consent !== true) fieldErrors.consent = "Consent is required to respond.";
  }

  return {
    fieldErrors,
    clean: {
      intent,
      product: txt(body.product, 120) || null,
      name, organization, country, message,
      email,
      topic: txt(body.topic, 120),
      route: txt(body.route, 40),
    },
  };
}

export async function POST(request: Request) {
  // Prefer x-real-ip: on Vercel the platform sets it to the client IP, while the
  // first x-forwarded-for hop is client-supplied and therefore spoofable.
  const ip =
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions in a short time. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) {
    return NextResponse.json({ ok: false, error: "Message is too long." }, { status: 413 });
  }

  let body: Body;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Reject JSON primitives/null before accessing body fields.
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept but never deliver.
  if (typeof body.hp === "string" && body.hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const { fieldErrors, clean } = validate(body);
  if (Object.keys(fieldErrors).length) {
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 });
  }

  const delivery = await deliverLead(process.env.LEAD_WEBHOOK_URL, {
    source: "flame-connect-website",
    receivedAt: new Date().toISOString(),
    ...clean,
  });

  // Serverless logs cannot recover the message. Never show a "received" state
  // unless a configured destination has actually acknowledged the enquiry.
  if (!delivery.ok) {
    console.warn(`[lead] delivery unavailable: ${delivery.reason}`);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your enquiry right now. Please try again later." },
      { status: delivery.reason === "not-configured" ? 503 : 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "Use the form at /contact to reach us." },
    { status: 405 }
  );
}
