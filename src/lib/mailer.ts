/**
 * Lead / enquiry email delivery.
 *
 * Every enquiry, from the contact form or the concierge lead form, is delivered
 * to the house inbox (SITE.email, overridable via LEAD_RECIPIENT). Delivery
 * uses EmailJS (https://emailjs.com) over plain HTTP, so there is no extra npm
 * dependency to install.
 *
 * The EmailJS account belongs to the agency (parallaxleads@gmail.com); the
 * template sends to the client's inbox, which is passed through as the
 * `to_email` template param so the recipient stays configurable here.
 *
 * Callers pass structured fields rather than pre-formatted text - the body
 * layout lives in `formatBody` below so every lead reads the same way.
 *
 * If the EmailJS credentials are not set or delivery fails, the function
 * returns false. Callers must keep the visitor's input and show a recoverable
 * error state.
 *
 * To go live:
 *   1. Create an EmailJS account and connect the parallaxleads@gmail.com
 *      service (Gmail).
 *   2. Create a template whose "To email" is {{to_email}}, "Reply to" is
 *      {{reply_to}}, subject {{subject}} and body {{message}}.
 *   3. Under Account > Security, enable "Allow EmailJS API for non-browser
 *      applications" - these calls come from the Next.js server, not a browser.
 *   4. Put the service id, template id, public key and private key in
 *      .env.local (see .env.example).
 */

import { SITE } from "./site";

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

/** The house trades from Metro Manila, so timestamps read in local time. */
const HOUSE_TIME_ZONE = "Asia/Manila";

export interface LeadEmail {
  /** Email subject line. */
  subject: string;
  /** Banner headline at the top of the body, e.g. "New wholesale enquiry". */
  heading: string;
  /** Label/value rows, printed with the values aligned into a column. */
  fields: Array<[label: string, value: string]>;
  /** Free-text sections printed under the fields, e.g. the message body. */
  blocks?: Array<{ title: string; body: string }>;
  /** The customer's address, set as Reply-To so the house can reply directly. */
  replyTo?: string;
}

/** "wholesale" -> "Wholesale", for slug-shaped subject/interest values. */
export function titleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function receivedAt(): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: HOUSE_TIME_ZONE,
  }).format(new Date());
}

/**
 * Lay the lead out as plain text: an underlined banner, an aligned field
 * column, then any free-text blocks. Kept plain so it renders identically in
 * Gmail, Apple Mail and on a phone, with no template markup to maintain.
 */
function formatBody(mail: LeadEmail): string {
  const heading = mail.heading.toUpperCase();
  const fields: Array<[string, string]> = [
    ...mail.fields,
    ["Received", receivedAt()],
  ];

  // Pad labels so the values line up in a column.
  const width = Math.max(...fields.map(([label]) => label.length)) + 1;
  const rows = fields.map(
    ([label, value]) => `${`${label}:`.padEnd(width + 1)} ${value}`,
  );

  const sections = (mail.blocks ?? [])
    .filter((block) => block.body.trim().length > 0)
    .map((block) => `\n-- ${block.title} --\n${block.body.trim()}`);

  return [
    heading,
    "=".repeat(heading.length),
    "",
    ...rows,
    ...sections,
    "",
    "—",
    `Sent from the ${SITE.name} website.`,
  ].join("\n");
}

export async function sendLeadEmail(mail: LeadEmail): Promise<boolean> {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  const to = process.env.LEAD_RECIPIENT ?? SITE.email;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    console.warn("[lead] email delivery is not configured.");
    return false;
  }

  try {
    const res = await fetch(EMAILJS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        // Required when calling the API outside a browser.
        accessToken: privateKey,
        template_params: {
          to_email: to,
          subject: mail.subject,
          message: formatBody(mail),
          reply_to: mail.replyTo ?? to,
          from_name: SITE.name,
        },
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[lead] EmailJS responded", res.status, detail);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[lead] EmailJS request failed", err);
    return false;
  }
}
