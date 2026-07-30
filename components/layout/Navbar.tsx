"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil Sekolah" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kegiatan", label: "Kegiatan" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Efek bayangan saat di-scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu mobile saat rute berubah
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md transition-all duration-300 border-b border-gray-200/80 dark:border-[#222F43]/80"
        style={{ boxShadow: scrolled ? "0 8px 30px rgba(0,0,0,0.12)" : "none" }}
        role="banner"
      >
        {/* Top bar — info kontak singkat dengan whitespace lebih lega */}
        <div
          className="hidden md:block text-xs sm:text-sm py-2.5 border-b border-white/10"
          style={{ background: "var(--color-primary)", color: "white" }}
        >
          <div className="container-custom flex justify-between items-center px-4 sm:px-8">
            <a
              href="https://maps.app.goo.gl/DADHJaKVpLwwskSy9"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-2 font-medium"
              aria-label="Buka lokasi SLB Tunas Harapan di Google Maps"
            >
              <span>📍 Jl. Swadaya - Gg. Soponyono IV RT.16, Palaran, Samarinda</span>
            </a>
            <a
              href="https://wa.me/628125332760"
              className="flex items-center gap-2 hover:underline transition-opacity font-medium"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubungi via WhatsApp"
            >
              <Phone size={14} />
              <span>+62 812-5332-760</span>
            </a>
          </div>
        </div>

        {/* Main navbar — Diperbesar dengan Whitespace Mewah */}
        <nav
          className="container-custom flex items-center justify-between py-4 sm:py-5 lg:py-6 px-4 sm:px-8 lg:px-10 transition-all duration-300"
          aria-label="Navigasi utama"
        >
          {/* Logo Sekolah — Lebih Besar & Jelas */}
          <Link
            href="/"
            className="flex items-center gap-3.5 sm:gap-4 group focus-visible:outline-none py-1"
            aria-label="SLB Tunas Harapan — Kembali ke Beranda"
            id="navbar-logo"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-[#222F43] transition-transform group-hover:scale-105 bg-white shadow-md">
              <Image
                src="/images/logo/logo.jpg"
                alt="Logo SLB Tunas Harapan"
                fill
                className="object-contain rounded-full p-1"
                sizes="56px"
                priority
              />
            </div>
            <div className="leading-tight">
              <span
                className="block text-base sm:text-lg md:text-xl font-extrabold tracking-tight"
                style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}
              >
                SLB Tunas Harapan
              </span>
              <span className="block text-xs sm:text-sm text-[var(--color-text-mid)] font-medium mt-0.5">
                Palaran, Samarinda
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links — Padding & Whitespace Lebih Lega */}
          <ul className="hidden lg:flex items-center gap-3 xl:gap-5" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative px-4 py-2.5 text-base font-bold rounded-xl transition-all duration-200 group text-[var(--color-text-dark)] hover:bg-gray-100 dark:hover:bg-[#161F2E]"
                  style={{
                    color: isActive(link.href)
                      ? "var(--color-primary)"
                      : undefined,
                    background: isActive(link.href) ? "var(--color-primary-tint)" : undefined,
                    fontFamily: "var(--font-heading)",
                  }}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  id={`nav-${link.href.replace("/", "") || "beranda"}`}
                >
                  {link.label}
                  {/* Underline aksen kuning */}
                  {isActive(link.href) && (
                    <span
                      className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                      style={{ background: "var(--color-accent)" }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + Theme Toggle + Hamburger — Whitespace & Aksesibilitas Tinggi */}
          <div className="flex items-center gap-3 sm:gap-4 py-1">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            <Link
              href="/kontak"
              className="hidden lg:inline-flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-base font-extrabold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none"
              style={{ color: "#ffffff" }}
              id="nav-cta-daftar"
            >
              Hubungi Kami
            </Link>

            {/* Hamburger button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-[#161F2E] text-[var(--color-text-dark)]"
              aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              id="hamburger-btn"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          style={{ background: "rgba(0,0,0,0.6)" }}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className="fixed top-0 right-0 bottom-0 z-50 lg:hidden bg-white dark:bg-[#0B0F17] w-80 flex flex-col transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-[#222F43]"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          boxShadow: "-6px 0 30px rgba(0,0,0,0.3)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-[#222F43]"
        >
          <span
            className="font-extrabold text-lg"
            style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}
          >
            Menu Navigasi
          </span>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#161F2E] text-[var(--color-text-dark)] transition-colors"
              aria-label="Tutup menu"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Drawer nav links */}
        <nav className="flex-1 overflow-y-auto py-6 px-5" aria-label="Navigasi mobile">
          <ul className="flex flex-col gap-2" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-3.5 px-5 py-3.5 rounded-xl text-base font-bold transition-all text-[var(--color-text-dark)] hover:bg-gray-100 dark:hover:bg-[#161F2E]"
                  style={{
                    background: isActive(link.href) ? "var(--color-primary-tint)" : undefined,
                    color: isActive(link.href) ? "var(--color-primary)" : undefined,
                    fontFamily: "var(--font-heading)",
                  }}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {isActive(link.href) && (
                    <span
                      className="w-1.5 h-6 rounded-full flex-shrink-0"
                      style={{ background: "var(--color-accent)" }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer footer CTA */}
        <div className="p-6 border-t border-gray-200 dark:border-[#222F43] space-y-4">
          <Link
            href="/kontak"
            className="btn btn-primary w-full justify-center text-base py-3.5 font-extrabold rounded-xl shadow-md"
            style={{ color: "#ffffff" }}
            id="mobile-nav-cta"
          >
            Hubungi Kami
          </Link>
          <a
            href="https://wa.me/628125332760"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm font-semibold hover:underline"
            style={{ color: "var(--color-secondary)" }}
          >
            <Phone size={16} />
            <span>0812-5332-760 / 0852-5040-2074</span>
          </a>
        </div>
      </div>
    </>
  );
}
