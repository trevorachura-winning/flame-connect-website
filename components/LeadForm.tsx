"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./Icons";
import type { Intent } from "../lib/site";

const TOPICS = [
  "Digital & Communications",
  "AI in Business",
  "Consulting & Thought Leadership",
  "Product (tools, access & waitlists)",
  "Learning & Flame Academy",
  "Community",
  "Partnership",
  "Media or speaking",
  "Other",
];

const INTENT_TOPIC: Record<Intent, string> = {
  consultation: "Other",
  access: "Product (tools, access & waitlists)",
  waitlist: "Product (tools, access & waitlists)",
  community: "Community",
  learning: "Learning & Flame Academy",
  partnership: "Partnership",
  newsletter: "Other",
  media: "Media or speaking",
  other: "Other",
};

const INTENT_HEADLINE: Partial<Record<Intent, { title: string; copy: string }>> = {
  access: { title: "Request access", copy: "Tell us which tool and we will handle the rest honestly — including telling you if the timing is wrong." },
  waitlist: { title: "Join a product waitlist", copy: "We only use your details for product updates unless you choose broader Flame communications." },
  consultation: { title: "Book a consultation", copy: "Describe the challenge. We will respond with a useful next step, not a sales script." },
  community: { title: "Join the Flame community", copy: "Tell us what you want to learn, test or share." },
  learning: { title: "Learning & Flame Academy", copy: "Individual, team or organization — tell us the goal and the group size." },
  partnership: { title: "Partner with Flame", copy: "Programme delivery, research, ecosystem work or investment conversation — start here." },
  media: { title: "Media & speaking", copy: "For an informed African perspective on AI and digital change — interviews, panels, commentary." },
};

type FieldErrors = Record<string, string>;

/** Static demo builds (NEXT_OUTPUT=export) have no /api — say so instead of erroring. */
const STATIC_DEMO = process.env.NEXT_PUBLIC_STATIC_DEMO === "1";

export function LeadForm({
  initialIntent = "consultation",
  initialProduct,
  initialService,
}: {
  initialIntent?: Intent;
  initialProduct?: string;
  initialService?: string;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    country: "",
    topic: INTENT_TOPIC[initialIntent] ?? "Other",
    message:
      initialIntent === "waitlist" && initialProduct
        ? `Please add me to the ${initialProduct.replace(/-/g, " ")} waitlist.\n\n`
        : initialIntent === "access" && initialProduct
          ? `I would like access updates for ${initialProduct.replace(/-/g, " ")}.\n\n`
          : initialService
            ? `I would like to talk about the ${initialService.replace(/-/g, " ")} service.\n\n`
            : "",
    route: "Email",
    consent: false,
    hp: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [serverError, setServerError] = useState("");

  const headline = INTENT_HEADLINE[initialIntent];

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (form.name.trim().length < 2) e.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "A valid work email helps us reply to the right place.";
    if (!form.organization.trim()) e.organization = "Organization helps us understand your context — write 'Independent' if none.";
    if (!form.country.trim()) e.country = "Country matters — we work across African markets and context counts.";
    if (form.message.trim().length < 10) e.message = "A sentence or two about the challenge helps us route this usefully.";
    if (!form.consent) e.consent = "We need your OK to use these details to respond.";
    return e;
  }

  async function submit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById("form-error-summary")?.focus();
      return;
    }
    if (STATIC_DEMO) {
      setServerError(
        "This is the static preview build — the live form backend runs on the deployed site. Everything else here is fully functional."
      );
      return;
    }
    setState("busy");
    setServerError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: initialIntent,
          product: initialProduct ?? null,
          name: form.name,
          email: form.email,
          organization: form.organization,
          country: form.country,
          topic: form.topic,
          message: form.message,
          route: form.route,
          consent: form.consent,
          hp: form.hp,
        }),
      });
      const data = await res.json();
      if (res.status === 422 && data?.fieldErrors) {
        setErrors(data.fieldErrors);
        setState("idle");
        document.getElementById("form-error-summary")?.focus();
        return;
      }
      if (!res.ok || !data?.ok) {
        setServerError(data?.error ?? "Something went wrong on our side. Please try again.");
        setState("idle");
        return;
      }
      setState("done");
    } catch {
      setServerError("Network problem — please check your connection and try again.");
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div className="form-success" role="status">
        <span className="ok-ring"><Icon name="check" size={26} /></span>
        <h2 className="display-3">Got it — thank you, {form.name.split(" ")[0]}.</h2>
        <p className="lede" style={{ marginInline: "auto", fontSize: "1rem" }}>
          Your {headline ? headline.title.toLowerCase() : "enquiry"} is in. A person — not an
          autoresponder — will read it, and you will hear back with a genuinely useful next step.
          If anything changes meanwhile, just reply to our message.
        </p>
      </div>
    );
  }

  const errorEntries = Object.entries(errors).filter(([, v]) => v);

  return (
    <form onSubmit={submit} noValidate aria-describedby="form-note">
      {headline && (
        <div style={{ marginBottom: "1.4rem" }}>
          <h2 className="display-3" style={{ fontSize: "1.5rem" }}>{headline.title}</h2>
          <p className="small muted" style={{ marginTop: "0.4rem" }}>{headline.copy}</p>
        </div>
      )}

      {(errorEntries.length > 0 || serverError) && (
        <div className="form-error-summary" id="form-error-summary" tabIndex={-1} role="alert" aria-label="Form errors">
          {serverError ? (
            <p>{serverError}</p>
          ) : (
            <>
              <p><b>Please fix {errorEntries.length} {errorEntries.length === 1 ? "thing" : "things"} before sending:</b></p>
              <ul>
                {errorEntries.map(([k, v]) => (
                  <li key={k}><a href={`#f-${k}`}>{v}</a></li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      <div className="form-grid">
        <div className="field" id="f-name">
          <label htmlFor="lead-name">Name <span className="req" aria-hidden="true">*</span></label>
          <input id="lead-name" name="name" autoComplete="name" value={form.name}
            onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} required />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="field" id="f-email">
          <label htmlFor="lead-email">Work email <span className="req" aria-hidden="true">*</span></label>
          <input id="lead-email" name="email" type="email" autoComplete="email" value={form.email}
            onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} required />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="field" id="f-organization">
          <label htmlFor="lead-org">Organization <span className="req" aria-hidden="true">*</span></label>
          <input id="lead-org" name="organization" autoComplete="organization" value={form.organization}
            onChange={(e) => set("organization", e.target.value)} aria-invalid={!!errors.organization} required />
          {errors.organization && <span className="field-error">{errors.organization}</span>}
        </div>

        <div className="field" id="f-country">
          <label htmlFor="lead-country">Country <span className="req" aria-hidden="true">*</span></label>
          <input id="lead-country" name="country" autoComplete="country-name" value={form.country}
            onChange={(e) => set("country", e.target.value)} aria-invalid={!!errors.country} required />
          {errors.country && <span className="field-error">{errors.country}</span>}
        </div>

        <div className="field full" id="f-topic">
          <label htmlFor="lead-topic">What do you need help with?</label>
          <select id="lead-topic" name="topic" value={form.topic} onChange={(e) => set("topic", e.target.value)}>
            {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="field full" id="f-message">
          <label htmlFor="lead-message">Tell us about the challenge <span className="req" aria-hidden="true">*</span></label>
          <span className="hint" id="form-note">
            Tell us enough to understand the challenge. Please do not include passwords, confidential
            personal data or sensitive client information.
          </span>
          <textarea id="lead-message" name="message" value={form.message}
            onChange={(e) => set("message", e.target.value)} aria-invalid={!!errors.message} required />
          {errors.message && <span className="field-error">{errors.message}</span>}
        </div>

        <div className="field">
          <label htmlFor="lead-route">Preferred contact route</label>
          <select id="lead-route" name="route" value={form.route} onChange={(e) => set("route", e.target.value)}>
            <option>Email</option>
            <option>Phone</option>
            <option>WhatsApp</option>
          </select>
          <span className="hint">If you choose phone or WhatsApp, include your number in your message.</span>
        </div>

        {/* Honeypot — invisible to humans */}
        <div className="hp-field" aria-hidden="true">
          <label htmlFor="lead-company-website">Company website</label>
          <input id="lead-company-website" name="company_website" tabIndex={-1} autoComplete="off"
            value={form.hp} onChange={(e) => set("hp", e.target.value)} />
        </div>

        <div className="field full consent" id="f-consent">
          <input id="lead-consent" type="checkbox" checked={form.consent}
            onChange={(e) => set("consent", e.target.checked)} aria-invalid={!!errors.consent} required />
          <label htmlFor="lead-consent" style={{ fontWeight: 400 }}>
            I am happy for Flame Connect to use these details to respond to this enquiry, as
            described in the <a href="/privacy">privacy notice</a>. <span className="req" aria-hidden="true">*</span>
          </label>
        </div>
        {errors.consent && <span className="field-error" style={{ gridColumn: "1 / -1" }}>{errors.consent}</span>}
      </div>

      <button className="btn btn-primary" type="submit" disabled={state === "busy"} style={{ marginTop: "1.4rem" }}>
        {state === "busy" ? "Sending…" : "Send enquiry"} <Icon name="arrow-right" size={17} />
      </button>
    </form>
  );
}
