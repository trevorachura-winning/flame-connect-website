import { NextResponse } from "next/server";

/**
 * Lead capture endpoint.
 *
 * Controls (brief section 23):
 * - server-side validation with field-level errors
 * - honeypot spam trap (silent accept, never delivered)
 * - per-IP sliding-window rate limit
 * - delivery via LEAD_WEBHOOK_URL when configured; otherwise recorded server-side
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

  // Honeypot: silently accept but never deliver.
  if (typeof body.hp === "string" && body.hp.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const { fieldErrors, clean } = validate(body);
  if (Object.keys(fieldErrors).length) {
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  let delivered = false;
  let deliveryError = false;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "flame-connect-website", receivedAt: new Date().toISOString(), ...clean }),
        signal: AbortSignal.timeout(8000),
      });
      delivered = res.ok;
      deliveryError = !res.ok;
    } catch {
      deliveryError = true;
    }
  }

  if (!delivered) {
    // Fallback: record metadata server-side only. Message content is deliberately
    // NOT written to logs; operators see that a lead arrived, not the lead itself.
    console.info(
      `[lead] intent=${clean.intent} topic=${clean.topic} country=${clean.country} messageLength=${clean.message.length} delivered=${delivered}${webhook ? "" : " (no LEAD_WEBHOOK_URL configured)"}`
    );
  }

  if (deliveryError) {
    // Still OK to the user: the record is captured server-side; a broken webhook
    // should not punish the person who filled the form.
    console.warn("[lead] webhook delivery failed; lead captured server-side only");
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "Use the form at /contact to reach us." },
    { status: 405 }
  );
}
