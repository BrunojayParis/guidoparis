import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  cvLink: string;
  contactHref: string;
};

export function HeroSection({
  title,
  subtitle,
  primaryCtaLabel,
  secondaryCtaLabel,
  cvLink,
  contactHref
}: Props) {
  return (
    <section id="hero" className="bg-gradient-to-b from-white to-cloud/70 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-steel">Guido Paris</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-steel sm:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-slate-700 sm:text-xl">{subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={cvLink}
              className="rounded-full bg-steel px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-navy"
            >
              {primaryCtaLabel}
            </Link>
            <Link
              href={contactHref}
              className="rounded-full border border-steel px-5 py-3 text-sm font-semibold text-steel transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              {secondaryCtaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

