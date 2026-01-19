import Link from "next/link";

type FooterLink = { href: string; label: string };

type Props = {
  cta: string;
  links: FooterLink[];
};

export function FooterSection({ cta, links }: Props) {
  return (
    <footer className="border-t border-slate-200 bg-white py-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">{cta}</p>
        <div className="flex gap-3 text-sm text-slate-500">
          {links.map((item) => (
            <Link key={item.href} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

