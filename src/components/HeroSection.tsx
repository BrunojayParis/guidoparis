import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  secondaryCtaLabel: string;
  contactHref: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function HeroSection({
  title,
  subtitle,
  secondaryCtaLabel,
  contactHref,
  imageSrc,
  imageAlt
}: Props) {
  return (
    <section id="hero" className="bg-gradient-to-b from-white to-cloud/70 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-steel">Guido Paris</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-steel sm:text-5xl">{title}</h1>
            <p className="mt-4 text-lg text-slate-700 sm:text-xl">{subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={contactHref}
                className="rounded-full border border-steel px-5 py-3 text-sm font-semibold text-steel transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                {secondaryCtaLabel}
              </Link>
            </div>
          </div>
          {imageSrc && (
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
              <Image
                src={imageSrc}
                alt={imageAlt ?? "Portrait"}
                width={480}
                height={600}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

