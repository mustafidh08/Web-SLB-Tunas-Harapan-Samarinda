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

export const metadata: Metadata = {
  title: {
    default: "SLB Tunas Harapan Samarinda",
    template: "%s | SLB Tunas Harapan",
  },
  description:
    "Website resmi SLB Tunas Harapan, Palaran, Samarinda — Sekolah Luar Biasa yang berdedikasi memberikan pendidikan berkualitas bagi anak berkebutuhan khusus.",
  keywords: [
    "SLB Samarinda",
    "Sekolah Luar Biasa",
    "Tunas Harapan",
    "Palaran",
    "Anak Berkebutuhan Khusus",
    "SDLB",
    "SMPLB",
    "SMALB",
  ],
  authors: [{ name: "SLB Tunas Harapan" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "SLB Tunas Harapan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} h-full`}
      suppressHydrationWarning
    >
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
