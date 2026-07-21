import crypto from "crypto";

/**
 * Membandingkan 2 string secara Timing-Safe untuk mencegah Timing Attack pada verifikasi password admin.
 */
export function timingSafeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Lakukan pembandingan dummy untuk menyamakan durasi waktu
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Sanitasi string input untuk mencegah XSS & Code Injection.
 * Menghilangkan tag script dan karakter bermasalah.
 */
export function sanitizeInputString(str: string): string {
  if (!str) return "";
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/onerror\s*=/gi, "")
    .replace(/onload\s*=/gi, "")
    .trim();
}

/**
 * Sanitasi slug untuk mencegah Path Traversal attack (misal ../../evil.js)
 */
export function sanitizeSlug(slug: string): string {
  if (!slug) return "";
  return slug
    .toLowerCase()
    .replace(/\.\./g, "") // Cegah path traversal ..
    .replace(/[^a-z0-9-]/g, "-") // Hanya izinkan huruf, angka, dan strip
    .replace(/-+/g, "-") // Gabungkan strip ganda
    .replace(/^-|-$/g, ""); // Hilangkan strip awal/akhir
}

/**
 * Validasi header Base64 image untuk memastikan file yang diunggah benar-benar gambar
 */
export function validateImageBase64(base64Str: string): boolean {
  if (!base64Str) return false;
  // Periksa header MIME type
  const allowedMimeTypes = [
    "data:image/jpeg;base64,",
    "data:image/jpg;base64,",
    "data:image/png;base64,",
    "data:image/webp;base64,",
    "data:image/gif;base64,",
    "data:image/avif;base64,",
  ];
  return allowedMimeTypes.some((mime) => base64Str.startsWith(mime));
}

/**
 * Rate Limiting Sederhana berbasis IP (Max 5 percobaan login per 15 menit)
 */
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const loginAttemptsStore = new Map<string, RateLimitRecord>();

export function checkRateLimit(ip: string, maxAttempts = 5, windowMs = 15 * 60 * 1000): { allowed: boolean; remainingMs?: number } {
  const now = Date.now();
  const record = loginAttemptsStore.get(ip);

  if (!record || now > record.resetTime) {
    return { allowed: true };
  }

  if (record.count >= maxAttempts) {
    return { allowed: false, remainingMs: record.resetTime - now };
  }

  return { allowed: true };
}

export function getRateLimitStatus(ip: string, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const record = loginAttemptsStore.get(ip);

  if (!record || now > record.resetTime) {
    return { allowed: true, remainingAttempts: maxAttempts, maxAttempts };
  }

  if (record.count >= maxAttempts) {
    return { allowed: false, remainingAttempts: 0, maxAttempts, remainingMs: record.resetTime - now };
  }

  return {
    allowed: true,
    remainingAttempts: maxAttempts - record.count,
    maxAttempts,
  };
}

export function recordFailedLoginAttempt(ip: string, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const record = loginAttemptsStore.get(ip);

  if (!record || now > record.resetTime) {
    loginAttemptsStore.set(ip, { count: 1, resetTime: now + windowMs });
    return { remainingAttempts: maxAttempts - 1, maxAttempts };
  }

  record.count += 1;
  const remaining = Math.max(0, maxAttempts - record.count);
  return { remainingAttempts: remaining, maxAttempts };
}

export function resetLoginAttempts(ip: string) {
  loginAttemptsStore.delete(ip);
}
