import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Find a stockist, ask about wholesale, or say hello. We reply within two days.",
};

/**
 * /contact — a centered enquiry form. The form reads ?product / ?subject and
 * uses useSearchParams, so it sits inside a Suspense boundary.
 */
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-5 pb-24 pt-28 md:pb-32 md:pt-36">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <h1 className="mt-8 font-display text-5xl leading-tight md:text-6xl">
        Get in touch
      </h1>
      <p className="mt-6 text-base text-muted">
        Looking for a stockist, wholesale terms, or just curious? Write to us
        below, or email{" "}
        <a
          href={`mailto:${SITE.email}`}
          className="border-b border-primary pb-0.5 text-ink transition-opacity hover:opacity-60"
        >
          {SITE.email}
        </a>
        .
      </p>

      <div className="mt-14">
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
