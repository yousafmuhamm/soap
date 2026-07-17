/**
 * Shared types/constants for the contact form. Kept out of actions.ts because a
 * "use server" module may only export async functions - not types or values.
 */

export type ContactFieldName = "name" | "email" | "subject" | "message";

export interface ContactState {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level errors keyed by input name, for inline display. */
  errors?: Partial<Record<ContactFieldName, string>>;
  /** Submitted values echoed back so fields survive a validation round-trip. */
  values?: Partial<Record<ContactFieldName, string>>;
}

export const CONTACT_INITIAL: ContactState = { status: "idle", message: "" };
