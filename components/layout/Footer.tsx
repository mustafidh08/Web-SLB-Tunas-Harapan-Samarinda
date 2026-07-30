// components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, Mail, Heart } from "lucide-react";

const linkSekolah = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil Sekolah" },
  { href: "/profil/staff", label: "Guru & Staff" },
  { href: "/galeri", label: "Galeri Foto" },
];

const linkInfo = [
  { href: "/kegiatan", label: "Kegiatan & Berita" },
  { href: "/kontak", label: "Kontak & Lokasi" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-[#111827] dark:bg-[#070A0F] text-white border-t border-gray-800 dark:border-[#1E293B] transition-colors duration-300"
    >
      {/* Main footer */}
      <div className="container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-y-16 gap-x-8 lg:gap-x-12">

          {/* Kolom 1 — Brand & tagline */}
          <div className="flex flex-col items-start gap-4 pt-10 md:pt-12">
            <Link
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-none"
              aria-label="SLB Tunas Harapan — Ke Beranda"
              id="footer-logo"
            >
              <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden ring-[1px] ring-white/20 transition-transform group-hover:scale-105 bg-white">
                <Image
                  src="/images/logo/logo.jpg"
                  alt="Logo SLB Tunas Harapan"
                  fill
                  className="object-contain rounded-full p-1"
                  sizes="48px"
                />
              </div>
              <div className="leading-tight">
                <span
                  className="block text-base font-bold text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  SLB Tunas Harapan
                </span>
                <span className="block text-xs text-white/60">Palaran, Samarinda</span>
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mt-2">
              Mendidik dengan hati, membimbing dengan kasih. Kami hadir untuk setiap
              anak berkebutuhan khusus agar tumbuh mandiri dan percaya diri.
            </p>

            {/* Aksen garis kuning dengan jarak bawah responsif */}
            <div
              className="w-12 h-1 rounded-full mt-2 mb-6 md:mb-12"
              style={{ background: "var(--color-accent)" }}
            />
          </div>

          {/* Kolom 2 — Link Sekolah */}
          <div className="md:pt-12">
            <h3
              className="text-sm font-bold uppercase tracking-widest mb-6 text-white"
              style={{ color: "#ffffff", fontFamily: "var(--font-heading)" }}
            >
              Sekolah
            </h3>
            <ul className="flex flex-col gap-3.5" role="list">
              {linkSekolah.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-[var(--color-accent)] opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3 — Informasi */}
          <div className="md:pt-12">
            <h3
              className="text-sm font-bold uppercase tracking-widest mb-6 text-white"
              style={{ color: "#ffffff", fontFamily: "var(--font-heading)" }}
            >
              Informasi
            </h3>
            <ul className="flex flex-col gap-3.5" role="list">
              {linkInfo.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-[var(--color-accent)] opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4 — Hubungi Kami */}
          <div className="md:pt-12">
            <h3
              className="text-sm font-bold uppercase tracking-widest mb-6 text-white"
              style={{ color: "#ffffff", fontFamily: "var(--font-heading)" }}
            >
              Hubungi Kami
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-white/70" role="list">
              <li>
                <a
                  href="https://maps.app.goo.gl/DADHJaKVpLwwskSy9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 hover:text-white transition-colors group"
                  aria-label="Buka lokasi di Google Maps"
                >
                  <MapPin
                    size={16}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span>Jl. Swadaya - Gg. Soponyono IV RT.16,<br />Handil Bakti, Kec. Palaran,<br />Samarinda, Kalimantan Timur 75242</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/628125332760"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                  aria-label="Hubungi via WhatsApp"
                >
                  <Phone
                    size={16}
                    className="flex-shrink-0"
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span>0812-5332-760 / 0852-5040-2074</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:slbtunasharapan.smr@gmail.com"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                  aria-label="Kirim email ke sekolah"
                >
                  <Mail
                    size={16}
                    className="flex-shrink-0"
                    style={{ color: "var(--color-accent)" }}
                  />
                  <span>slbtunasharapan.smr@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/slbtunasharapansmd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                  aria-label="Buka Instagram Sekolah"
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: "var(--color-accent)" }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>@slbtunasharapansmd</span>
                </a>
              </li>
              <li className="flex items-start gap-3 pb-6">
                <Clock
                  size={16}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "var(--color-accent)" }}
                />
                <div>
                  <span className="block">Senin – Sabtu</span>
                  <span className="block font-semibold text-white/90">08.00 – 13.00 WITA</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-6"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/50">
          <p className="flex flex-wrap items-center gap-2">
            <span>© {currentYear} SLB Tunas Harapan. Hak cipta dilindungi.</span>
            <span>•</span>
            <Link href="/admin" className="hover:text-white transition-colors underline decoration-dotted text-xs">
              Kelola Website (Admin)
            </Link>
          </p>
          <p className="flex items-center gap-1.5">
            Dibuat dengan{" "}
            <Heart
              size={12}
              fill="currentColor"
              style={{ color: "var(--color-accent)" }}
              aria-label="cinta"
            />{" "}
            untuk anak-anak istimewa Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
