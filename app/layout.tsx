import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import { defaultLocale, locales } from "@/src/i18n/settings";
import type { Locale } from "@/src/i18n/settings";

const inter = Inter({ subsets: ["latin"] });

function resolveLocale(): Locale {
  const cookieLocale = cookies().get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }
  return defaultLocale;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const locale = resolveLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} bg-cloud/30`}>{children}</body>
    </html>
  );
}

