"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { AssistantDoc, AssistantHit } from "../../lib/assistant/search";
import { whatsappHref } from "../../lib/links";
import { RobotMascot } from "./RobotMascot";
import s from "../../styles/assistant.module.css";

type Turn = { q: string; hits: AssistantHit[] };

/**
 * Small help robot. Answers only from the website's own content (searched in
 * the browser; nothing a visitor types is sent anywhere) and takes people to
 * the right page. The index loads the first time the robot is opened.
 */
export function AssistantRobot() {
  const [open, setOpen] = useState(false);
  const [engine, setEngine] = useState<{ docs: AssistantDoc[]; search: (q: string, d: AssistantDoc[]) => AssistantHit[]; starters: string[] } | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [q, setQ] = useState("");
  const [hint, setHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // One gentle "Need help?" hint per visit.
  useEffect(() => {
    let shown = false;
    try { shown = sessionStorage.getItem("fc-robot-hint") === "1"; } catch {}
    if (shown) return;
    const t = setTimeout(() => {
      setHint(true);
      try { sessionStorage.setItem("fc-robot-hint", "1"); } catch {}
    }, 9000);
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
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); window.removeEventListener("keydown", onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [turns]);

  function close() {
    setOpen(false);
    btnRef.current?.focus();
  }

  function ask(question: string) {
    const text = question.trim().slice(0, 200);
    if (!text || !engine) return;
    setTurns((t) => [...t.slice(-5), { q: text, hits: engine.search(text, engine.docs) }]);
    setQ("");
  }

  function go(url: string) {
    setOpen(false);
    if (url.split("?")[0] === pathname) window.scrollTo({ top: 0, behavior: "smooth" });
    router.push(url);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(q);
  }

  const wa = whatsappHref("Hello Flame Connect, I have a question about your services.");

  return (
    <div className={s.root}>
      {open && (
        <div className={s.panel} role="dialog" aria-modal="false" aria-labelledby="fc-robot-title">
          <header className={s.head}>
            <RobotMascot size={38} />
            <div className={s.headText}>
              <b id="fc-robot-title">Ask Flame</b>
              <span>Answers from our website</span>
            </div>
            <button type="button" className={s.close} onClick={close} aria-label="Close help">
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div className={s.log} ref={logRef} aria-live="polite">
            <div className={s.bot}>
              Hi! Ask me about our services, products, team or how to work with us. I can also take you to the right page.
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
                    {t.hits.length > 1 && (
                      <div className={s.more}>
                        <span>Also see</span>
                        {t.hits.slice(1, 4).filter((h, k, arr) => arr.findIndex((x) => x.doc.url === h.doc.url && x.doc.title === h.doc.title) === k).map((h) => (
                          <button key={h.doc.id} type="button" className={s.moreLink} onClick={() => go(h.doc.url)}>{h.doc.title}</button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={s.answer}>
                    <p>I could not find that on our website. Our team can help you directly.</p>
                    <div className={s.row}>
                      {wa && <a className={s.goBtn} href={wa} target="_blank" rel="noopener noreferrer">WhatsApp us</a>}
                      <Link className={s.ghostBtn} href="/contact" onClick={() => setOpen(false)}>Contact page</Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <form className={s.form} onSubmit={onSubmit} role="search">
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
