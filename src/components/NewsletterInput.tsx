"use client";

import { useState } from "react";

/**
 * Footer newsletter capture. Underline-style input with a yellow underline on
 * focus. Client-side only in v1 — logs and confirms; email wiring is post-launch
 * (§4.1 D8). No boxes, no shadows.
 */
export default function NewsletterInput() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Post-launch: POST to a list provider. For now, confirm locally.
    console.log("Newsletter signup:", email);
    setDone(true);
  };

  if (done) {
    return (
      <p className="text-sm text-muted">
        Thank you. Look out for us in your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xs">
      <label htmlFor="newsletter-email" className="label mb-3 block text-muted">
        Newsletter
      </label>
      <div className="flex items-center border-b border-ink focus-within:border-primary">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full bg-transparent py-2 text-sm text-ink placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          className="label shrink-0 pl-3 text-ink transition-opacity hover:opacity-60"
          aria-label="Subscribe"
        >
          Join
        </button>
      </div>
    </form>
  );
}
