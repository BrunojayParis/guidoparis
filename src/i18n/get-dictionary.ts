import type en from "./en.json";
import type { Locale } from "./settings";

export type Dictionary = typeof en;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case "it":
      return (await import("./it.json")).default;
    case "en":
      return (await import("./en.json")).default;
    default:
      return (await import("./en.json")).default;
  }
}

