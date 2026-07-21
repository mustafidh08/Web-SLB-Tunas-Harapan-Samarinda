import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://slbtunasharapan-smr.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/admin", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
