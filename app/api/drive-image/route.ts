import { google } from "googleapis";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE_SECONDS = 1800;

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

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
  const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

    if (!id) {
        return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

  if (!rootFolderId) {
    return NextResponse.json({ error: "Missing root folder id" }, { status: 500 });
  }

    try {
        const auth = await getAuthClient();
        const drive = google.drive({ version: "v3", auth });

    const isDescendantOfRoot = async (fileId: string, rootId: string) => {
      const visited = new Set<string>();
      let currentIds: string[] = [fileId];
      let depth = 0;

      while (currentIds.length > 0 && depth < 10) {
        const nextIds: string[] = [];
        for (const currentId of currentIds) {
          if (visited.has(currentId)) continue;
          visited.add(currentId);

          const meta = await drive.files.get({
            fileId: currentId,
            fields: "id, parents",
            supportsAllDrives: true
          });

          const parents = meta.data.parents ?? [];
          if (parents.includes(rootId)) {
            return true;
          }

          nextIds.push(...parents);
        }

        currentIds = nextIds;
        depth += 1;
      }

      return false;
    };

    const allowed = await isDescendantOfRoot(id, rootFolderId);
    if (!allowed) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const res = await drive.files.get(
      { fileId: id, alt: "media", supportsAllDrives: true },
            { responseType: "arraybuffer" }
        );

        const contentType = res.headers["content-type"] ?? "image/jpeg";
        const buffer = Buffer.from(res.data as ArrayBuffer);

        const response = new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=300`
            }
        });

        return response;
    } catch (error) {
        console.error("Drive image fetch failed", error);
        return NextResponse.json({ error: "Image not available" }, { status: 404 });
    }
}
