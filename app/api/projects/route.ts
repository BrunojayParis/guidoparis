import { google } from "googleapis";
import { NextResponse } from "next/server";
import type { Locale } from "@/src/i18n/settings";
import type { ProjectRecord } from "@/src/types/projects";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE_SECONDS = 900;

const fallback: ProjectRecord[] = [
  {
    id: "fallback-01",
    order: 1,
    visible: true,
    title: "Attuatore compatto per linea di assemblaggio",
    description: "Ridisegno per DFM con riduzione peso 8% e manutenzione facilitata.",
    tags: ["DFM", "Testing", "Automazione"],
    link: "https://example.com/progetto-1",
    imageUrl: "https://images.unsplash.com/photo-1581091012184-5c1b9b88f14d?auto=format&fit=crop&w=1200&q=60"
  },
  {
    id: "fallback-02",
    order: 2,
    visible: true,
    title: "Bracket strutturale per veicolo elettrico",
    description: "Ottimizzazione FEM per vibrazioni e fatica, validata in prototipo.",
    tags: ["FEM", "NVH", "EV"],
    link: "https://example.com/progetto-2",
    imageUrl: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=60"
  }
];

async function getAuthClient() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google Sheets credentials");
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  });
}

function normalizeRow(row: string[], locale: Locale): ProjectRecord | null {
  const [
    id,
    order,
    visible,
    titleIt,
    descriptionIt,
    titleEn,
    descriptionEn,
    tags,
    link,
    imageUrl
  ] = row;

  if (!id) return null;

  const title = locale === "it" ? titleIt || titleEn : titleEn || titleIt;
  const description = locale === "it" ? descriptionIt || descriptionEn : descriptionEn || descriptionIt;

  return {
    id,
    order: Number(order ?? 0),
    visible: String(visible).toLowerCase() === "true",
    title: title?.trim() ?? "Untitled",
    description: description?.trim() ?? "",
    tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    link: link?.trim() || undefined,
    imageUrl: imageUrl?.trim() || undefined
  };
}

async function fetchFromSheets(locale: Locale): Promise<ProjectRecord[]> {
  const auth = await getAuthClient();
  const sheets = google.sheets({ version: "v4", auth });

  const sheetId = process.env.GOOGLE_SHEETS_SHEET_ID;
  const range = process.env.GOOGLE_SHEETS_RANGE || "Projects!A2:K200";

  if (!sheetId) {
    throw new Error("GOOGLE_SHEETS_SHEET_ID is missing");
  }

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range
  });

  const rows = res.data.values ?? [];

  return rows
    .map((row) => normalizeRow(row, locale))
    .filter((r): r is ProjectRecord => Boolean(r))
    .filter((r) => r.visible)
    .sort((a, b) => a.order - b.order);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") || "it") as Locale;

  try {
    const projects = await fetchFromSheets(locale);
    const response = NextResponse.json(projects, {
      status: 200
    });
    response.headers.set("Cache-Control", `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=300`);
    return response;
  } catch (error) {
    console.error("Sheets fetch failed, returning fallback", error);
    const response = NextResponse.json(fallback, { status: 200 });
    response.headers.set("Cache-Control", `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=300`);
    return response;
  }
}

