type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
};

type Props = {
  title: string;
  items: ExperienceItem[];
};

export function ExperienceSection({ title, items }: Props) {
  return (
    <section id="experience" className="bg-cloud/40 py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-semibold text-steel">{title}</h2>
        <div className="mt-6 space-y-6">
          {items.map((item) => (
            <article
              key={item.role + item.company}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-semibold text-steel">{item.role}</h3>
                <p className="text-sm text-slate-500">
                  {item.period} • {item.location}
                </p>
              </div>
              <p className="text-slate-700">{item.company}</p>
              <ul className="mt-3 space-y-2 text-slate-700">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent" aria-hidden />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

