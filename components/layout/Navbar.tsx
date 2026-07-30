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
        style={{ boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none" }}
        role="banner"
      >
        {/* Top bar — info kontak singkat */}
        <div
          className="hidden md:block text-xs py-2 border-b border-white/10"
          style={{ background: "var(--color-primary)", color: "white" }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-10 lg:px-12">
            <a
              href="https://maps.app.goo.gl/DADHJaKVpLwwskSy9"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1.5 font-medium tracking-wide"
              aria-label="Buka lokasi SLB Tunas Harapan di Google Maps"
            >
              <span>📍 Jl. Swadaya - Gg. Soponyono IV RT.16, Palaran, Samarinda</span>
            </a>
            <a
              href="https://wa.me/628125332760"
              className="flex items-center gap-1.5 hover:underline transition-opacity font-medium tracking-wide"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubungi via WhatsApp"
            >
              <Phone size={13} />
              <span>+62 812-5332-760</span>
            </a>
          </div>
        </div>

        {/* Main navbar — Miri UI Style Layout (Airy Whitespace & Wide Spacing) */}
        <nav
          className="max-w-7xl mx-auto flex items-center justify-between py-3.5 sm:py-4 px-6 sm:px-10 lg:px-12"
          aria-label="Navigasi utama"
        >
          {/* Far-Left Logo */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus-visible:outline-none py-1"
            aria-label="SLB Tunas Harapan — Kembali ke Beranda"
            id="navbar-logo"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 rounded-full overflow-hidden ring-1 ring-gray-200 dark:ring-[#222F43] transition-transform group-hover:scale-105 bg-white shadow-sm">
              <Image
                src="/images/logo/logo.jpg"
                alt="Logo SLB Tunas Harapan"
                fill
                className="object-contain rounded-full p-1"
                sizes="44px"
                priority
              />
            </div>
            <div className="leading-tight">
              <span
                className="block text-sm sm:text-base font-bold tracking-tight"
                style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}
              >
                SLB Tunas Harapan
              </span>
              <span className="block text-[10px] sm:text-xs text-[var(--color-text-mid)] font-medium">
                Palaran, Samarinda
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links — Wide Miri-UI Spacing (gap-6 lg:gap-8) */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative py-2 text-sm font-semibold tracking-wide transition-all duration-200 text-[var(--color-text-dark)] hover:text-[var(--color-primary)]"
                  style={{
                    color: isActive(link.href) ? "var(--color-primary)" : undefined,
                    fontFamily: "var(--font-heading)",
                  }}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  id={`nav-${link.href.replace("/", "") || "beranda"}`}
                >
                  {link.label}
                  {/* Underline aksen aktif */}
                  {isActive(link.href) && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: "var(--color-primary)" }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Far-Right Actions (ThemeToggle + Pill CTA Button) */}
          <div className="flex items-center gap-4 sm:gap-6 py-1">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            <Link
              href="/kontak"
              className="hidden lg:inline-flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-bold py-2.5 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer focus-visible:outline-none"
              style={{ color: "#ffffff" }}
              id="nav-cta-daftar"
            >
              Hubungi Kami
            </Link>

            {/* Hamburger button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-[#161F2E] text-[var(--color-text-dark)]"
              aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              id="hamburger-btn"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          style={{ background: "rgba(0,0,0,0.6)" }}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className="fixed top-0 right-0 bottom-0 z-50 lg:hidden bg-white dark:bg-[#0B0F17] w-72 flex flex-col transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-[#222F43]"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.25)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-[#222F43]"
        >
          <span
            className="font-bold text-base"
            style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}
          >
            Menu Navigasi
          </span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#161F2E] text-[var(--color-text-dark)] transition-colors"
              aria-label="Tutup menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Drawer nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-4" aria-label="Navigasi mobile">
          <ul className="flex flex-col gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-[var(--color-text-dark)] hover:bg-gray-100 dark:hover:bg-[#161F2E]"
                  style={{
                    background: isActive(link.href) ? "var(--color-primary-tint)" : undefined,
                    color: isActive(link.href) ? "var(--color-primary)" : undefined,
                    fontFamily: "var(--font-heading)",
                  }}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {isActive(link.href) && (
                    <span
                      className="w-1 h-5 rounded-full flex-shrink-0"
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
        <div className="p-5 border-t border-gray-200 dark:border-[#222F43]">
          <Link
            href="/kontak"
            className="btn btn-primary w-full justify-center"
            style={{ color: "#ffffff" }}
            id="mobile-nav-cta"
          >
            Hubungi Kami
          </Link>
          <a
            href="https://wa.me/628125332760"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-3 text-sm font-medium"
            style={{ color: "var(--color-secondary)" }}
          >
            <Phone size={14} />
            <span>0812-5332-760 / 0852-5040-2074</span>
          </a>
        </div>
      </div>
    </>
  );
}
