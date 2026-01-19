type Props = {
  title: string;
  note: string;
  items: string[];
};

export function CertificationsSection({ title, note, items }: Props) {
  return (
    <section className="bg-cloud/60 py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-semibold text-steel">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{note}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {items.map((cert) => (
            <span
              key={cert}
              className="rounded-full border border-steel/20 bg-white px-4 py-2 text-sm font-medium text-steel shadow-sm"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

