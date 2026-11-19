/**
 * Sends a completed AI readiness assessment to the Flame Connect inbox.
 *
 * The site has no backend of its own. Submissions go through FormSubmit
 * (formsubmit.co), a free form-to-email service: it emails each submission
 * to the address below and keeps no account on our side. This is the ONLY
 * place the website sends visitor data anywhere (Product Owner decision,
 * 19 Nov 2026); the privacy notice names FormSubmit as a processor.
 *
 * FormSubmit activates an address the first time it receives a submission:
 * it sends one confirmation email to the inbox, and nothing is delivered
 * until someone clicks the link in it.
 */
import { SITE } from "./site";

export const ASSESSMENT_ENDPOINT = `https://formsubmit.co/ajax/${SITE.contactEmail ?? ""}`;

export async function submitAssessment(fields: Record<string, string>): Promise<boolean> {
  if (!SITE.contactEmail) return false;
  try {
    const res = await fetch(ASSESSMENT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: fields._subject ?? "New AI readiness assessment",
        _template: "table",
        _captcha: "false",
        ...fields,
      }),
    });
    if (!res.ok) return false;
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
    return data.success === true || data.success === "true";
  } catch {
    return false;
  }
}
