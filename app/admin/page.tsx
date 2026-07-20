import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Admin Panel Pengelola | SLB Tunas Harapan",
  description: "Dasbor admin pengelola publikasi berita dan foto galeri sekolah SLB Tunas Harapan Samarinda.",
  robots: "noindex, nofollow", // Keamanan admin panel agar tidak di-index oleh mesin pencari publik
};

export default function AdminPage() {
  return <AdminDashboard />;
}
