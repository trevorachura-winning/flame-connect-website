"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  READINESS_CHOICES,
  READINESS_DIMENSIONS,
  READINESS_QUESTIONS,
  calculateReadiness,
  formatReadinessSummary,
  type ReadinessAnswers,
} from "../lib/ai-readiness";
import { mailtoHref, whatsappHref } from "../lib/links";
import { Icon } from "./Icons";
import styles from "./AiReadinessAssessment.module.css";

export function AiReadinessAssessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ReadinessAnswers>({});
  const [complete, setComplete] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const current = READINESS_QUESTIONS[step];
  const selected = answers[current.id];
  const hasSelection = Number.isInteger(selected);
  const result = complete ? calculateReadiness(answers) : null;

  useEffect(() => {
    headingRef.current?.focus();
  }, [step, complete]);

  function advance() {
    if (!hasSelection) return;
    if (step === READINESS_QUESTIONS.length - 1) {
      setComplete(true);
    } else {
      setStep((previous) => previous + 1);
    }
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setComplete(false);
  }

  if (result) {
    const report = formatReadinessSummary(result);
    const mailLink = mailtoHref("My Flame Connect AI readiness self-check", report);
    const whatsappLink = whatsappHref(report);

    return (
      <div className={styles.shell}>
        <div className={styles.resultHeader}>
          <span className={styles.eyebrow}>Your indicative readiness profile</span>
          <h2 ref={headingRef} tabIndex={-1} className={styles.resultHeading}>
            You are <span>{result.level.toLowerCase()}.</span>
          </h2>
          <p className={styles.disclaimer}>
            These are your self-reported results, not a professional audit or certification.
          </p>
        </div>
        <div className={styles.resultGrid}>
          <div className={styles.scoreCard}>
            <span className={styles.scoreLabel}>Overall self-check score</span>
            <span className={styles.scoreNumber}>{result.overall}<small>/100</small></span>
            <p>{result.interpretation}</p>
          </div>
          <div className={styles.dimensionCard}>
            <h3>Readiness by area</h3>
            <div className={styles.dimensionList}>
              {result.byDimension.map((d) => (
                <div key={d.id} className={styles.dimension}>
                  <div className={styles.dimensionLabel}>
                    <span>{d.name}</span><b>{d.score}/100</b>
                  </div>
                  <div className={styles.track} role="meter" aria-label={d.name} aria-valuenow={d.score} aria-valuemin={0} aria-valuemax={100}>
                    <span style={{ width: `${d.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.actionsCard}>
          <div>
            <span className={styles.eyebrow}>Start here</span>
            <h3>Your first two priorities</h3>
            <p className={styles.disclaimer}>
              We prioritize the lowest-scoring areas first. Review these suggestions against your actual context.
            </p>
          </div>
          <ol className={styles.actionList}>
            {result.priorities.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong>
                <p>{item.action}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.nextSteps}>
          <h3>Want to turn your results into a practical action plan?</h3>
          <p>
            Share your summary or book a discovery conversation. No account is required.
            Sharing opens your own email or WhatsApp app; you choose whether to send.
          </p>
          <div className={styles.buttons}>
            <Link href="/contact?intent=consultation" className="btn btn-primary">
              Discuss the results <Icon name="arrow-right" size={17} />
            </Link>
            {mailLink && <a href={mailLink} className="btn btn-outline">Email my summary</a>}
            {whatsappLink && (
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Share via WhatsApp
              </a>
            )}
            <button type="button" className={styles.reset} onClick={restart}>
              Retake assessment
            </button>
          </div>
        </div>
        <p className={styles.privacy}>
          Scores are calculated transparently from your answers on this page. No account,
          tracking, answer storage, or automated decision-making is involved.
        </p>
      </div>
    );
  }

  const dimension = READINESS_DIMENSIONS.find((d) => d.id === current.dimension);
  const progress = Math.round(((step + 1) / READINESS_QUESTIONS.length) * 100);

  return (
    <section className={styles.shell} aria-label="AI readiness questions">
      <div className={styles.progressHeader}>
        <div>
          <span className={styles.eyebrow}>{dimension?.name}</span>
          <p className={styles.progressText}>
            Question <b>{step + 1}</b> of {READINESS_QUESTIONS.length}
          </p>
        </div>
        <strong className={styles.progressPercent}>{progress}%</strong>
      </div>
      <progress className={styles.progress} value={step + 1} max={READINESS_QUESTIONS.length}>
        {progress}%
      </progress>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          <span ref={headingRef} tabIndex={-1} className={styles.questionTitle}>
            {current.question}
          </span>
        </legend>
        <p className={styles.hint}>{current.hint}</p>
        <div className={styles.options}>
          {READINESS_CHOICES.map((choice) => (
            <label
              key={choice.score}
              className={`${styles.option} ${selected === choice.score ? styles.chosen : ""}`}
            >
              <input
                type="radio"
                name={current.id}
                value={choice.score}
                checked={selected === choice.score}
                onChange={() => setAnswers((previous) => ({ ...previous, [current.id]: choice.score }))}
              />
              <span className={styles.optionCopy}>
                <strong>{choice.label}</strong>
                <span>{choice.detail}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className={styles.controls}>
        <button
          className="btn btn-outline"
          type="button"
          disabled={step === 0}
          onClick={() => setStep((previous) => Math.max(0, previous - 1))}
        >
          Previous
        </button>
        <button className="btn btn-primary" type="button" disabled={!hasSelection} onClick={advance}>
          {step === READINESS_QUESTIONS.length - 1 ? "View my readiness profile" : "Next question"}
          <Icon name="arrow-right" size={17} />
        </button>
      </div>
      <p className={styles.privacy}>
        Choose the closest description of your organization today. We do not ask for confidential
        data, and your answers remain only in this browser page session.
      </p>
    </section>
  );
}
