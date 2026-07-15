// lib/utils.ts
// Utility functions umum

/**
 * Gabungkan class names dengan aman (pengganti clsx/cn sederhana)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Potong teks panjang dengan ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Format tanggal ke bahasa Indonesia
 * Contoh: new Date() → "10 Juli 2026"
 */
export function formatTanggalID(tanggal: string | Date): string {
  const date = typeof tanggal === "string" ? new Date(tanggal + "T00:00:00") : tanggal;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Slugify teks ke URL-friendly string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/--+/g, "-")
    .trim();
}
