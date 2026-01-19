import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { getDictionary } from "@/src/i18n/get-dictionary";
import type { Locale } from "@/src/i18n/settings";
import { locales } from "@/src/i18n/settings";

type Props = {
  children: ReactNode;
  params: { locale: Locale };
};

const siteUrl = process.env.SITE_URL || "https://guido-paris.example";

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.locale);
  const title = dictionary.meta.title;
  const description = dictionary.meta.description;
  const locale = params.locale;
  const alternateLocale = locales.find((lng) => lng !== locale) ?? "en";

  const url = `${siteUrl}/${locale}`;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
      languages: {
        [locale]: url,
        [alternateLocale]: `${siteUrl}/${alternateLocale}`
      }
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Guido Paris Portfolio",
      locale,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Guido Paris",
    jobTitle: params.locale === "it" ? "Ingegnere Meccanico" : "Mechanical Engineer",
    url: `${siteUrl}/${params.locale}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "Italy"
    },
    sameAs: ["https://www.linkedin.com/in/guido-paris"]
  };

  return (
    <>
      <Script id="person-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <main className="min-h-screen bg-white text-slate-900">{children}</main>
    </>
  );
}

