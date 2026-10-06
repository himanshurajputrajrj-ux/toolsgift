import { handleUpload } from "@vercel/blob/client";

const videoUploadRateLimit = new Map<string, { count: number; resetAt: number }>();
const VIDEO_UPLOAD_WINDOW_MS = 60 * 60 * 1000;
const VIDEO_UPLOAD_MAX = 5;

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

function isRateLimited(
  ip: string,
  limitMap: Map<string, { count: number; resetAt: number }>,
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

const VIDEO_UPLOAD_PREFIX = "video-uploads/";

// Rejected before a token is issued, so an invalid path never reaches Blob.
function isAllowedUploadPath(pathname: string): boolean {
  if (!pathname.startsWith(VIDEO_UPLOAD_PREFIX)) {
    return false;
  }

  const name = pathname.slice(VIDEO_UPLOAD_PREFIX.length);

  if (!name || name.length > 250 || name !== name.trim()) {
    return false;
  }

  // No control characters and no parent-directory traversal.
  if (/[\u0000-\u001f]/.test(name)) {
    return false;
  }

  return !name.split("/").some((segment) => segment === ".." || segment === ".");
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = isRateLimited(
      ip,
      videoUploadRateLimit,
      VIDEO_UPLOAD_WINDOW_MS,
      VIDEO_UPLOAD_MAX
    );
    if (limit.limited) {
      return Response.json(
        { error: "Too many video upload requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(limit.retryAfterMs / 1000).toString(),
          },
        }
      );
    }

    const body = await request.json();
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!isAllowedUploadPath(pathname)) {
          throw new Error("Invalid upload path.");
        }
        return {
          allowedContentTypes: ["video/*"],
          maximumSizeInBytes: 500 * 1024 * 1024,
          addRandomSuffix: false,
          tokenPayload: JSON.stringify({
            type: "video-to-link",
          }),
        };
      },
      onUploadCompleted: async () => {},
    });
    return Response.json(response);
  } catch (error) {
    console.error("Video upload error:", error);
    return Response.json(
      { error: "Failed to initialize video upload." },
      { status: 500 }
    );
  }
}
