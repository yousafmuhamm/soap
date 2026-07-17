/**
 * Lead / enquiry email delivery.
 *
 * Every enquiry, from the contact form or the concierge lead form, is delivered
 * to the house inbox (SITE.email, overridable via LEAD_RECIPIENT). Delivery
 * uses Resend (https://resend.com) over plain HTTP, so there is no extra npm
 * dependency to install.
 *
 * If RESEND_API_KEY is not set or delivery fails, the function returns false.
 * Callers must keep the visitor's input and show a recoverable error state.
 *
 * To go live: create a Resend account, add RESEND_API_KEY to .env.local, and
 * (once a domain is verified) set MAIL_FROM to an address on that domain.
 */

import { SITE } from "./site";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export interface LeadEmail {
  /** Email subject line. */
  subject: string;
  /** Body lines, joined with newlines into a plain-text email. */
  lines: string[];
  /** The customer's address, set as Reply-To so the house can reply directly. */
  replyTo?: string;
}

export async function sendLeadEmail(mail: LeadEmail): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_RECIPIENT ?? SITE.email;
  const from =
    process.env.MAIL_FROM ?? "Yeong Won Concierge <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[lead] email delivery is not configured.");
    return false;
  }

  const text = mail.lines.join("\n");

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
        subject: mail.subject,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[lead] Resend responded", res.status, detail);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[lead] Resend request failed", err);
    return false;
  }
}
