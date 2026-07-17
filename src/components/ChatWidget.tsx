"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { GREETING, SUGGESTIONS } from "@/lib/concierge";
import { SITE } from "@/lib/site";

/**
 * Floating AI concierge. A glass-dark panel (the design system's one sanctioned
 * frosted surface, §4.1 D5) anchored bottom-right on every page. Answers product
 * questions by streaming from /api/chat, and quietly captures leads via a small
 * inline form that posts to /api/lead.
 *
 * Everything is on-brand: Cormorant display for the title, Jost/label styling
 * for chrome, gold + ink + cream only, motion disabled under reduced-motion.
 */

interface Msg {
  id: string;
  role: "user" | "assistant";
  content: string;
}

type Mode = "chat" | "lead";

/**
 * Near-opaque warm-dark surface for the widget's own panels. The shared
 * `.glass-dark` utility is only 35% opaque — right for floating over the site's
 * dark hero/video, but it washes out to unreadable light grey over white
 * sections. This keeps the frosted blur + gold hairline while guaranteeing the
 * cream text stays legible over ANY page background.
 */
const SURFACE = "rgba(18,16,13,0.95)";

let idSeq = 0;
const nextId = () => `m${++idSeq}`;

export default function ChatWidget() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("chat");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const started = messages.length > 0;

  // Keep the transcript pinned to the newest line as it streams in.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, mode]);

  const closePanel = useCallback(() => {
    setOpen(false);
    window.requestAnimationFrame(() => launcherRef.current?.focus());
  }, []);

  // Focus the active panel when it opens; close on Escape and restore focus.
  useEffect(() => {
    if (!open) return;
    const focusFrame = window.requestAnimationFrame(() => {
      if (mode === "chat") inputRef.current?.focus();
      else {
        panelRef.current
          ?.querySelector<HTMLElement>("input, select, button")
          ?.focus();
      }
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKey);
    };
  }, [closePanel, mode, open]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;
      setError(null);

      const userMsg: Msg = { id: nextId(), role: "user", content: trimmed };
      const assistantId = nextId();
      const history = [...messages, userMsg];

      setMessages([
        ...history,
        { id: assistantId, role: "assistant", content: "" },
      ]);
      setInput("");
      setStreaming(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!res.ok || !res.body) {
          const info = await res.json().catch(() => null);
          throw new Error(info?.error ?? "The concierge is unavailable.");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          if (!chunk) continue;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + chunk }
                : m,
            ),
          );
        }
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Something went wrong.";
        setError(message);
        // Drop the empty assistant bubble if nothing streamed in.
        setMessages((prev) =>
          prev.filter((m) => !(m.id === assistantId && m.content === "")),
        );
      } finally {
        setStreaming(false);
        inputRef.current?.focus();
      }
    },
    [messages, streaming],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  // Newest lines of the transcript, handed to the lead form for context.
  const transcriptContext = messages
    .slice(-6)
    .map((m) => `${m.role === "user" ? "Customer" : "Concierge"}: ${m.content}`)
    .join("\n");

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            ref={launcherRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open the concierge chat"
            aria-expanded={false}
            aria-controls={panelId}
            className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 text-white focus-visible:outline-primary-2 md:bottom-8 md:right-8"
            initial={reduce ? false : { opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
            whileHover={reduce ? undefined : { y: -2 }}
          >
            {/* Little glass text bubble */}
            <span
              className="glass-dark label inline-block px-4 py-2.5 text-white/90 transition-opacity group-hover:text-white"
              style={{ borderRadius: "9999px", background: SURFACE }}
            >
              Ask the Concierge
            </span>

            {/* Circular glass bubble with the concierge icon */}
            <span
              className="glass-dark flex h-14 w-14 items-center justify-center transition-transform group-hover:scale-105"
              style={{ borderRadius: "9999px", background: SURFACE }}
            >
              <ConciergeGlyph />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="false"
            aria-label={`${SITE.name} Concierge`}
            tabIndex={-1}
            className="glass-dark fixed bottom-0 right-0 z-50 flex h-[85dvh] w-full flex-col text-white sm:bottom-6 sm:right-6 sm:h-[560px] sm:w-[400px] md:bottom-8 md:right-8"
            style={{ background: SURFACE }}
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut" }}
          >
            {/* Header */}
            <header className="flex items-center justify-between gap-3 border-b border-primary-border px-5 py-4">
              <div className="flex items-center gap-3">
                <ConciergeMark />
                <div className="leading-tight">
                  <p className="font-sans text-base font-medium tracking-wide">
                    {SITE.name} Concierge
                  </p>
                  <p className="label text-primary">
                    {streaming ? "Typing…" : "Here to help"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closePanel}
                aria-label="Close concierge"
                className="inline-flex min-h-11 min-w-11 items-center justify-center text-white/70 transition-colors hover:text-primary focus-visible:outline-primary-2"
              >
                <CloseIcon />
              </button>
            </header>

            {/* Body */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-5 overflow-y-auto px-5 py-5"
            >
              {mode === "lead" ? (
                <LeadForm
                  context={transcriptContext}
                  onDone={() => setMode("chat")}
                  onCancel={() => setMode("chat")}
                />
              ) : (
                <>
                  {/* Greeting */}
                  <Bubble role="assistant">{GREETING}</Bubble>

                  {/* Suggestion chips (only before the chat starts) */}
                  {!started && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => send(s)}
                          className="label min-h-11 border border-primary-border-strong px-3 py-2 text-primary-2 transition-colors hover:bg-primary hover:text-ink focus-visible:outline-primary-2"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}

                  {messages.map((m) => (
                    <Bubble key={m.id} role={m.role}>
                      {m.content ||
                        (streaming ? <TypingDots /> : null)}
                    </Bubble>
                  ))}

                  {error && (
                    <p role="alert" className="text-sm text-primary-2">
                      {error}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Composer */}
            {mode === "chat" && (
              <div className="border-t border-primary-border px-5 py-4">
                <form onSubmit={onSubmit} className="flex items-end gap-3">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send(input);
                      }
                    }}
                    rows={1}
                    placeholder="Ask about the soap…"
                    aria-label="Message the concierge"
                    className="max-h-28 flex-1 resize-none bg-transparent py-2 text-sm text-white placeholder:text-white/60 focus-visible:outline-primary-2"
                  />
                  <button
                    type="submit"
                    disabled={streaming || !input.trim()}
                    aria-label="Send message"
                    className="label min-h-11 bg-primary px-4 py-2 text-ink transition-opacity hover:opacity-90 focus-visible:outline-primary-2 disabled:opacity-40"
                  >
                    Send
                  </button>
                </form>
                <button
                  type="button"
                  onClick={() => setMode("lead")}
                  className="label mt-2 inline-flex min-h-11 items-center text-white/70 transition-colors hover:text-primary focus-visible:outline-primary-2"
                >
                  Leave your details →
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* Bubbles */

function Bubble({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: React.ReactNode;
}) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] whitespace-pre-wrap bg-primary px-4 py-2 text-sm text-ink">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-[92%] whitespace-pre-wrap text-sm leading-relaxed text-primary-2">
      {children}
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 align-middle" aria-label="Typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="h-1.5 w-1.5 bg-primary"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </span>
  );
}

/* Lead form */

function LeadForm({
  context,
  onDone,
  onCancel,
}: {
  context: string;
  onDone: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("general");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErr(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, interest, context }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
      setDone(data?.message ?? "Thank you. The house will be in touch.");
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="space-y-4">
        <p className="font-display text-2xl leading-snug text-white">{done}</p>
        <button
          type="button"
          onClick={onDone}
          className="label inline-flex min-h-11 items-center text-primary transition-opacity hover:opacity-70 focus-visible:outline-primary-2"
        >
          ← Back to chat
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <p className="font-display text-xl text-white">Leave your details</p>
        <p className="mt-1 text-sm text-white/60">
          The house will follow up with you personally, as soon as we can.
        </p>
      </div>

      <LeadField
        label="Name"
        value={name}
        onChange={setName}
        type="text"
        autoComplete="name"
        autoFocus
      />
      <LeadField
        label="Email"
        value={email}
        onChange={setEmail}
        type="email"
        autoComplete="email"
      />

      <div>
        <label htmlFor="lead-interest" className="label mb-2 block text-white/60">
          Interest
        </label>
        <div className="flex items-center border-b border-primary-border-strong transition-colors focus-within:border-primary">
          <select
            id="lead-interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full appearance-none bg-transparent py-2 text-sm text-white focus-visible:outline-primary-2 [&>option]:text-ink"
          >
            <option value="general">General enquiry</option>
            <option value="stockist">Where to buy</option>
            <option value="wholesale">Wholesale / bulk</option>
            <option value="press">Press</option>
          </select>
          <span aria-hidden className="pointer-events-none pl-3 text-primary">
            ↓
          </span>
        </div>
      </div>

      {err && (
        <p role="alert" className="text-sm text-primary-2">
          {err}
        </p>
      )}

      <div className="flex items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="label min-h-11 bg-primary px-6 py-3 text-ink transition-opacity hover:opacity-90 focus-visible:outline-primary-2 disabled:cursor-wait disabled:opacity-40"
        >
          {submitting ? "Sending…" : "Send"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="label inline-flex min-h-11 items-center text-white/70 transition-colors hover:text-primary focus-visible:outline-primary-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function LeadField({
  label,
  value,
  onChange,
  type,
  autoComplete,
  autoFocus = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
  autoComplete?: string;
  autoFocus?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="label mb-2 block text-white/60">
        {label}
      </label>
      <div className="flex items-center border-b border-primary-border-strong transition-colors focus-within:border-primary">
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          required
          aria-required="true"
          maxLength={type === "email" ? 200 : 120}
          className="w-full bg-transparent py-2 text-sm text-white placeholder:text-white/60 focus-visible:outline-primary-2"
        />
      </div>
    </div>
  );
}

/* Icons */

// Minimal concierge glyph: a gold-stroked chat mark.
function ConciergeMark() {
  return (
    <span
      aria-hidden
      className="flex h-8 w-8 shrink-0 items-center justify-center border border-primary-border-emphasis bg-primary-wash text-primary"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a8.5 8.5 0 0 1-.9-4A8.38 8.38 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z" />
      </svg>
    </span>
  );
}

// Larger bare glyph for the circular launcher bubble.
function ConciergeGlyph() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="text-primary"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a8.5 8.5 0 0 1-.9-4A8.38 8.38 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
