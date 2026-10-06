import { get, put } from "@vercel/blob";
import { createHash, randomBytes, timingSafeEqual } from "crypto";
import JSZip from "jszip";
import { after } from "next/server";
import {
  cleanupUnsavedShareAsset,
  eraseShare,
  maybeRunShareCleanup,
} from "@/app/lib/shareCleanup";
import { sanitizeFilename } from "@/app/lib/sanitizeFilename";
import {
  isSafeShareMeta,
  MAX_TEXT_SHARE_LENGTH,
  normalizeContentType,
} from "@/app/lib/shareValidation";

const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const MAX_VIDEO_SIZE = 500 * 1024 * 1024;
const MAX_FILE_SIZE = 50 * 1024 * 1024;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) {
    return cfIp.trim();
  }
  return "unknown";
}

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const shareRateLimit = new Map<string, RateLimitEntry>();
const SHARE_RATE_WINDOW_MS = 60 * 60 * 1000;
const SHARE_RATE_MAX = 10;

const shareDeleteRateLimit = new Map<string, RateLimitEntry>();
const SHARE_DELETE_RATE_WINDOW_MS = 60 * 60 * 1000;
const SHARE_DELETE_RATE_MAX = 30;

// 32 random bytes rendered base64url, i.e. 43 characters.
const DELETE_CAPABILITY_PATTERN = /^[A-Za-z0-9_-]{43}$/;
const DELETE_CAPABILITY_HASH_PATTERN = /^[a-f0-9]{64}$/;

function isRateLimited(
  ip: string,
  limitMap: Map<string, RateLimitEntry>,
  windowMs: number,
  max: number
): { limited: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = limitMap.get(ip);

  if (!entry || now >= entry.resetAt) {
    limitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { limited: false, retryAfterMs: 0 };
  }

  if (entry.count >= max) {
    const retryAfterMs = Math.max(0, entry.resetAt - now);
    return { limited: true, retryAfterMs };
  }

  entry.count += 1;
  limitMap.set(ip, entry);
  return { limited: false, retryAfterMs: 0 };
}

type VideoExpiry = "1h" | "6h" | "24h" | "3d" | "7d";

type SharePayload = {
  tool: string;
  resultTitle: string;
  filename: string;
  createdAt: string;
  expiresAt: string;
  /**
   * SHA-256 of the creator delete capability. Only the hash is stored; the
   * plaintext capability is returned once in the creation response.
   */
  deleteCapabilityHash?: string;
} & (
  | {
      kind: "text";
      value: string;
    }
  | {
      kind: "image" | "batch" | "video" | "file";
      value: string;
      contentType: string;
    }
);

function getVideoExpiryMs(expiry: VideoExpiry): number {
  switch (expiry) {
    case "1h":
      return 1 * 60 * 60 * 1000;
    case "6h":
      return 6 * 60 * 60 * 1000;
    case "24h":
      return 24 * 60 * 60 * 1000;
    case "3d":
      return 3 * 24 * 60 * 60 * 1000;
    case "7d":
      return 7 * 24 * 60 * 60 * 1000;
    default:
      return 7 * 24 * 60 * 60 * 1000;
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const shareLimit = isRateLimited(ip, shareRateLimit, SHARE_RATE_WINDOW_MS, SHARE_RATE_MAX);
    if (shareLimit.limited) {
      return Response.json(
        { error: "Too many share requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(shareLimit.retryAfterMs / 1000).toString(),
          },
        }
      );
    }

    const shareId = randomBytes(16).toString("hex");
    // Creator delete capability: 32 random bytes, returned exactly once in
    // this response. Only its SHA-256 hash is persisted with the share.
    const deleteCapability = randomBytes(32).toString("base64url");
    const deleteCapabilityHash = createHash("sha256")
      .update(deleteCapability)
      .digest("hex");
    const now = Date.now();
    const requestContentType =
      request.headers.get("content-type") || "";

    let payload: SharePayload;

    if (requestContentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      const tool = formData.get("tool");
      const resultTitle = formData.get("resultTitle");
      const filename = formData.get("filename");
      const video = formData.get("video");
      const file = formData.get("file");
      const expiry = formData.get("expiry");

      if (
        typeof tool !== "string" ||
        typeof resultTitle !== "string" ||
        typeof filename !== "string" ||
        !isSafeShareMeta(tool) ||
        !isSafeShareMeta(resultTitle)
      ) {
        return Response.json(
          { error: "Invalid share metadata." },
          { status: 400 }
        );
      }

      if (file instanceof File) {
        if (file.size === 0) {
          return Response.json(
            { error: "Cannot share an empty file." },
            { status: 400 }
          );
        }
        if (file.size > MAX_FILE_SIZE) {
          return Response.json(
            {
              error:
                "File is too large. Maximum share file size is 50 MB.",
            },
            { status: 413 }
          );
        }
        const fileContentType =
          normalizeContentType(file.type) || "application/octet-stream";
        const safeFilename = sanitizeFilename(
          filename || file.name || "shared-file",
          "shared-file"
        );
        const assetKey = `share-assets/${shareId}-${safeFilename}`;
        await put(assetKey, file, {
          access: "private",
          contentType: fileContentType,
        });
        const expiresAt = new Date(now + ONE_MONTH_MS);
        payload = {
          tool,
          resultTitle,
          kind: "file",
          value: assetKey,
          filename: safeFilename,
          contentType: fileContentType,
          createdAt: new Date(now).toISOString(),
          expiresAt: expiresAt.toISOString(),
        };
      } else if (tool === "video-to-link") {
        if (!(video instanceof File)) {
          return Response.json(
            { error: "Invalid video share data." },
            { status: 400 }
          );
        }

        const videoContentType = normalizeContentType(video.type);

        if (!videoContentType || !videoContentType.startsWith("video/")) {
          return Response.json(
            { error: "Only video files can be shared." },
            { status: 400 }
          );
        }

        if (video.size === 0) {
          return Response.json(
            { error: "Cannot share an empty video." },
            { status: 400 }
          );
        }

        if (video.size > MAX_VIDEO_SIZE) {
          return Response.json(
            {
              error:
                "Video is too large. Maximum video size is 500 MB.",
            },
            { status: 413 }
          );
        }

        const validExpiries: VideoExpiry[] = [
          "1h",
          "6h",
          "24h",
          "3d",
          "7d",
        ];

        const selectedExpiry: VideoExpiry = validExpiries.includes(
          expiry as VideoExpiry
        )
          ? (expiry as VideoExpiry)
          : "7d";

        const expiresAt = new Date(
          now + getVideoExpiryMs(selectedExpiry)
        );

        const extension =
          videoContentType === "video/mp4"
            ? "mp4"
            : videoContentType === "video/webm"
              ? "webm"
              : videoContentType === "video/quicktime"
                ? "mov"
                : "video";

        const assetKey = `share-assets/${shareId}.${extension}`;

        await put(assetKey, video, {
          access: "private",
          contentType: videoContentType,
        });

        payload = {
          tool,
          resultTitle,
          kind: "video",
          value: assetKey,
          filename: sanitizeFilename(filename, "shared-video"),
          contentType: videoContentType,
          createdAt: new Date(now).toISOString(),
          expiresAt: expiresAt.toISOString(),
        };
      } else {
        const image = formData.get("image");
        const images = formData.getAll("images");
        const isBatch = images.length > 0;
        const expiresAt = new Date(now + ONE_MONTH_MS);

        if (
          (!isBatch && !(image instanceof File)) ||
          (isBatch &&
            !images.every((item) => item instanceof File))
        ) {
          return Response.json(
            { error: "Invalid image share data." },
            { status: 400 }
          );
        }

        if (
          !isBatch &&
          image instanceof File &&
          !normalizeContentType(image.type)?.startsWith("image/")
        ) {
          return Response.json(
            { error: "Only image files can be shared." },
            { status: 400 }
          );
        }

        if (!isBatch && image instanceof File && image.size === 0) {
          return Response.json(
            { error: "Cannot share an empty image." },
            { status: 400 }
          );
        }

        if (
          !isBatch &&
          image instanceof File &&
          image.size > MAX_IMAGE_SIZE
        ) {
          return Response.json(
            {
              error:
                "Image is too large. Maximum share image size is 4 MB.",
            },
            { status: 413 }
          );
        }

        if (isBatch && images.length > 50) {
          return Response.json(
            { error: "Too many images. Maximum is 50 per batch." },
            { status: 400 }
          );
        }

        if (isBatch) {
          const totalBatchSize = images.reduce(
            (total, item) => total + (item as File).size,
            0
          );

          if (totalBatchSize > 20 * 1024 * 1024) {
            return Response.json(
              {
                error:
                  "Batch is too large. Maximum total share size is 20 MB.",
              },
              { status: 413 }
            );
          }

          const zip = new JSZip();

          for (const item of images) {
            const batchFile = item as File;

            if (!normalizeContentType(batchFile.type)?.startsWith("image/")) {
              return Response.json(
                { error: "Only image files can be shared." },
                { status: 400 }
              );
            }

            if (batchFile.size === 0) {
              return Response.json(
                { error: "Cannot share empty image files." },
                { status: 400 }
              );
            }

            if (batchFile.size > MAX_IMAGE_SIZE) {
              return Response.json(
                {
                  error: `${batchFile.name} is too large. Maximum share image size is 4 MB per image.`,
                },
                { status: 413 }
              );
            }

            const arrayBuffer = await batchFile.arrayBuffer();

            zip.file(
              batchFile.name || "converted-image",
              arrayBuffer
            );
          }

          const zipBuffer = await zip.generateAsync({
            type: "nodebuffer",
          });

          const assetKey = `share-assets/${shareId}.zip`;

          await put(assetKey, zipBuffer, {
            access: "private",
            contentType: "application/zip",
          });

          payload = {
            tool,
            resultTitle,
            kind: "batch",
            value: assetKey,
            filename: "toolsgift-batch-converted-images.zip",
            contentType: "application/zip",
            createdAt: new Date(now).toISOString(),
            expiresAt: expiresAt.toISOString(),
          };
        } else {
          if (!(image instanceof File)) {
            return Response.json(
              { error: "Invalid image file." },
              { status: 400 }
            );
          }

          const imageContentType = normalizeContentType(image.type);

          if (!imageContentType || !imageContentType.startsWith("image/")) {
            return Response.json(
              { error: "Only image files can be shared." },
              { status: 400 }
            );
          }

          const extension =
            imageContentType === "image/jpeg"
              ? "jpg"
              : imageContentType === "image/png"
                ? "png"
                : imageContentType === "image/webp"
                  ? "webp"
                  : "img";

          const assetKey = `share-assets/${shareId}.${extension}`;

          await put(assetKey, image, {
            access: "private",
            contentType: imageContentType,
          });

          payload = {
            tool,
            resultTitle,
            kind: "image",
            value: assetKey,
            filename: sanitizeFilename(filename, "shared-image"),
            contentType: imageContentType,
            createdAt: new Date(now).toISOString(),
            expiresAt: expiresAt.toISOString(),
          };
        }
      }
    } else {
      const body = await request.json();

      if (body.tool === "video-to-link") {
        const {
          resultTitle,
          filename,
          assetKey,
          contentType,
          expiry,
        } = body;

        if (
          !isSafeShareMeta(resultTitle) ||
          typeof filename !== "string" ||
          typeof assetKey !== "string" ||
          typeof expiry !== "string"
        ) {
          return Response.json(
            { error: "Invalid video share data." },
            { status: 400 }
          );
        }

        const videoContentType = normalizeContentType(contentType);

        if (!videoContentType || !videoContentType.startsWith("video/")) {
          return Response.json(
            { error: "Invalid video content type." },
            { status: 400 }
          );
        }

        if (!assetKey.startsWith("video-uploads/")) {
          return Response.json(
            { error: "Invalid video asset." },
            { status: 400 }
          );
        }

        const validExpiries: VideoExpiry[] = [
          "1h",
          "6h",
          "24h",
          "3d",
          "7d",
        ];

        if (!validExpiries.includes(expiry as VideoExpiry)) {
          return Response.json(
            { error: "Invalid expiry option." },
            { status: 400 }
          );
        }

        const expiresAt = new Date(
          now + getVideoExpiryMs(expiry as VideoExpiry)
        );

        payload = {
          tool: "video-to-link",
          resultTitle,
          kind: "video",
          value: assetKey,
          filename: sanitizeFilename(filename, "shared-video"),
          contentType: videoContentType,
          createdAt: new Date(now).toISOString(),
          expiresAt: expiresAt.toISOString(),
        };
      } else {
        const { tool, resultTitle, value, filename } = body;

        if (
          !isSafeShareMeta(tool) ||
          !isSafeShareMeta(resultTitle) ||
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

        if (value.length > MAX_TEXT_SHARE_LENGTH) {
          return Response.json(
            { error: "Shared result is too large." },
            { status: 413 }
          );
        }

        const expiresAt = new Date(now + ONE_MONTH_MS);

        payload = {
          tool,
          resultTitle,
          kind: "text",
          value,
          filename: sanitizeFilename(filename, "shared-result"),
          createdAt: new Date(now).toISOString(),
          expiresAt: expiresAt.toISOString(),
        };
      }
    }

    // Persist only the hash; the plaintext capability leaves the server once.
    payload = { ...payload, deleteCapabilityHash };

    // Save the share metadata so the generated share URL can be opened later.
    try {
      await put(
        `shares/${shareId}.json`,
        JSON.stringify(payload),
        {
          access: "private",
          contentType: "application/json",
        }
      );
    } catch (error) {
      // The asset was already uploaded; remove it so a failed share does not
      // leave a blob that no metadata can ever find again.
      await cleanupUnsavedShareAsset(payload);
      throw error;
    }

    after(() => maybeRunShareCleanup());

    const origin = new URL(request.url).origin;
    const shareUrl = `${origin}/share/${shareId}`;

    return Response.json({
      shareId,
      shareUrl,
      expiresAt: payload.expiresAt,
      // Returned exactly once, to the creator, in the creation response.
      deleteCapability,
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
      // Erasure path: drop the expired share and its asset after responding.
      after(() => eraseShare(shareId, payload));

      return Response.json(
        { error: "This share link has expired." },
        { status: 410 }
      );
    }

    after(() => maybeRunShareCleanup());

    // Never expose the stored capability hash through the public API.
    const publicPayload: Record<string, unknown> = { ...payload };
    delete publicPayload.deleteCapabilityHash;

    return Response.json(publicPayload);
  } catch (error) {
    console.error("Share retrieval error:", error);

    return Response.json(
      { error: "Share link not found or expired." },
      { status: 404 }
    );
  }
}

/**
 * Creator-side deletion. Requires the plaintext capability that was returned
 * once in the creation response; only its SHA-256 hash is stored, and the
 * capability is never logged.
 */
export async function DELETE(request: Request) {
  try {
    const shareId = new URL(request.url).searchParams.get("id");

    if (!shareId || !/^[a-f0-9]{32}$/.test(shareId)) {
      return Response.json(
        { error: "Invalid share link." },
        { status: 400 }
      );
    }

    const authorization = request.headers.get("authorization") || "";
    const capability = authorization.startsWith("Bearer ")
      ? authorization.slice("Bearer ".length).trim()
      : "";

    if (!DELETE_CAPABILITY_PATTERN.test(capability)) {
      return Response.json(
        { error: "Invalid delete capability." },
        { status: 401 }
      );
    }

    const ip = getClientIp(request);
    const deleteLimit = isRateLimited(
      ip,
      shareDeleteRateLimit,
      SHARE_DELETE_RATE_WINDOW_MS,
      SHARE_DELETE_RATE_MAX
    );

    if (deleteLimit.limited) {
      return Response.json(
        { error: "Too many delete requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(deleteLimit.retryAfterMs / 1000).toString(),
          },
        }
      );
    }

    let payload: SharePayload;

    try {
      const blob = await get(`shares/${shareId}.json`, {
        access: "private",
        useCache: false,
      });

      if (!blob || !("stream" in blob)) {
        return Response.json(
          { error: "Share link not found." },
          { status: 404 }
        );
      }

      payload = JSON.parse(await new Response(blob.stream).text()) as SharePayload;
    } catch {
      return Response.json(
        { error: "Share link not found." },
        { status: 404 }
      );
    }

    const storedHash =
      typeof payload.deleteCapabilityHash === "string" &&
      DELETE_CAPABILITY_HASH_PATTERN.test(payload.deleteCapabilityHash)
        ? payload.deleteCapabilityHash
        : "";

    if (!storedHash) {
      // Shares created without a stored capability hash cannot be deleted
      // safely, so refuse instead of allowing unauthenticated erasure.
      return Response.json(
        { error: "Share link not found." },
        { status: 404 }
      );
    }

    const providedHash = createHash("sha256").update(capability).digest();
    const expectedHash = Buffer.from(storedHash, "hex");

    if (
      providedHash.length !== expectedHash.length ||
      !timingSafeEqual(providedHash, expectedHash)
    ) {
      return Response.json(
        { error: "Invalid delete capability." },
        { status: 401 }
      );
    }

    await eraseShare(shareId, payload);

    return Response.json({ deleted: true });
  } catch (error) {
    // The capability is deliberately absent from every log statement.
    console.error("Share deletion error:", error);

    return Response.json(
      { error: "Failed to delete share." },
      { status: 500 }
    );
  }
}