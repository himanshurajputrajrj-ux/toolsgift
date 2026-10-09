type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

/**
 * Small in-memory sliding-window limiter. It protects the auth endpoints
 * against credential stuffing without adding infrastructure. On serverless
 * each instance keeps its own counter, which still bounds abuse per region.
 */
export function consumeRateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    prune(now);
    return true;
  }

  if (bucket.count >= limit) {
    return false;
  }

  bucket.count += 1;
  prune(now);
  return true;
}

function prune(now: number): void {
  if (buckets.size < 1000) {
    return;
  }

  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function rateLimitKey(
  request: Request,
  action: string,
  scope = ""
): string {
  return `${action}:${clientIp(request)}:${scope}`;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
}
