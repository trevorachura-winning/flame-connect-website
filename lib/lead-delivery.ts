/**
 * Lead delivery contract: never claim receipt unless the configured destination
 * positively acknowledges the request. Serverless logs are not a lead inbox.
 */
export type DeliveryResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "rejected" | "network-error" };

export async function deliverLead(
  webhookUrl: string | undefined,
  payload: Record<string, unknown>,
  send: typeof fetch = fetch
): Promise<DeliveryResult> {
  if (!webhookUrl?.trim()) {
    return { ok: false, reason: "not-configured" };
  }
  try {
    const response = await send(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    return response.ok ? { ok: true } : { ok: false, reason: "rejected" };
  } catch {
    return { ok: false, reason: "network-error" };
  }
}
