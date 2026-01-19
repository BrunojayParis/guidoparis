"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/src/i18n/settings";

type Props = {
  currentLocale: Locale;
  labels: { it: string; en: string };
  ariaLabel: string;
};

export function LanguageSwitcher({ currentLocale, labels, ariaLabel }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale: Locale = currentLocale === "it" ? "en" : "it";
  const segments = pathname.split("/").filter(Boolean);
  const rest = segments.slice(1).join("/");
  const basePath = rest ? `/${rest}` : "";
  const handleClick = () => {
    const hash = typeof window === "undefined" ? "" : window.location.hash ?? "";
    const target = `/${nextLocale}${basePath}${hash}`;
    router.push(target);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-steel shadow-sm transition hover:border-steel hover:text-steel/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={ariaLabel}
    >
      {nextLocale === "it" ? labels.it : labels.en}
    </button>
  );
}

