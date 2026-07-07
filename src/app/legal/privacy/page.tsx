import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How SAVON handles the information you share with us.",
};

/**
 * Placeholder privacy policy. Replace with the client's reviewed legal copy
 * before launch (delivery checklist).
 */
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[65ch] px-5 pb-24 pt-28 md:pb-32 md:pt-36">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />
      <h1 className="mt-8 font-display text-5xl leading-tight md:text-6xl">
        Privacy
      </h1>
      <p className="label mt-6 text-muted">Placeholder — to be reviewed</p>

      <div className="mt-12 space-y-6 text-base leading-relaxed text-ink/85">
        <p>
          This page describes how we handle the information you share with us. It
          is placeholder text and will be replaced with a reviewed policy before
          launch.
        </p>
        <h2 className="pt-4 font-display text-2xl text-ink">What we collect</h2>
        <p>
          When you write to us or subscribe to our newsletter, we keep the name
          and email address you provide, and the content of your message. We use
          it only to reply to you and, if you have asked, to send occasional
          updates.
        </p>
        <h2 className="pt-4 font-display text-2xl text-ink">
          What we don&rsquo;t do
        </h2>
        <p>
          We do not sell your information. We do not share it with third parties
          except the services we use to send email, and only as needed to reach
          you.
        </p>
        <h2 className="pt-4 font-display text-2xl text-ink">Getting in touch</h2>
        <p>
          You can ask us to show you what we hold, or to delete it, at any time.
          Write to us and we will act within a reasonable period.
        </p>
      </div>
    </div>
  );
}
