"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ORG_SIZES,
  PILLARS,
  QUESTIONS,
  SECTORS,
  scoreAssessment,
  type Answers,
  type Result,
} from "../content/assessment";
import { submitAssessment } from "../lib/assessment-submit";
import { mailtoHref } from "../lib/links";
import { SITE } from "../lib/site";
import styles from "../styles/assessment.module.css";

const STEPS = PILLARS.length; // one step per area, then details, then result

interface Details {
  name: string;
  email: string;
  organisation: string;
  role: string;
  phone: string;
  sector: string;
  size: string;
  contactMe: boolean;
  website: string; // honeypot: people never see or fill this
}

const EMPTY: Details = {
  name: "",
  email: "",
  organisation: "",
  role: "",
  phone: "",
  sector: "",
  size: "",
  contactMe: true,
  website: "",
};

function summaryText(result: Result, answers: Answers, d: Details) {
  const lines = [
    `Overall score: ${result.score}/100 (${result.level.name})`,
    ...result.pillars.map((p) => `${p.name}: ${p.score}/100`),
    "",
    ...QUESTIONS.map((q) => `${q.text} ${q.options[(answers[q.id] ?? 1) - 1]}`),
    "",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.organisation && `Organisation: ${d.organisation}`,
    d.role && `Role: ${d.role}`,
    d.phone && `Phone or WhatsApp: ${d.phone}`,
    d.sector && `Sector: ${d.sector}`,
    d.size && `Size: ${d.size}`,
    `Contact me about my results: ${d.contactMe ? "Yes" : "No"}`,
  ];
  return lines.filter((l) => l !== "" && l !== undefined && l !== false).join("\n");
}

export function AssessmentClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [details, setDetails] = useState<Details>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<null | boolean>(null);
  const [result, setResult] = useState<Result | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  // Move focus to the new step's heading so keyboard and screen-reader users follow along.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [step]);

  const pillar = PILLARS[step];
  const stepQuestions = useMemo(() => (pillar ? QUESTIONS.filter((q) => q.pillar === pillar.key) : []), [pillar]);
  const answered = Object.keys(answers).length;
  const progress = result ? 100 : Math.round((Math.min(answered, QUESTIONS.length) / QUESTIONS.length) * 100);

  function next() {
    const missing = stepQuestions.filter((q) => !answers[q.id]);
    if (missing.length) {
      setErrors({ step: "Please answer both questions to continue." });
      document.getElementById(`${missing[0].id}-0`)?.focus();
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  }

  async function finish(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!details.name.trim()) errs.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())) errs.email = "Please enter a valid email address.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(errs.name ? "as-name" : "as-email")?.focus();
      return;
    }
    const r = scoreAssessment(answers);
    setResult(r);
    if (details.website) {
      // Honeypot filled: almost certainly a bot. Show the result, send nothing.
      setSent(true);
      setStep(STEPS + 1);
      return;
    }
    setSending(true);
    const fields: Record<string, string> = {
      _subject: `AI readiness assessment: ${details.organisation || details.name} (${r.score}/100, ${r.level.name})`,
      _replyto: details.email.trim(),
      Name: details.name.trim(),
      Email: details.email.trim(),
      Organisation: details.organisation.trim() || "Not given",
      Role: details.role.trim() || "Not given",
      "Phone or WhatsApp": details.phone.trim() || "Not given",
      Sector: details.sector || "Not given",
      Size: details.size || "Not given",
      "Contact me about my results": details.contactMe ? "Yes" : "No",
      "Overall score": `${r.score}/100 (${r.level.name})`,
    };
    r.pillars.forEach((p) => (fields[`Score: ${p.name}`] = `${p.score}/100`));
    QUESTIONS.forEach((q, i) => (fields[`Q${i + 1}. ${q.text}`] = q.options[(answers[q.id] ?? 1) - 1]));
    const ok = await submitAssessment(fields);
    setSending(false);
    setSent(ok);
    setStep(STEPS + 1);
  }

  function restart() {
    setAnswers({});
    setDetails(EMPTY);
    setResult(null);
    setSent(null);
    setErrors({});
    setStep(0);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.progress} aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <p className={styles.stepLabel} aria-live="polite">
        {step < STEPS && `Step ${step + 1} of ${STEPS + 1}: ${pillar.name}`}
        {step === STEPS && `Step ${STEPS + 1} of ${STEPS + 1}: Your details`}
        {step > STEPS && "Your results"}
      </p>

      {/* Question steps */}
      {step < STEPS && (
        <div className={styles.card}>
          <h2 ref={headingRef} tabIndex={-1} className={styles.stepTitle}>
            {pillar.name}
          </h2>
          {stepQuestions.map((q) => (
            <fieldset key={q.id} className={styles.question}>
              <legend>{q.text}</legend>
              <div className={styles.options}>
                {q.options.map((opt, i) => (
                  <label key={opt} className={styles.option} data-checked={answers[q.id] === i + 1 ? "true" : "false"}>
                    <input
                      id={`${q.id}-${i}`}
                      type="radio"
                      name={q.id}
                      value={i + 1}
                      checked={answers[q.id] === i + 1}
                      onChange={() => {
                        setAnswers((a) => ({ ...a, [q.id]: i + 1 }));
                        setErrors({});
                      }}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          {errors.step && (
            <p className={styles.error} role="alert">
              {errors.step}
            </p>
          )}
          <div className={styles.nav}>
            {step > 0 && (
              <button type="button" className="btn btn-outline" onClick={() => setStep((s) => s - 1)}>
                Back
              </button>
            )}
            <button type="button" className="btn btn-primary" onClick={next}>
              {step === STEPS - 1 ? "Last step" : "Next"}
            </button>
          </div>
        </div>
      )}

      {/* Details step */}
      {step === STEPS && (
        <form className={styles.card} onSubmit={finish} noValidate>
          <h2 ref={headingRef} tabIndex={-1} className={styles.stepTitle}>
            Where should we send your results?
          </h2>
          <p className={styles.help}>
            You will see your score straight away. We also send your answers to the Flame Connect
            team so we can follow up if you would like us to.
          </p>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="as-name">Your name *</label>
              <input id="as-name" autoComplete="name" value={details.name} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "as-name-err" : undefined} onChange={(e) => setDetails({ ...details, name: e.target.value })} />
              {errors.name && <p id="as-name-err" className={styles.error}>{errors.name}</p>}
            </div>
            <div className={styles.field}>
              <label htmlFor="as-email">Work email *</label>
              <input id="as-email" type="email" autoComplete="email" inputMode="email" value={details.email} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "as-email-err" : undefined} onChange={(e) => setDetails({ ...details, email: e.target.value })} />
              {errors.email && <p id="as-email-err" className={styles.error}>{errors.email}</p>}
            </div>
            <div className={styles.field}>
              <label htmlFor="as-org">Organisation</label>
              <input id="as-org" autoComplete="organization" value={details.organisation} onChange={(e) => setDetails({ ...details, organisation: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label htmlFor="as-role">Your role</label>
              <input id="as-role" autoComplete="organization-title" value={details.role} onChange={(e) => setDetails({ ...details, role: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label htmlFor="as-phone">Phone or WhatsApp</label>
              <input id="as-phone" type="tel" autoComplete="tel" inputMode="tel" value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label htmlFor="as-sector">Sector</label>
              <select id="as-sector" value={details.sector} onChange={(e) => setDetails({ ...details, sector: e.target.value })}>
                <option value="">Choose one</option>
                {SECTORS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="as-size">Organisation size</label>
              <select id="as-size" value={details.size} onChange={(e) => setDetails({ ...details, size: e.target.value })}>
                <option value="">Choose one</option>
                {ORG_SIZES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            {/* Honeypot for bots: hidden from people and screen readers. */}
            <div className={styles.hp} aria-hidden="true">
              <label htmlFor="as-website">Website</label>
              <input id="as-website" tabIndex={-1} autoComplete="off" value={details.website} onChange={(e) => setDetails({ ...details, website: e.target.value })} />
            </div>
          </div>
          <label className={styles.check}>
            <input type="checkbox" checked={details.contactMe} onChange={(e) => setDetails({ ...details, contactMe: e.target.checked })} />
            <span>Flame Connect may contact me to talk through my results.</span>
          </label>
          <p className={styles.small}>
            We use your details only to follow up on this assessment. Read our{" "}
            <Link href="/privacy">privacy notice</Link>.
          </p>
          <div className={styles.nav}>
            <button type="button" className="btn btn-outline" onClick={() => setStep(STEPS - 1)}>
              Back
            </button>
            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? "Calculating…" : "See my results"}
            </button>
          </div>
        </form>
      )}

      {/* Results */}
      {step > STEPS && result && (
        <div className={styles.card}>
          <h2 ref={headingRef} tabIndex={-1} className={styles.stepTitle}>
            Your AI readiness: {result.level.name}
          </h2>
          <div className={styles.scoreRow}>
            <div className={styles.score} role="img" aria-label={`Overall score ${result.score} out of 100`} style={{ ["--p" as string]: `${result.score}` }}>
              <b>{result.score}</b>
              <span>out of 100</span>
            </div>
            <p className={styles.summary}>{result.level.summary}</p>
          </div>

          <h3 className={styles.subTitle}>By area</h3>
          <ul className={styles.bars}>
            {result.pillars.map((p) => (
              <li key={p.key}>
                <span className={styles.barLabel}>{p.name}</span>
                <span className={styles.barTrack} aria-hidden="true">
                  <span style={{ width: `${Math.max(p.score, 3)}%` }} />
                </span>
                <span className={styles.barValue}>{p.score}</span>
              </li>
            ))}
          </ul>

          <h3 className={styles.subTitle}>Your three next steps</h3>
          <ol className={styles.steps}>
            {result.nextSteps.map((s) => (
              <li key={s.pillar}>
                <b>{s.pillar}.</b> {s.text}
              </li>
            ))}
          </ol>

          {sent ? (
            <p className={styles.notice} role="status">
              Thank you, {details.name.split(" ")[0]}. Your results have been sent to the Flame
              Connect team{details.contactMe ? ", and we will be in touch to talk them through" : ""}.
            </p>
          ) : (
            <div className={styles.notice} role="status">
              <p>
                Your results are above, but we could not send them to our team just now. Please
                email them to us so we can follow up.
              </p>
              <a
                className="btn btn-outline btn-sm"
                href={mailtoHref(`AI readiness assessment: ${result.score}/100`, summaryText(result, answers, details)) ?? `mailto:${SITE.contactEmail}`}
              >
                Email my results
              </a>
            </div>
          )}

          <p className={styles.small}>
            This is a quick self-assessment to start a conversation, not a full audit.
          </p>
          <div className={styles.nav}>
            <Link href="/contact?intent=consultation&service=ai-in-business" className="btn btn-primary">
              Talk to us about your results
            </Link>
            <Link href="/services/ai-in-business" className="btn btn-outline">
              See our AI in Business services
            </Link>
            <button type="button" className={styles.link} onClick={restart}>
              Start again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
