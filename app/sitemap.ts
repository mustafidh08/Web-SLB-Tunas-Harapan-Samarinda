import { MetadataRoute } from "next";
import { getAllKegiatanMeta } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://slbtunasharapan-smr.vercel.app";

  // Halaman-halaman statis utama
  const staticPages = [
    "",
    "/profil",
    "/profil/staff",
    "/galeri",
    "/kegiatan",
    "/kontak",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/profil") ? 0.9 : 0.8,
  }));

  // Halaman dinamis (detail berita kegiatan)
  const posts = getAllKegiatanMeta();
  const dynamicPages = posts.map((post) => ({
    url: `${baseUrl}/kegiatan/${post.slug}`,
    lastModified: new Date(post.tanggal),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...dynamicPages];
}
