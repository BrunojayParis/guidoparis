import Link from "next/link";

type Props = {
  title: string;
  description: string;
  emailLabel: string;
  email: string;
  linkedinLabel: string;
  linkedin: string;
  formCta: string;
};

export function ContactSection({
  title,
  description,
  emailLabel,
  email,
  linkedinLabel,
  linkedin,
  formCta
}: Props) {
  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-semibold text-steel">{title}</h2>
        <p className="mt-3 text-lg text-slate-700">{description}</p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Link href={`mailto:${email}`} className="text-base font-semibold text-steel hover:text-accent">
            {emailLabel}: {email}
          </Link>
          <Link
            href={linkedin}
            className="text-base font-semibold text-steel hover:text-accent"
            target="_blank"
            rel="noreferrer"
          >
            {linkedinLabel}
          </Link>
          <Link
            href={`mailto:${email}?subject=${encodeURIComponent("Hello Guido")}`}
            className="mt-4 inline-flex rounded-full bg-steel px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-navy"
          >
            {formCta}
          </Link>
        </div>
      </div>
    </section>
  );
}

