import Link from "next/link";

type Props = {
  title: string;
  description: string;
  emailLabel: string;
  email: string;
  linkedinLabel: string;
  linkedin: string;
  whatsappLabel: string;
  whatsapp: string;
};

export function ContactSection({
  title,
  description,
  emailLabel,
  email,
  linkedinLabel,
  linkedin,
  whatsappLabel,
  whatsapp
}: Props) {
  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-semibold text-steel">{title}</h2>
        <p className="mt-3 text-lg text-slate-700">{description}</p>
        <address className="mt-6 flex items-center justify-center gap-4 not-italic">
          <Link
            href={`mailto:${email}`}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-steel shadow-card transition hover:-translate-y-0.5 hover:text-accent"
            aria-label={`${emailLabel}: ${email}`}
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2 8 5 8-5" />
            </svg>
          </Link>
          <Link
            href={linkedin}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-steel shadow-card transition hover:-translate-y-0.5 hover:text-accent"
            target="_blank"
            rel="noreferrer"
            aria-label={linkedinLabel}
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3zM9 9h4v1.7c.6-1 1.7-2 3.6-2 3.8 0 4.4 2.5 4.4 5.7V21h-4v-5.3c0-1.3 0-3-1.9-3-1.9 0-2.2 1.4-2.2 2.9V21H9z" />
            </svg>
          </Link>
          <Link
            href={whatsapp}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-steel shadow-card transition hover:-translate-y-0.5 hover:text-accent"
            target="_blank"
            rel="noreferrer"
            aria-label={whatsappLabel}
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M12.04 2a10 10 0 0 0-8.66 14.96L2 22l5.2-1.36A10 10 0 1 0 12.04 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.08.8.82-3-.2-.31A8.2 8.2 0 1 1 12.04 20.2Zm4.68-6.07c-.26-.13-1.53-.75-1.76-.84-.24-.09-.41-.13-.59.14-.17.26-.67.84-.82 1.01-.15.17-.3.2-.56.07-.26-.13-1.1-.4-2.1-1.28-.78-.7-1.3-1.56-1.46-1.82-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.42-.81-1.95-.21-.52-.42-.45-.59-.46h-.5c-.17 0-.46.06-.7.33-.24.26-.92.9-.92 2.2 0 1.3.95 2.55 1.08 2.73.13.17 1.87 2.86 4.53 4.01.63.27 1.12.43 1.5.55.63.2 1.2.17 1.65.1.5-.08 1.53-.63 1.75-1.24.22-.62.22-1.15.15-1.24-.07-.09-.24-.15-.5-.28Z" />
            </svg>
          </Link>
        </address>
      </div>
    </section>
  );
}

