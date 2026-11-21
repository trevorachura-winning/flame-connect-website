"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { AssistantDoc, AssistantHit } from "../../lib/assistant/search";
import { whatsappHref } from "../../lib/links";
import { submitCallback } from "../../lib/assessment-submit";
import { RobotMascot } from "./RobotMascot";
import s from "../../styles/assistant.module.css";

type Turn = { q: string; hits: AssistantHit[]; offer: boolean };
type Engine = { docs: AssistantDoc[]; search: (q: string, d: AssistantDoc[]) => AssistantHit[]; starters: string[] };
type CallState = "idle" | "form" | "sending" | "sent" | "error";

const NAME_KEY = "fc-robot-name";
const WELCOMED_KEY = "fc-robot-welcomed";
/** Questions that signal buying intent: the moment a call back is genuinely useful. */
const INTENT = /\b(price|prices|pricing|cost|costs|how much|quote|budget|hire|work with|book|consult|consultation|meeting|call|proposal|start a project|get started)\b/i;

function read(key: string, store: "local" | "session" = "local") {
  try { return (store === "local" ? localStorage : sessionStorage).getItem(key); } catch { return null; }
}
function write(key: string, value: string | null, store: "local" | "session" = "local") {
  try {
    const st = store === "local" ? localStorage : sessionStorage;
    if (value === null) st.removeItem(key); else st.setItem(key, value);
  } catch {}
}

/**
 * Ask Flame help robot. Searches the website's own content in the browser and
 * takes people to the right page. Nothing typed into the search is sent. A call
 * back form (phone, email or both) is offered only when it helps (no answer found, or a pricing or
 * project question); that form is sent to our inbox only if the visitor submits it.
 */
export function AssistantRobot() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"welcome" | "chat">("chat");
  const [name, setName] = useState("");
  const [nameDraft, setNameDraft] = useState("");
  const [engine, setEngine] = useState<Engine | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [q, setQ] = useState("");
  const [hint, setHint] = useState(false);
  const [call, setCall] = useState<CallState>("idle");
  const [offerUsed, setOfferUsed] = useState(false);
  const [callName, setCallName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setName(read(NAME_KEY) ?? "");
    setView(read(WELCOMED_KEY) ? "chat" : "welcome");
    setOfferUsed(read("fc-robot-offer", "session") === "1");
    if (read("fc-robot-hint", "session") === "1") return;
    const t = setTimeout(() => { setHint(true); write("fc-robot-hint", "1", "session"); }, 9000);
    const off = setTimeout(() => setHint(false), 16000);
    return () => { clearTimeout(t); clearTimeout(off); };
  }, []);

  useEffect(() => {
    if (!open || engine) return;
    Promise.all([import("../../lib/assistant/index"), import("../../lib/assistant/search")]).then(([idx, srch]) =>
      setEngine({ docs: idx.buildAssistantIndex(), search: srch.search, starters: idx.STARTER_QUESTIONS }),
    );
  }, [open, engine]);

  useEffect(() => {
    if (!open) return;
    setHint(false);
    const t = setTimeout(() => (view === "welcome" ? nameRef : inputRef).current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); window.removeEventListener("keydown", onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, view]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, call]);

  useEffect(() => {
    if (call === "form") setTimeout(() => phoneRef.current?.focus(), 60);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call]);

  function close() {
    setOpen(false);
    btnRef.current?.focus();
  }

  function startChat(e?: FormEvent, skip = false) {
    e?.preventDefault();
    const n = skip ? "" : nameDraft.trim().slice(0, 40);
    setName(n);
    write(NAME_KEY, n || null);
    write(WELCOMED_KEY, "1");
    setView("chat");
  }

  function ask(question: string) {
    const text = question.trim().slice(0, 200);
    if (!text || !engine) return;
    const hits = engine.search(text, engine.docs);
    const wantsOffer = !offerUsed && call === "idle" && (!hits.length || INTENT.test(text));
    setTurns((t) => [...t.slice(-5).map((x) => ({ ...x, offer: false })), { q: text, hits, offer: wantsOffer }]);
    setQ("");
  }

  function go(url: string) {
    setOpen(false);
    if (url.split("?")[0] === pathname) window.scrollTo({ top: 0, behavior: "smooth" });
    router.push(url);
  }

  function openCallForm() {
    setCallName(name);
    setCall("form");
    setOfferUsed(true);
    write("fc-robot-offer", "1", "session");
  }

  function dismissOffer() {
    setOfferUsed(true);
    write("fc-robot-offer", "1", "session");
    setTurns((t) => t.map((x) => ({ ...x, offer: false })));
  }

  async function sendCall(e: FormEvent) {
    e.preventDefault();
    if (!canSend || !consent) return;
    setCall("sending");
    const last = turns[turns.length - 1]?.q ?? "";
    const ok = await submitCallback({
      name: callName.trim() || "Not given",
      phone: phone.trim() || "Not given",
      email: email.trim() || "Not given",
      ...(emailOk ? { _replyto: email.trim() } : {}),
      question: last,
      page: pathname ?? "/",
      source: "Ask Flame help robot",
      consent: "Agreed to be contacted about this question",
    });
    setCall(ok ? "sent" : "error");
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const phoneOk = phone.replace(/\D/g, "").length >= 7;
  const canSend = phoneOk || emailOk;

  const wa = whatsappHref("Hello Flame Connect, I have a question about your services.");
  const hello = name ? `Hi ${name}! ` : "Hi! ";

  return (
    <div className={s.root}>
      {open && (
        <div className={s.panel} role="dialog" aria-modal="false" aria-labelledby="fc-robot-title">
          <header className={s.head}>
            <RobotMascot size={38} />
            <div className={s.headText}>
              <b id="fc-robot-title">Ask Flame</b>
              <span>Your guide to Flame Connect</span>
            </div>
            <button type="button" className={s.close} onClick={close} aria-label="Close help">
              <span aria-hidden="true">×</span>
            </button>
          </header>

          {view === "welcome" ? (
            <form className={s.welcome} onSubmit={startChat}>
              <div className={s.welcomeBot}><RobotMascot size={72} /></div>
              <h2 className={s.welcomeTitle}>Welcome to Flame Connect</h2>
              <p className={s.welcomeText}>
                I&rsquo;m Flame. Ask me about our services, products or team and I&rsquo;ll take you to the right page.
              </p>
              <label htmlFor="fc-robot-name" className="sr-only">What should I call you? (optional)</label>
              <input
                id="fc-robot-name"
                ref={nameRef}
                className={s.field}
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                placeholder="What should I call you? (optional)"
                autoComplete="given-name"
                maxLength={40}
              />
              <button type="submit" className={s.primary}>Start</button>
              <button type="button" className={s.skip} onClick={() => startChat(undefined, true)}>Skip</button>
            </form>
          ) : (
            <>
              <div className={s.log} ref={logRef} aria-live="polite">
                <div className={s.bot}>
                  {hello}Ask me about our services, products, team or how to work with us. I can also take you to the right page.
                </div>
                {!turns.length && engine && (
                  <div className={s.chips}>
                    {engine.starters.map((st) => (
                      <button key={st} type="button" className={s.chip} onClick={() => ask(st)}>{st}</button>
                    ))}
                  </div>
                )}
                {!engine && <div className={s.bot} aria-busy="true">One moment…</div>}

                {turns.map((t, i) => (
                  <div key={i} className={s.turn}>
                    <div className={s.you}>{t.q}</div>
                    {t.hits.length ? (
                      <div className={s.answer}>
                        <span className={s.kind}>{t.hits[0].doc.kind}</span>
                        <b>{t.hits[0].doc.title}</b>
                        <p>{t.hits[0].snippet}</p>
                        <button type="button" className={s.goBtn} onClick={() => go(t.hits[0].doc.url)}>
                          Take me there <span aria-hidden="true">→</span>
                        </button>
                        {t.hits.slice(1).some((h) => h.doc.title !== t.hits[0].doc.title) && (
                          <div className={s.more}>
                            <span>Also see</span>
                            {t.hits.slice(1).filter((h, k, arr) => h.doc.title !== t.hits[0].doc.title && arr.findIndex((x) => x.doc.title === h.doc.title) === k).slice(0, 3).map((h) => (
                              <button key={h.doc.id} type="button" className={s.moreLink} onClick={() => go(h.doc.url)}>{h.doc.title}</button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={s.answer}>
                        <p>I could not find that on our website{name ? `, ${name}` : ""}. Our team can help you directly.</p>
                        <div className={s.row}>
                          {wa && <a className={s.goBtn} href={wa} target="_blank" rel="noopener noreferrer">WhatsApp us</a>}
                          <Link className={s.ghostBtn} href="/contact" onClick={() => setOpen(false)}>Contact page</Link>
                        </div>
                      </div>
                    )}
                    {t.offer && call === "idle" && (
                      <div className={s.offer}>
                        <p>Would you like our team to contact you about this?</p>
                        <div className={s.row}>
                          <button type="button" className={s.goBtn} onClick={openCallForm}>Yes, contact me</button>
                          <button type="button" className={s.ghostBtn} onClick={dismissOffer}>No thanks</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {(call === "form" || call === "sending" || call === "error") && (
                  <form className={s.callForm} onSubmit={sendCall}>
                    <b>How should we reach you?</b>
                    <span className={s.formHint}>Add a phone number, an email or both.</span>
                    <label htmlFor="fc-call-name" className="sr-only">Your name</label>
                    <input id="fc-call-name" className={s.field} value={callName} onChange={(e) => setCallName(e.target.value)} placeholder="Your name" autoComplete="name" maxLength={60} />
                    <label htmlFor="fc-call-phone" className="sr-only">Phone or WhatsApp number</label>
                    <input id="fc-call-phone" ref={phoneRef} className={s.field} type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone or WhatsApp, e.g. +256 7…" autoComplete="tel" maxLength={25} />
                    <label htmlFor="fc-call-email" className="sr-only">Email address</label>
                    <input id="fc-call-email" className={s.field} type="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" autoComplete="email" maxLength={120} />
                    <label className={s.consent}>
                      <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
                      <span>I agree to Flame Connect contacting me about my question. See our <Link href="/privacy" onClick={() => setOpen(false)}>privacy notice</Link>.</span>
                    </label>
                    {call === "error" && <p className={s.error}>That did not send. Please try again or WhatsApp us.</p>}
                    <div className={s.row}>
                      <button type="submit" className={s.goBtn} disabled={call === "sending" || !canSend || !consent}>
                        {call === "sending" ? "Sending…" : "Send"}
                      </button>
                      <button type="button" className={s.ghostBtn} onClick={() => setCall("idle")}>Cancel</button>
                    </div>
                  </form>
                )}
                {call === "sent" && (
                  <div className={s.bot}>Thank you{callName.trim() ? `, ${callName.trim()}` : ""}. One of our team will be in touch soon.</div>
                )}
              </div>

              <form className={s.form} onSubmit={(e) => { e.preventDefault(); ask(q); }} role="search">
                <label htmlFor="fc-robot-q" className="sr-only">Ask a question or search the website</label>
                <input
                  id="fc-robot-q"
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Ask or search, e.g. ERP systems"
                  autoComplete="off"
                  enterKeyHint="search"
                  maxLength={200}
                />
                <button type="submit" className={s.send} aria-label="Ask" disabled={!q.trim() || !engine}>
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {hint && !open && (
        <button type="button" className={s.hint} onClick={() => setOpen(true)}>
          Need help? Ask me
        </button>
      )}
      <button
        ref={btnRef}
        type="button"
        className={s.fab}
        aria-expanded={open}
        aria-label={open ? "Close help" : "Open help: ask a question or search the website"}
        onClick={() => (open ? close() : setOpen(true))}
        data-open={open || undefined}
      >
        <RobotMascot size={40} />
      </button>
    </div>
  );
}
