type SkillCategory = {
  label: string;
  items: string[];
};

type Props = {
  title: string;
  categories: SkillCategory[];
};

export function SkillsSection({ title, categories }: Props) {
  return (
    <section id="skills" className="bg-cloud/60 py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-semibold text-steel">{title}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h3 className="text-xl font-semibold text-steel">{category.label}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <li key={skill} className="rounded-full bg-cloud px-3 py-1 text-sm font-medium text-steel">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

