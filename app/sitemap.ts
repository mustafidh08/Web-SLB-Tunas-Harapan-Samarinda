import { MetadataRoute } from "next";
import { getAllKegiatanMeta } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://slbtunasharapan.sch.id";

  // Halaman-halaman statis
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
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/profil") ? 0.8 : 0.6,
  }));

  // Halaman dinamis (detail kegiatan)
  const posts = getAllKegiatanMeta();
  const dynamicPages = posts.map((post) => ({
    url: `${baseUrl}/kegiatan/${post.slug}`,
    lastModified: new Date(post.tanggal),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...dynamicPages];
}
