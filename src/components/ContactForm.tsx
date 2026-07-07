"use client";

import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitContact } from "@/app/contact/actions";
import { CONTACT_INITIAL, type ContactState } from "@/app/contact/types";
import { getProduct } from "@/lib/products";

const SUBJECT_OPTIONS = [
  { value: "general", label: "General enquiry" },
  { value: "stockist", label: "Find a stockist" },
  { value: "wholesale", label: "Wholesale enquiry" },
  { value: "press", label: "Press" },
] as const;

/**
 * Contact form: underline-style inputs (no boxes), ink underline → yellow on
 * focus. Inline validation via the server action's field errors. Subject and
 * message pre-fill from the URL: ?product=<slug> (an enquiry about one bar) or
 * ?subject=wholesale (from the footer link).
 */
export default function ContactForm() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get("product");
  const subjectParam = searchParams.get("subject");
  const product = productSlug ? getProduct(productSlug) : undefined;

  const defaultSubject = product
    ? "stockist"
    : subjectParam === "wholesale"
      ? "wholesale"
      : "general";

  const defaultMessage = product
    ? `I'd like to know where I can buy ${product.name}.`
    : "";

  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitContact,
    CONTACT_INITIAL,
  );

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="font-display text-3xl leading-snug md:text-4xl"
      >
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-10" noValidate>
      <Field
        name="name"
        label="Name"
        type="text"
        autoComplete="name"
        defaultValue={state.values?.name ?? ""}
        error={state.errors?.name}
      />
      <Field
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        defaultValue={state.values?.email ?? ""}
        error={state.errors?.email}
      />

      <SelectField
        name="subject"
        label="Subject"
        defaultValue={state.values?.subject ?? defaultSubject}
        error={state.errors?.subject}
      />

      <TextareaField
        name="message"
        label="Message"
        defaultValue={state.values?.message ?? defaultMessage}
        error={state.errors?.message}
      />

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-ink">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="label bg-ink px-10 py-4 text-white transition-colors hover:bg-primary hover:text-ink disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}

/* ---- field primitives (underline style, yellow focus) ---- */

// Underline wrapper: ink rule that turns yellow on focus. Errors are surfaced
// as text below the field rather than by recolouring the rule.
const FIELD_WRAP =
  "flex items-center border-b border-ink transition-colors focus-within:border-primary";

function Field({
  name,
  label,
  type,
  autoComplete,
  defaultValue,
  error,
}: {
  name: string;
  label: string;
  type: string;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label mb-3 block text-muted">
        {label}
      </label>
      <div className={FIELD_WRAP}>
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          className="w-full bg-transparent py-2 text-base text-ink focus:outline-none"
        />
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-muted">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  name,
  label,
  defaultValue,
  error,
}: {
  name: string;
  label: string;
  defaultValue: string;
  error?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div>
      <label htmlFor={name} className="label mb-3 block text-muted">
        {label}
      </label>
      <div className={FIELD_WRAP}>
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          className="w-full appearance-none bg-transparent py-2 text-base text-ink focus:outline-none"
        >
          {SUBJECT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span aria-hidden className="pointer-events-none pl-3 text-ink">
          ↓
        </span>
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-muted">
          {error}
        </p>
      )}
    </div>
  );
}

function TextareaField({
  name,
  label,
  defaultValue,
  error,
}: {
  name: string;
  label: string;
  defaultValue: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label mb-3 block text-muted">
        {label}
      </label>
      <div className={FIELD_WRAP}>
        <textarea
          id={name}
          name={name}
          rows={4}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          className="w-full resize-none bg-transparent py-2 text-base text-ink focus:outline-none"
        />
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-muted">
          {error}
        </p>
      )}
    </div>
  );
}
