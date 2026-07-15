// lib/mdx.ts
// Helper untuk membaca dan mem-parsing file MDX konten kegiatan/berita

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content", "kegiatan");

export interface KegiatanMeta {
  slug: string;
  judul: string;
  tanggal: string;
  ringkasan: string;
  foto: string;
  kategori: string;
}

export interface KegiatanPost extends KegiatanMeta {
  konten: string;
}

/**
 * Ambil semua slug dari file MDX di content/kegiatan
 */
export function getAllKegiatanSlugs(): string[] {
  const fileNames = fs.readdirSync(contentDirectory);
  return fileNames
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Ambil metadata semua kegiatan, diurutkan terbaru dulu
 */
export function getAllKegiatanMeta(): KegiatanMeta[] {
  const slugs = getAllKegiatanSlugs();
  const posts = slugs.map((slug) => {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return {
      slug,
      judul: data.judul as string,
      tanggal: data.tanggal as string,
      ringkasan: data.ringkasan as string,
      foto: data.foto as string,
      kategori: data.kategori as string,
    };
  });

  // Urutkan dari terbaru
  return posts.sort(
    (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
  );
}

/**
 * Ambil konten lengkap satu kegiatan berdasarkan slug
 */
export function getKegiatanBySlug(slug: string): KegiatanPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      judul: data.judul as string,
      tanggal: data.tanggal as string,
      ringkasan: data.ringkasan as string,
      foto: data.foto as string,
      kategori: data.kategori as string,
      konten: content,
    };
  } catch {
    return null;
  }
}

/**
 * Format tanggal ke bahasa Indonesia
 * Contoh: "2025-07-15" → "15 Juli 2025"
 */
export function formatTanggalID(tanggal: string): string {
  const date = new Date(tanggal + "T00:00:00");
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
