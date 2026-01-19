import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/src/i18n/settings";
import type { ProjectRecord } from "@/src/types/projects";

type Props = {
  locale: Locale;
  title: string;
  subtitle: string;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1200&q=60";

async function fetchProjects(locale: Locale): Promise<ProjectRecord[]> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/projects?locale=${locale}`, {
    next: { revalidate: 900 }
  });

  if (!res.ok) {
    console.error("Failed to load projects", res.status);
    return [];
  }

  return (await res.json()) as ProjectRecord[];
}

export async function ProjectsSection({ locale, title, subtitle }: Props) {
  const projects = await fetchProjects(locale);

  return (
    <section id="projects" className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-steel">{title}</h2>
            <p className="mt-2 text-slate-600">{subtitle}</p>
          </div>
          <div className="hidden text-sm text-slate-500 sm:block">
            Google Sheets → API → Next.js (caché ~15 min)
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9] bg-cloud">
                <Image
                  src={project.imageUrl || FALLBACK_IMAGE}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
              </div>
              <div className="flex h-full flex-col gap-3 p-5">
                <div>
                  <h3 className="text-xl font-semibold text-steel">{project.title}</h3>
                  <p className="mt-2 text-slate-700">{project.description}</p>
                </div>
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-cloud px-3 py-1 text-xs font-medium text-steel"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {project.link && (
                  <div className="mt-auto">
                    <Link
                      href={project.link}
                      className="text-sm font-semibold text-steel underline underline-offset-4 hover:text-accent"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {locale === "it" ? "Apri il progetto" : "View project"}
                    </Link>
                  </div>
                )}
              </div>
            </article>
          ))}

          {projects.length === 0 && (
            <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
              {locale === "it"
                ? "Nessun progetto disponibile al momento. Controlla la connessione al Google Sheet."
                : "No projects available right now. Check the connection to Google Sheets."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

