import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://slbtunasharapan-smr.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SLB Tunas Harapan Samarinda - Sekolah Luar Biasa",
    template: "%s | SLB Tunas Harapan",
  },
  description:
    "Website resmi SLB Tunas Harapan, Palaran, Samarinda. Sekolah Luar Biasa (Tunanetra, Tunarungu, Tunagrahita, Tunadaksa, Autis) berdedikasi memberikan pendidikan inklusif berkualitas di Samarinda.",
  keywords: [
    "SLB Tunas Harapan",
    "SLB Tunas Harapan Samarinda",
    "SLB Tunas Harapan Palaran",
    "Sekolah Luar Biasa Tunas Harapan",
    "SLB Samarinda",
    "Sekolah Luar Biasa Samarinda",
    "SLB Palaran",
    "SDLB Samarinda",
    "SMPLB Samarinda",
    "SMALB Samarinda",
    "Pendidikan Inklusif Samarinda",
  ],
  authors: [{ name: "SLB Tunas Harapan Samarinda" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "SLB Tunas Harapan Samarinda",
    title: "SLB Tunas Harapan Samarinda - Sekolah Luar Biasa",
    description:
      "Website resmi SLB Tunas Harapan Palaran Samarinda. Melayani pendidikan khusus untuk SDLB, SMPLB, dan SMALB.",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Gedung SLB Tunas Harapan Samarinda",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org JSON-LD Structured Data untuk Google Search
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "School",
    name: "SLB Tunas Harapan Samarinda",
    alternateName: "Sekolah Luar Biasa Tunas Harapan Palaran",
    url: siteUrl,
    logo: `${siteUrl}/icon.jpg`,
    image: `${siteUrl}/images/hero-bg.jpg`,
    description:
      "Sekolah Luar Biasa di Samarinda yang berdedikasi mendidik anak berkebutuhan khusus jenjang SDLB, SMPLB, dan SMALB.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Swadaya - Gg. Soponyono IV RT.16, Handil Bakti",
      addressLocality: "Palaran, Samarinda",
      addressRegion: "Kalimantan Timur",
      postalCode: "75242",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -0.5533427,
      longitude: 117.1552402,
    },
    telephone: "+628125332760",
    priceRange: "Free",
  };

  return (
    <html
      lang="id"
      className={`${poppins.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8F9FA] antialiased">
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
