"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SCENT_FAMILIES } from "@/lib/products";

/**
 * Scent-family filter as text tabs (§3). Active tab carries a yellow underline.
 * Selection lives in the `?scent=` URL query param — no client state library
 * (§4.1 D9). Selecting "All" clears the param.
 */
export default function ScentFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("scent") ?? "all";

  const select = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") {
      params.delete("scent");
    } else {
      params.set("scent", id);
    }
    const qs = params.toString();
    // scroll:false keeps the viewport steady; the grid re-animates in place.
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const tabs = [{ id: "all", name: "All" }, ...SCENT_FAMILIES];

  return (
    <div
      role="tablist"
      aria-label="Filter by scent family"
      className="flex flex-wrap gap-x-8 gap-y-3"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => select(tab.id)}
            className={[
              "label pb-1 transition-opacity",
              isActive
                ? "border-b-2 border-primary text-ink"
                : "border-b-2 border-transparent text-muted hover:opacity-60",
            ].join(" ")}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
}
