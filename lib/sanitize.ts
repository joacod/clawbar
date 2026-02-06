/**
 * Sanitize user-supplied strings to prevent XSS and injection attacks.
 * Strips HTML tags and limits string length.
 */
export function sanitizeString(input: string, maxLength = 100): string {
  return input
    .replace(/[<>]/g, "") // strip angle brackets
    .replace(/[&"']/g, (c) => {
      const map: Record<string, string> = {
        "&": "&amp;",
        '"': "&quot;",
        "'": "&#x27;",
      };
      return map[c] ?? c;
    })
    .trim()
    .slice(0, maxLength);
}

/**
 * Validate and parse a JSON request body with a size limit.
 * Returns null if body exceeds limit or is invalid JSON.
 */
const MAX_BODY_SIZE = 1024; // 1KB

export async function parseBody<T = Record<string, unknown>>(
  request: Request,
): Promise<T | null> {
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_SIZE) return null;
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}
