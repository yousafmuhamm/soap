/**
 * Concierge lead capture. Validates an enquiry raised from the chat widget and
 * delivers it to the house inbox via the shared mailer.
 */

import { sendLeadEmail, titleCase } from "@/lib/mailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INTERESTS = new Set(["general", "stockist", "wholesale", "press"]);

interface LeadPayload {
  name?: unknown;
  email?: unknown;
  interest?: unknown;
  /** Recent transcript snippet, for context on what the lead was asking. */
  context?: unknown;
}

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const interest = String(body.interest ?? "general").trim().slice(0, 60);
  const context = String(body.context ?? "").trim().slice(0, 2000);

  if (!name) {
    return Response.json({ error: "Please add a name." }, { status: 422 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { error: "That email doesn't look right." },
      { status: 422 },
    );
  }
  if (!INTERESTS.has(interest)) {
    return Response.json({ error: "Please choose a valid interest." }, { status: 422 });
  }

  const delivered = await sendLeadEmail({
    subject: `New concierge lead (${interest}) - ${name}`,
    heading: "New concierge lead",
    replyTo: email,
    fields: [
      ["Name", name],
      ["Email", email],
      ["Interest", titleCase(interest)],
      ["Source", "Concierge chat"],
    ],
    ...(context ? { blocks: [{ title: "Chat context", body: context }] } : {}),
  });

  if (!delivered) {
    return Response.json(
      {
        error:
          "We couldn't send your details just now. Please try again or use the contact page.",
      },
      { status: 503 },
    );
  }

  return Response.json({
    ok: true,
    message: "Thank you. The house will be in touch with you as soon as we can.",
  });
}
