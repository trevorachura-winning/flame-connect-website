"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!email || state === "busy") return;
    setState("busy");
    setMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent: "newsletter", email }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setState("ok");
        setMsg("You're on the list. Expect practical updates, not noise.");
        setEmail("");
      } else {
        setState("err");
        setMsg(data?.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setState("err");
      setMsg("Network issue — please try again.");
    }
  }

  return (
    <div>
      <form className="newsletter" onSubmit={submit} noValidate>
        <label htmlFor="nl-email" className="sr-only" style={{ position: "absolute", left: "-9999px" }}>
          Email address
        </label>
        <input
          id="nl-email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@organization.africa"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="btn btn-primary btn-sm" type="submit" disabled={state === "busy"}>
          {state === "busy" ? "Joining…" : "Get updates"}
        </button>
      </form>
      <p className={`newsletter-msg ${state === "ok" ? "ok" : ""} ${state === "err" ? "err" : ""}`} aria-live="polite">
        {msg}
      </p>
    </div>
  );
}
