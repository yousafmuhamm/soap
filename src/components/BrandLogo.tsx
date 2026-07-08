import { SITE } from "@/lib/site";

interface BrandLogoProps {
  className?: string;
  decorative?: boolean;
}

export default function BrandLogo({
  className = "",
  decorative = false,
}: BrandLogoProps) {
  return (
    <span
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : SITE.name}
      className={["brand-logo inline-block shrink-0 bg-current", className]
        .filter(Boolean)
        .join(" ")}
      role={decorative ? undefined : "img"}
    />
  );
}
