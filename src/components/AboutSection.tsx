type Props = {
  title: string;
  body: string;
};

export function AboutSection({ title, body }: Props) {
  return (
    <section id="about" className="py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-semibold text-steel">{title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">{body}</p>
      </div>
    </section>
  );
}

