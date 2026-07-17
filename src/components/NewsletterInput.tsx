"use client";

import { useState } from "react";

/**
 * Footer wholesale-updates capture. It uses the shared lead endpoint so an
 * address is never silently accepted without reaching the house inbox.
 */
export default function NewsletterInput() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || pending) return;
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Wholesale updates subscriber",
          email,
          interest: "wholesale",
          context: "Requested wholesale updates from the site footer.",
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error ?? "We couldn't add you just now.");
      }
      setDone(true);
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "We couldn't add you just now.",
      );
    } finally {
      setPending(false);
    }
  };

  if (done) {
    return (
      <p role="status" className="text-sm text-muted">
        Thank you. We&apos;ll keep you informed.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xs">
      <label htmlFor="newsletter-email" className="label mb-3 block text-muted">
        Wholesale updates
      </label>
      <div className="flex items-center border-b border-ink focus-within:border-primary">
        <input
          id="newsletter-email"
          type="email"
          required
          aria-required="true"
          maxLength={200}
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full bg-transparent py-2 text-sm text-ink placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={pending}
          className="label inline-flex min-h-11 shrink-0 items-center pl-3 text-ink transition-opacity hover:opacity-60 disabled:cursor-wait disabled:opacity-50"
          aria-label="Subscribe"
        >
          {pending ? "Joining…" : "Join"}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm text-ink">
          {error}
        </p>
      )}
    </form>
  );
}
