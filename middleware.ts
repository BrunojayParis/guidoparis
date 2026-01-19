import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "./src/i18n/settings";

function parsePreferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const preferences = header
    .split(",")
    .map((part) => {
      const [lang, qValue] = part.trim().split(";q=");
      const quality = qValue ? parseFloat(qValue) : 1;
      return { lang: lang.toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const pref of preferences) {
    const baseLang = pref.lang.split("-")[0];
    if (locales.includes(baseLang as Locale)) {
      return baseLang as Locale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  const preferred = parsePreferredLocale(request);

  if (pathname === "/") {
    const url = new URL(`/${preferred}`, request.url);
    const response = NextResponse.redirect(url);
    response.cookies.set("NEXT_LOCALE", preferred);
    return response;
  }

  if (!hasLocale) {
    const url = new URL(`/${preferred}${pathname}`, request.url);
    const response = NextResponse.redirect(url);
    response.cookies.set("NEXT_LOCALE", preferred);
    return response;
  }

  const currentLocale = pathname.split("/")[1] as Locale;
  const response = NextResponse.next();
  response.cookies.set("NEXT_LOCALE", currentLocale);
  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"]
};

