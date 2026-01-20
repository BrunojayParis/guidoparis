import { google } from "googleapis";
import { NextResponse } from "next/server";
import type { ProjectRecord } from "@/src/types/projects";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE_SECONDS = 900;

const fallback: ProjectRecord[] = [
  {
    id: "fallback-01",
    order: 1,
    visible: true,
    title: "Project folder example",
    description: "Create a project folder in Google Drive with JPG images and a description.txt file.",
    tags: [],
    link: "https://drive.google.com",
    imageUrl: "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1200&q=60"
  }
];

async function getAuthClient() {
  const clientEmail = process.env.GOOGLE_DRIVE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google Drive credentials");
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"]
  });
}

async function fetchTextFile(drive: ReturnType<typeof google.drive>, fileId: string): Promise<string> {
  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "text" }
  );
  return typeof res.data === "string" ? res.data : "";
}

async function fetchProjectFolders(rootFolderId: string) {
  const auth = await getAuthClient();
  const drive = google.drive({ version: "v3", auth });

  const foldersRes = await drive.files.list({
    q: `'${rootFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: "files(id, name)",
    orderBy: "name",
    includeItemsFromAllDrives: true,
    supportsAllDrives: true
  });

  const folders = foldersRes.data.files ?? [];

  const projects: ProjectRecord[] = [];

  for (const [index, folder] of folders.entries()) {
    if (!folder.id || !folder.name) continue;

    const filesRes = await drive.files.list({
      q: `'${folder.id}' in parents and trashed=false`,
      fields: "files(id, name, mimeType)",
      orderBy: "name",
      includeItemsFromAllDrives: true,
      supportsAllDrives: true
    });

    const files = filesRes.data.files ?? [];
    const descriptionFile = files.find((file) => file.name?.toLowerCase().endsWith(".txt"));
    const imageFile = files.find((file) => {
      const name = file.name?.toLowerCase() ?? "";
      const isJpg = file.mimeType === "image/jpeg" && (name.endsWith(".jpg") || name.endsWith(".jpeg"));
      const isPng = file.mimeType === "image/png" && name.endsWith(".png");
      return isJpg || isPng;
    });

    const description = descriptionFile?.id
      ? (await fetchTextFile(drive, descriptionFile.id)).trim()
      : "";

    const imageUrl = imageFile?.id ? `/api/drive-image?id=${imageFile.id}` : undefined;

    projects.push({
      id: folder.id,
      order: index + 1,
      visible: true,
      title: folder.name,
      description,
      tags: [],
      link: `https://drive.google.com/drive/folders/${folder.id}`,
      imageUrl
    });
  }

  return projects;
}

export async function GET() {
  const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
  if (!rootFolderId) {
    console.error("GOOGLE_DRIVE_ROOT_FOLDER_ID is missing");
    return NextResponse.json(fallback, { status: 200 });
  }

  try {
    const projects = await fetchProjectFolders(rootFolderId);
    const response = NextResponse.json(projects, { status: 200 });
    response.headers.set("Cache-Control", `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=300`);
    return response;
  } catch (error) {
    console.error("Drive fetch failed, returning fallback", error);
    const response = NextResponse.json(fallback, { status: 200 });
    response.headers.set("Cache-Control", `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=300`);
    return response;
  }
}
