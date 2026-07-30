"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";

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

  // Shadow saat scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu saat navigasi rute berubah
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Cegah scroll body saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300"
        style={{ boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.10)" : "0 1px 0 #E2E8F0" }}
        role="banner"
      >
        {/* Top bar — info kontak singkat */}
        <div
          className="hidden md:block text-xs py-1.5"
          style={{ background: "var(--color-primary)", color: "white" }}
        >
          <div className="container-custom flex justify-between items-center px-4">
            <a
              href="https://maps.app.goo.gl/DADHJaKVpLwwskSy9"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1"
              aria-label="Buka lokasi SLB Tunas Harapan di Google Maps"
            >
              <span>📍 Jl. Swadaya - Gg. Soponyono IV RT.16, Palaran, Samarinda</span>
            </a>
            <a
              href="https://wa.me/628125332760"
              className="flex items-center gap-1.5 hover:underline transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubungi via WhatsApp"
            >
              <Phone size={12} />
              <span>+62 812-5332-760</span>
            </a>
          </div>
        </div>

        {/* Main navbar */}
        <nav
          className="container-custom flex items-center justify-between py-10 md:py-12"
          aria-label="Navigasi utama"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none ml-2 sm:ml-4 py-2"
            aria-label="SLB Tunas Harapan — Kembali ke Beranda"
            id="navbar-logo"
          >
            <div className="relative w-11 h-11 flex-shrink-0 rounded-full overflow-hidden ring-[1px] ring-gray-200 transition-transform group-hover:scale-105 bg-white">
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
                className="block text-sm sm:text-base font-bold"
                style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}
              >
                SLB Tunas Harapan
              </span>
              <span className="block text-[10px] sm:text-xs text-[var(--color-text-mid)]">
                Palaran, Samarinda
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-3" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 group"
                  style={{
                    color: isActive(link.href)
                      ? "var(--color-primary)"
                      : "var(--color-text-dark)",
                    background: isActive(link.href) ? "var(--color-primary-tint)" : "transparent",
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

          {/* CTA Daftar + Hamburger */}
          <div className="flex items-center gap-4 mr-2 sm:mr-4 py-2">
            <Link
              href="/kontak"
              className="hidden lg:inline-flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-bold py-2.5 px-6 rounded-lg transition-all duration-200 shadow-md shadow-red-900/10 cursor-pointer focus-visible:outline-none"
              style={{ color: "#ffffff" }}
              id="nav-cta-daftar"
            >
              Hubungi Kami
            </Link>

            {/* Hamburger button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors hover:bg-gray-100"
              style={{ color: "var(--color-text-dark)" }}
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
          style={{ background: "rgba(0,0,0,0.4)" }}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className="fixed top-0 right-0 bottom-0 z-50 lg:hidden bg-white w-72 flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <span
            className="font-bold text-base"
            style={{ color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}
          >
            Menu
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Tutup menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-4" aria-label="Navigasi mobile">
          <ul className="flex flex-col gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: isActive(link.href) ? "var(--color-primary-tint)" : "transparent",
                    color: isActive(link.href) ? "var(--color-primary)" : "var(--color-text-dark)",
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
        <div className="p-5 border-t" style={{ borderColor: "var(--color-border)" }}>
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
