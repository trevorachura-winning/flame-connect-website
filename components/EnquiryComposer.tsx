"use client";

import { useState, type MouseEvent } from "react";
import { Icon } from "./Icons";
import { SITE, type Intent, INTENT_LABELS } from "../lib/site";
import { gmailComposeHref, mailtoHref, outlookComposeHref, whatsappHref } from "../lib/links";

/**
 * Website-only enquiry composer. Nothing is sent to a server: the visitor
 * writes the enquiry here, then it opens — prefilled — in their own email app
 * or in WhatsApp, and they press send there. No data is stored by this site.
 */

const TOPICS = [
  "Digital & Communications",
  "AI in Business",
  "Consulting & Thought Leadership",
  "Flame OS (early access & demos)",
  "Flame Academy (partnerships & clubs)",
  "Partnership",
  "Media or speaking",
  "Other",
];

const INTENT_TOPIC: Record<Intent, string> = {
  consultation: "Other",
  access: "Flame OS (early access & demos)",
  waitlist: "Flame OS (early access & demos)",
  community: "Other",
  learning: "Other",
  partnership: "Partnership",
  newsletter: "Other",
  media: "Media or speaking",
  other: "Other",
};

const SERVICE_TOPIC: Record<string, string> = {
  "digital-communications": "Digital & Communications",
  "ai-in-business": "AI in Business",
  "consulting-thought-leadership": "Consulting & Thought Leadership",
};

const titleCase = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bOs\b/, "OS");

function starterMessage(intent: Intent, product?: string, service?: string): string {
  if (intent === "waitlist" && product === "flame-academy") return "We would like to register our interest in Flame Academy for our learners.";
  if (intent === "waitlist" && product) return `Please add me to the ${titleCase(product)} early-access list.`;
  if (intent === "access" && product) return `I would like to discuss access to ${titleCase(product)}.`;
  if (intent === "newsletter") return "Please keep me updated on Flame Connect news, resources and events.";
  if (service) return `I would like to talk about your ${SERVICE_TOPIC[service] ?? titleCase(service)} service.`;
  if (product) return `I would like to know more about ${titleCase(product)}.`;
  return "";
}

export function EnquiryComposer({
  intent,
  product,
  service,
}: {
  intent: Intent;
  product?: string;
  service?: string;
}) {
  const [form, setForm] = useState({
    name: "",
    organization: "",
    topic:
      product === "flame-academy"
        ? "Flame Academy (partnerships & clubs)"
        : (service && SERVICE_TOPIC[service]) || INTENT_TOPIC[intent] || "Other",
    message: starterMessage(intent, product, service),
  });
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [opened, setOpened] = useState<null | "email" | "whatsapp">(null);
  const [copied, setCopied] = useState(false);

  const hasEmail = Boolean(SITE.contactEmail);
  const hasWhatsApp = Boolean(SITE.contactWhatsApp);
  const channelsReady = hasEmail || hasWhatsApp;

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function validate(): boolean {
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = "Please tell us your name.";
    if (form.message.trim().length < 10) next.message = "Please describe what you would like help with (a sentence or two).";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(next.name ? "enq-name" : "enq-message")?.focus();
      return false;
    }
    return true;
  }

  const heading =
    intent === "waitlist" && product === "flame-academy"
      ? "Register interest in Flame Academy"
      : intent === "waitlist" && product
        ? `Join early access to ${titleCase(product)}`
        : intent === "waitlist"
          ? "Join early access"
          : INTENT_LABELS[intent];
  const subject = `${heading}: ${form.topic}${form.organization.trim() ? ` (${form.organization.trim()})` : ""}`;
  const body = [
    form.message.trim(),
    "",
    `Name: ${form.name.trim()}`,
    form.organization.trim() ? `Organisation: ${form.organization.trim()}` : null,
    `Topic: ${form.topic}`,
    product ? `Product: ${titleCase(product)}` : null,
    "",
    "Sent from the Flame Connect website",
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  // Real links (not scripted window.open / location changes) so the phone or
  // computer hands them to the right app, including inside in-app browsers
  // (WhatsApp, Instagram, LinkedIn) that block scripted pop-ups.
  const emailHref = mailtoHref(subject, body);
  const gmailHref = gmailComposeHref(subject, body);
  const outlookHref = outlookComposeHref(subject, body);
  const waHref = whatsappHref(`${subject}\n\n${body}`);

  function onEmail(e: MouseEvent<HTMLAnchorElement>) {
    if (!validate()) { e.preventDefault(); return; }
    setOpened("email");
  }

  function onWhatsApp(e: MouseEvent<HTMLAnchorElement>) {
    if (!validate()) { e.preventDefault(); return; }
    setOpened("whatsapp");
  }

  async function copyMessage() {
    const text = `To: ${SITE.contactEmail ?? ""}\nSubject: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!validate()) return;
        const href = emailHref ?? waHref;
        if (href) {
          setOpened(emailHref ? "email" : "whatsapp");
          window.location.href = href;
        }
      }}
      noValidate
      aria-describedby="enq-note"
    >
      <div style={{ marginBottom: "1.4rem" }}>
        <h2 className="display-3" style={{ fontSize: "1.5rem" }}>{heading}</h2>
        <p className="small muted" style={{ marginTop: "0.4rem" }}>
          Write your enquiry here, then send it from your own email or WhatsApp. Your message opens
          ready to send. This website does not store or send anything you type.
        </p>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="enq-name">Your name <span className="req" aria-hidden="true">*</span></label>
          <input id="enq-name" autoComplete="name" value={form.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? "enq-name-err" : undefined} required />
          {errors.name && <span className="hint" id="enq-name-err" role="alert">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="enq-org">Organisation</label>
          <input id="enq-org" autoComplete="organization" value={form.organization}
            onChange={(e) => set("organization", e.target.value)} />
        </div>
        <div className="field full">
          <label htmlFor="enq-topic">What is it about?</label>
          <select id="enq-topic" value={form.topic} onChange={(e) => set("topic", e.target.value)}>
            {TOPICS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="field full">
          <label htmlFor="enq-message">What are you trying to improve? <span className="req" aria-hidden="true">*</span></label>
          <textarea id="enq-message" rows={6} value={form.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!errors.message} aria-describedby={errors.message ? "enq-message-err" : undefined} required />
          {errors.message && <span className="hint" id="enq-message-err" role="alert">{errors.message}</span>}
        </div>
      </div>

      {channelsReady ? (
        <div className="hero-actions" style={{ marginTop: "1.4rem" }}>
          {hasEmail && (
            <a href={emailHref ?? undefined} className="btn btn-primary" onClick={onEmail}>
              Send by email <Icon name="mail" size={18} />
            </a>
          )}
          {hasWhatsApp && (
            <a
              href={waHref ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={hasEmail ? "btn btn-outline" : "btn btn-primary"}
              onClick={onWhatsApp}
            >
              Continue on WhatsApp <Icon name="arrow-up-right" size={18} />
            </a>
          )}
        </div>
      ) : (
        <div className="pending-block" style={{ marginTop: "1.4rem", textAlign: "left" }} role="status">
          <h3>Direct contact details are being confirmed</h3>
          <p>
            Our public email and WhatsApp line are being finalised and will appear here before
            launch. Nothing you type on this page is sent anywhere.
          </p>
        </div>
      )}

      <p id="enq-note" className="small muted" style={{ marginTop: "1rem" }} aria-live="polite">
        {opened === "email"
          ? "Your email app should now be open with your message ready. Press send there."
          : opened === "whatsapp"
            ? "WhatsApp should now be open in a new tab with your message ready. Press send there."
            : "Please do not include passwords, confidential client information or sensitive personal data."}
      </p>

      {opened === "email" && (
        <div className="contact-note" style={{ marginTop: "1rem" }}>
          <h3 style={{ fontSize: "1rem" }}>Nothing opened?</h3>
          <p className="small" style={{ marginBottom: "0.8rem" }}>
            If you use email in your browser, open your message there instead, or copy it and send it
            to <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>
          <div className="hero-actions" style={{ marginTop: 0 }}>
            {gmailHref && (
              <a href={gmailHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                Open in Gmail
              </a>
            )}
            {outlookHref && (
              <a href={outlookHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                Open in Outlook
              </a>
            )}
            <button type="button" className="btn btn-outline btn-sm" onClick={copyMessage}>
              {copied ? "Copied" : "Copy message"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
