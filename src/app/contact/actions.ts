"use server";

import type { ContactState } from "./types";
import { sendLeadEmail, titleCase } from "@/lib/mailer";

/**
 * Contact form server action. Validates the enquiry and hands it to the shared
 * mailer (EmailJS), which delivers to the house inbox. A "use server" module
 * may only export async functions, so the shared state type/constant live in
 * ./types.
 */

const SUBJECTS = ["general", "stockist", "wholesale", "press"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: ContactState["errors"] = {};
  if (!name) errors.name = "Please tell us your name.";
  else if (name.length > MAX_NAME_LENGTH) {
    errors.name = `Please keep your name under ${MAX_NAME_LENGTH} characters.`;
  }
  if (!email) errors.email = "Please add an email address.";
  else if (!EMAIL_RE.test(email)) errors.email = "That email doesn't look right.";
  else if (email.length > MAX_EMAIL_LENGTH) {
    errors.email = `Please keep your email under ${MAX_EMAIL_LENGTH} characters.`;
  }
  if (!subject || !SUBJECTS.includes(subject as (typeof SUBJECTS)[number])) {
    errors.subject = "Please choose a subject.";
  }
  if (!message) errors.message = "Please write a short message.";
  else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the fields marked below.",
      errors,
      values: { name, email, subject, message },
    };
  }

  // Deliver to the house inbox. If delivery is not configured or fails, keep
  // the visitor's values and return a recoverable error.
  const delivered = await sendLeadEmail({
    subject: `New ${subject} enquiry - ${name}`,
    heading: `New ${subject} enquiry`,
    replyTo: email,
    fields: [
      ["Name", name],
      ["Email", email],
      ["Subject", titleCase(subject)],
      ["Source", "Contact form"],
    ],
    blocks: [{ title: "Message", body: message }],
  });

  if (!delivered) {
    return {
      status: "error",
      message:
        "We couldn't send your enquiry just now. Please try again or email us directly.",
      values: { name, email, subject, message },
    };
  }

  return {
    status: "success",
    message: "Thank you. We'll be in touch with you as soon as we can.",
  };
}
