import { Metadata } from "next";
import DonasiClient from "./DonasiClient";

export const metadata: Metadata = {
  title: "Dukung & Berdayakan Siswa | SLB Tunas Harapan Samarinda",
  description:
    "Mari menjadi Mitra Kebaikan dalam mendukung sarana belajar, alat terapi sensori, dan pelatihan vokasional kemandirian anak berkebutuhan khusus di SLB Tunas Harapan Samarinda.",
  openGraph: {
    title: "Dukung & Berdayakan Siswa | SLB Tunas Harapan Samarinda",
    description:
      "Investasi kemandirian bagi anak berkebutuhan khusus di Samarinda. Dukung sarana terapi, alat peraga edukatif, dan beasiswa siswa istimewa.",
    url: "https://slbtunasharapan.sch.id/donasi",
    siteName: "SLB Tunas Harapan Samarinda",
    locale: "id_ID",
    type: "website",
  },
};

export default function DonasiPage() {
  return <DonasiClient />;
}
