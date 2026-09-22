import { get } from "@vercel/blob";
export async function GET(request: Request) {
  try {
    const shareId = new URL(request.url).searchParams.get("id");
    if (!shareId || !/^[a-f0-9]{32}$/.test(shareId)) {
      return new Response("Invalid share link.", { status: 400 });
    }
    const metadataBlob = await get(`shares/${shareId}.json`, {
      access: "private",
      useCache: false,
    });
    if (!metadataBlob || !("stream" in metadataBlob)) {
      return new Response("Share link not found.", { status: 404 });
    }
    const metadataResponse = new Response(metadataBlob.stream);
    const metadataText = await metadataResponse.text();
    const payload = JSON.parse(metadataText);
    if (Date.now() >= new Date(payload.expiresAt).getTime()) {
      return new Response("This share link has expired.", { status: 410 });
    }
    if (
      payload.kind !== "image" &&
      payload.kind !== "batch" &&
      payload.kind !== "video"
    ) {
      return new Response("This share does not contain a supported file.", {
        status: 400,
      });
    }
    if (typeof payload.value !== "string") {
      return new Response("Invalid shared file.", { status: 400 });
    }
    const assetBlob = await get(payload.value, {
      access: "private",
      useCache: false,
    });
    if (!assetBlob || !("stream" in assetBlob)) {
      return new Response("Shared file not found.", { status: 404 });
    }
    const isDownload = payload.kind === "batch";
    return new Response(assetBlob.stream, {
      status: 200,
      headers: {
        "Content-Type":
          payload.contentType || "application/octet-stream",
        "Content-Disposition": `${
          isDownload ? "attachment" : "inline"
        }; filename="${payload.filename || "shared-file"}"`,
        "Cache-Control": "private, max-age=3600",
        ...(payload.kind === "video"
          ? {
              "Accept-Ranges": "bytes",
            }
          : {}),
      },
    });
  } catch (error) {
    console.error("Shared file retrieval error:", error);
    return new Response("Unable to load shared file.", {
      status: 404,
    });
  }
}
