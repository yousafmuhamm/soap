import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { SITE } from "@/lib/site";

// Display serif for headlines. Cormorant stays the luxury anchor.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

// Secondary voice: Jost - a geometric, fashion-forward grotesque that reads
// more couture than the old Inter while holding up at tiny uppercase tracking.
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}: ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${jost.variable}`}
    >
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only fixed left-4 top-4 z-[100] bg-bg px-4 py-3 text-sm text-ink focus:not-sr-only"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
