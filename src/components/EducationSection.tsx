type EducationItem = {
  title: string;
  school: string;
  period: string;
  location: string;
};

type Props = {
  title: string;
  items: EducationItem[];
};

export function EducationSection({ title, items }: Props) {
  return (
    <section id="education" className="py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-semibold text-steel">{title}</h2>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
              <p className="text-lg font-semibold text-steel">{item.title}</p>
              <p className="text-slate-700">{item.school}</p>
              <p className="text-sm text-slate-500">
                {item.period} • {item.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

