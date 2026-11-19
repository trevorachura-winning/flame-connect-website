"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { whatsappHref } from "../lib/links";
import styles from "../styles/whatsapp-enquiry.module.css";

/**
 * "Chat on WhatsApp" that asks for the enquiry first. Visitors write their
 * message in a small pop-up; Send opens WhatsApp with that message ready for
 * Flame Connect. WhatsApp requires the visitor to press send in their own
 * app, so nothing is sent silently and nothing is stored by this site.
 * Without JavaScript the plain wa.me link still works.
 */
export function WhatsAppEnquiry({
  children,
  className,
  fallbackText = "Hello Flame Connect",
}: {
  children: ReactNode;
  className?: string;
  fallbackText?: string;
}) {
  const href = whatsappHref(fallbackText);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLAnchorElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!href) return null;

  const close = () => {
    dialogRef.current?.close();
    openerRef.current?.focus();
  };

  const onOpen = (e: MouseEvent<HTMLAnchorElement>) => {
    const dlg = dialogRef.current;
    if (!dlg || typeof dlg.showModal !== "function") return; // plain link fallback
    e.preventDefault();
    setError(false);
    dlg.showModal();
    messageRef.current?.focus();
  };

  const who = name.trim();
  const text = message.trim();
  // Send is a real link (in-app browsers block scripted pop-ups); its href
  // carries the visitor's message and updates as they type.
  const sendHref = whatsappHref(`Hello Flame Connect${who ? `, this is ${who}` : ""}.\n\n${text}`) ?? href;

  const onSend = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!text) {
      e.preventDefault();
      setError(true);
      messageRef.current?.focus();
      return;
    }
    window.setTimeout(() => {
      setName("");
      setMessage("");
      dialogRef.current?.close();
    }, 300);
  };

  return (
    <>
      <a ref={openerRef} href={href} className={className} rel="noopener noreferrer" onClick={onOpen} aria-haspopup="dialog">
        {children}
      </a>
      {mounted &&
        createPortal(
          <dialog
            ref={dialogRef}
            className={styles.dialog}
            aria-labelledby="wa-enquiry-title"
            onClick={(e) => {
              if (e.target === dialogRef.current) close();
            }}
          >
            <button type="button" className={styles.close} onClick={close} aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <div className={styles.form} role="group" aria-labelledby="wa-enquiry-title">
              <h2 id="wa-enquiry-title">Your enquiry</h2>
              <p className={styles.intro}>
                Tell us what you need. When you press Send, WhatsApp opens with your message ready to go to
                Flame Connect.
              </p>
              <label className={styles.label}>
                Your name (optional)
                <input value={name} onChange={(e) => setName(e.currentTarget.value)} autoComplete="name" maxLength={80} />
              </label>
              <label className={styles.label}>
                Your enquiry
                <textarea
                  ref={messageRef}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.currentTarget.value);
                    if (e.currentTarget.value.trim()) setError(false);
                  }}
                  maxLength={1500}
                  required
                  aria-invalid={error || undefined}
                  placeholder="For example: we would like help using AI to answer customer questions faster."
                />
              </label>
              {error && (
                <p className={styles.error} role="alert">
                  Please write your enquiry first.
                </p>
              )}
              <div className={styles.actions}>
                <button type="button" className="btn btn-outline" onClick={close}>
                  Cancel
                </button>
                <a href={sendHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={onSend}>
                  Send on WhatsApp
                </a>
              </div>
            </div>
          </dialog>,
          document.body
        )}
    </>
  );
}
