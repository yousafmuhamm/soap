"use server";

import type { ContactState } from "./types";

/**
 * Contact form server action. v1 validates and logs; email delivery is wired
 * post-launch and is isolated to this one file (§4.1 D8 — swap the log for a
 * Resend/Formspree call). A "use server" module may only export async
 * functions, so the shared state type/constant live in ./types.
 */

const SUBJECTS = ["general", "stockist", "wholesale", "press"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  if (!email) errors.email = "Please add an email address.";
  else if (!EMAIL_RE.test(email)) errors.email = "That email doesn't look right.";
  if (!subject || !SUBJECTS.includes(subject as (typeof SUBJECTS)[number])) {
    errors.subject = "Please choose a subject.";
  }
  if (!message) errors.message = "Please write a short message.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the fields marked below.",
      errors,
      values: { name, email, subject, message },
    };
  }

  // Post-launch swap point: deliver this to email instead of logging.
  console.log("Contact enquiry:", { name, email, subject, message });

  return {
    status: "success",
    message: "Thank you. We reply within two days.",
  };
}
