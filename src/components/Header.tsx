import Link from "next/link";
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher";
import type { Locale } from "@/src/i18n/settings";

export type NavLink = { href: string; label: string };

type Props = {
  locale: Locale;
  navLinks: NavLink[];
  cvLink: string;
  primaryCtaLabel: string;
  roleLabel: string;
  name: string;
  switcherLabels: { it: string; en: string; aria: string };
};

export function Header({
  locale,
  navLinks,
  cvLink,
  primaryCtaLabel,
  roleLabel,
  name,
  switcherLabels
}: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-steel text-center text-lg font-bold uppercase text-white shadow-card">
            {name.slice(0, 1).toLowerCase()}
            {name.split(" ").slice(-1)[0]?.slice(0, 1).toLowerCase() || ""}
          </div>
          <div>
            <p className="text-sm text-slate-500">{name}</p>
            <p className="text-base font-semibold text-steel">{roleLabel}</p>
          </div>
        </div>
        <nav aria-label="Primary" className="hidden gap-4 text-sm font-medium text-steel sm:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-accent">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={cvLink}
            className="hidden rounded-full border border-steel px-3 py-1.5 text-sm font-semibold text-steel transition hover:bg-steel hover:text-white sm:inline-flex"
          >
            {primaryCtaLabel}
          </Link>
          <LanguageSwitcher
            currentLocale={locale}
            labels={{ it: switcherLabels.it, en: switcherLabels.en }}
            ariaLabel={switcherLabels.aria}
          />
        </div>
      </div>
    </header>
  );
}

