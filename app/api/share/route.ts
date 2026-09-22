import { get, put } from "@vercel/blob";
import { randomBytes } from "crypto";
const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
type SharePayload =
  | {
      tool: string;
      resultTitle: string;
      kind: "text";
      value: string;
      filename: string;
      createdAt: string;
      expiresAt: string;
    }
  | {
      tool: string;
      resultTitle: string;
      kind: "image";
      value: string;
      filename: string;
      contentType: string;
      createdAt: string;
      expiresAt: string;
    };
export async function POST(request: Request) {
  try {
    const shareId = randomBytes(16).toString("hex");
    const now = Date.now();
    const expiresAt = new Date(now + ONE_MONTH_MS);
    const requestContentType = request.headers.get("content-type") || "";
    let payload: SharePayload;
    if (requestContentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const tool = formData.get("tool");
      const resultTitle = formData.get("resultTitle");
      const filename = formData.get("filename");
      const image = formData.get("image");
      if (
        typeof tool !== "string" ||
        typeof resultTitle !== "string" ||
        typeof filename !== "string" ||
        !(image instanceof File)
      ) {
        return Response.json(
          { error: "Invalid image share data." },
          { status: 400 }
        );
      }
      if (!image.type.startsWith("image/")) {
        return Response.json(
          { error: "Only image files can be shared." },
          { status: 400 }
        );
      }
      if (image.size > MAX_IMAGE_SIZE) {
        return Response.json(
          { error: "Image is too large. Maximum share image size is 4 MB." },
          { status: 413 }
        );
      }
      const extension =
        image.type === "image/jpeg"
          ? "jpg"
          : image.type === "image/png"
            ? "png"
            : image.type === "image/webp"
              ? "webp"
              : "img";
      const assetKey = `share-assets/${shareId}.${extension}`;
      await put(assetKey, image, {
        access: "private",
        contentType: image.type,
      });
      payload = {
        tool,
        resultTitle,
        kind: "image",
        value: assetKey,
        filename,
        contentType: image.type,
        createdAt: new Date(now).toISOString(),
        expiresAt: expiresAt.toISOString(),
      };
    } else {
      const body = await request.json();
      const { tool, resultTitle, value, filename } = body;
      if (
        typeof tool !== "string" ||
        typeof resultTitle !== "string" ||
        typeof value !== "string" ||
        typeof filename !== "string"
      ) {
        return Response.json(
          { error: "Invalid share data." },
          { status: 400 }
        );
      }
      if (!value.trim()) {
        return Response.json(
          { error: "Cannot share an empty result." },
          { status: 400 }
        );
      }
      payload = {
        tool,
        resultTitle,
        kind: "text",
        value,
        filename,
        createdAt: new Date(now).toISOString(),
        expiresAt: expiresAt.toISOString(),
      };
    }
    await put(
      `shares/${shareId}.json`,
      JSON.stringify(payload),
      {
        access: "private",
        contentType: "application/json",
      }
    );
    const origin = new URL(request.url).origin;
    const shareUrl = `${origin}/share/${shareId}`;
    return Response.json({
      shareId,
      shareUrl,
      expiresAt: payload.expiresAt,
    });
  } catch (error) {
    console.error("Share creation error:", error);
    return Response.json(
      { error: "Failed to create share link." },
      { status: 500 }
    );
  }
}
export async function GET(request: Request) {
  try {
    const shareId = new URL(request.url).searchParams.get("id");
    if (!shareId || !/^[a-f0-9]{32}$/.test(shareId)) {
      return Response.json(
        { error: "Invalid share link." },
        { status: 400 }
      );
    }
    const blob = await get(`shares/${shareId}.json`, {
      access: "private",
      useCache: false,
    });
    if (!blob) {
      return Response.json(
        { error: "Share link not found." },
        { status: 404 }
      );
    }
    if (!("stream" in blob)) {
      return Response.json(
        { error: "Unable to read share data." },
        { status: 500 }
      );
    }
    const response = new Response(blob.stream);
    const text = await response.text();
    const payload = JSON.parse(text) as SharePayload;
    if (Date.now() >= new Date(payload.expiresAt).getTime()) {
      return Response.json(
        { error: "This share link has expired." },
        { status: 410 }
      );
    }
    return Response.json(payload);
  } catch (error) {
    console.error("Share retrieval error:", error);
    return Response.json(
      { error: "Share link not found or expired." },
      { status: 404 }
    );
  }
}
