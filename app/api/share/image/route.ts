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
    if (payload.kind !== "image" || typeof payload.value !== "string") {
      return new Response("This share does not contain an image.", {
        status: 400,
      });
    }
    const imageBlob = await get(payload.value, {
      access: "private",
      useCache: false,
    });
    if (!imageBlob || !("stream" in imageBlob)) {
      return new Response("Shared image not found.", { status: 404 });
    }
    return new Response(imageBlob.stream, {
      status: 200,
      headers: {
        "Content-Type": payload.contentType || "application/octet-stream",
        "Content-Disposition": `inline; filename="${payload.filename || "shared-image"}"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Shared image retrieval error:", error);
    return new Response("Unable to load shared image.", {
      status: 404,
    });
  }
}
