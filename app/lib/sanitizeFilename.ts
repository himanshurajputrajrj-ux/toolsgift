const UNSAFE_FILENAME_CHARS = /[^a-zA-Z0-9._-]/g;

/**
 * Sanitizes a client-supplied filename before it is stored in share metadata
 * or interpolated into a Content-Disposition header. Only safe filename
 * characters are kept; anything else (quotes, CR/LF, semicolons, path
 * separators) is replaced with an underscore.
 */
export function sanitizeFilename(
  filename: string,
  fallback = "shared-file"
): string {
  const name = typeof filename === "string" && filename.trim()
    ? filename
    : fallback;
  const sanitized = name.replace(UNSAFE_FILENAME_CHARS, "_");

  return sanitized.trim() ? sanitized : fallback;
}