// Matches a bare `type/subtype` media type such as `application/pdf` or
// `image/svg+xml`. Used before a content type is stored in share metadata or
// written into a response header.
const CONTENT_TYPE_PATTERN =
  /^[a-zA-Z0-9!#$&^_.+-]+\/[a-zA-Z0-9!#$&^_.*+-]+$/;

const CONTENT_TYPE_MAX_LENGTH = 120;

const SHARE_META_MAX_LENGTH = 200;

/** Upper bound for a shared text result so a share cannot store unbounded data. */
export const MAX_TEXT_SHARE_LENGTH = 5 * 1024 * 1024;

/**
 * Returns the normalized media type (parameters such as `; charset=utf-8`
 * stripped, lower-cased) or `null` when the value is not a safe content type.
 */
export function normalizeContentType(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const bare = value.split(";")[0].trim().toLowerCase();

  if (!bare || bare.length > CONTENT_TYPE_MAX_LENGTH) {
    return null;
  }

  return CONTENT_TYPE_PATTERN.test(bare) ? bare : null;
}

/**
 * Validates short share metadata fields (`tool`, `resultTitle`) that are shown
 * back to viewers on the share page.
 */
export function isSafeShareMeta(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= SHARE_META_MAX_LENGTH
  );
}
