"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import { dataGaleri, labelKategori, KategoriGaleri } from "@/content/data/galeri";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import KineticText from "@/components/ui/KineticText";
import TiltCard from "@/components/ui/TiltCard";
import ParallaxImage from "@/components/ui/ParallaxImage";
import MagneticButton from "@/components/ui/MagneticButton";
import { motion, AnimatePresence } from "framer-motion";

export default function GaleriClient() {
  const [kategoriAktif, setKategoriAktif] = useState<KategoriGaleri>("semua");
  const [indexLightbox, setIndexLightbox] = useState<number | null>(null);
  const [limitTampil, setLimitTampil] = useState<number>(12);

  // Filter foto berdasarkan kategori aktif
  const fotoTerfilter = dataGaleri.filter(
    (foto) => kategoriAktif === "semua" || foto.kategori === kategoriAktif
  );

  // Reset limit tampil setiap kategori berubah
  const [prevKategori, setPrevKategori] = useState(kategoriAktif);
  if (prevKategori !== kategoriAktif) {
    setPrevKategori(kategoriAktif);
    setLimitTampil(12);
  }

  // Foto yang dirender di layar
  const fotoTerrender = fotoTerfilter.slice(0, limitTampil);

  // Navigasi lightbox
  const handleTutupLightbox = () => setIndexLightbox(null);

  const totalFoto = fotoTerfilter.length;

  const handlePrev = useCallback(() => {
    setIndexLightbox((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex === 0 ? totalFoto - 1 : prevIndex - 1;
    });
  }, [totalFoto]);

  const handleNext = useCallback(() => {
    setIndexLightbox((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex === totalFoto - 1 ? 0 : prevIndex + 1;
    });
  }, [totalFoto]);

  // Keyboard navigation untuk Lightbox (aksesibilitas)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (indexLightbox === null) return;
      if (e.key === "Escape") handleTutupLightbox();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [indexLightbox, handlePrev, handleNext]);

  // Kunci scroll body saat lightbox terbuka
  useEffect(() => {
    document.body.style.overflow = indexLightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [indexLightbox]);

  return (
    <>
      {/* HEADER SECTION */}
      <section className="bg-gradient-to-b from-gray-100 to-white dark:from-[#161F2E] dark:to-[#0B0F17] pt-44 md:pt-48 pb-12 border-b border-gray-200 dark:border-[#222F43] overflow-hidden transition-colors duration-300">
        <div className="container-custom">
          <KineticText
            text="Galeri Foto Sekolah"
            as="h1"
            className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-dark)]"
            highlightWords={["Galeri", "Foto"]}
            highlightClass="text-[var(--color-primary)]"
          />
          <p className="text-sm sm:text-base text-[var(--color-text-mid)] mt-2">
            Melihat kondisi fisik, fasilitas belajar, ruang terapi, toilet disabilitas, serta dokumentasi kegiatan siswa-siswi SLB Tunas Harapan secara riil.
          </p>
        </div>
      </section>

      {/* FILTER & GRID GALERI */}
      <section className="section-py bg-white dark:bg-[#0B0F17] overflow-hidden transition-colors duration-300">
        <div className="container-custom">
          <SectionTitle 
            label="Visual Fasilitas" 
            title="Fasilitas & Kondisi Fisik Sekolah"
            subtitle="Kami menampilkan seluruh kondisi fisik sekolah secara jujur dan transparan untuk membantu calon orang tua murid mengenali fasilitas belajar kami."
          />

          {/* Buttons Filter Kategori */}
          <div 
            className="flex flex-wrap justify-center gap-2 mb-10 pb-2 overflow-x-auto"
            role="tablist"
            aria-label="Filter kategori foto galeri"
          >
            {(Object.keys(labelKategori) as KategoriGaleri[]).map((key) => {
              const aktif = kategoriAktif === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setKategoriAktif(key);
                    setIndexLightbox(null);
                  }}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-300 cursor-pointer whitespace-nowrap focus-visible:outline-none transform active:scale-95`}
                  style={{
                    background: aktif ? "var(--color-secondary)" : "transparent",
                    color: aktif ? "#ffffff" : "var(--color-text-mid)",
                    borderColor: aktif ? "var(--color-secondary)" : "var(--color-border)",
                    fontFamily: "var(--font-heading)"
                  }}
                  role="tab"
                  aria-selected={aktif}
                  aria-controls="gallery-grid"
                  id={`tab-${key}`}
                >
                  {labelKategori[key]}
                </button>
              );
            })}
          </div>

          {/* Grid Foto with TiltCard & Motion Stagger */}
          <div 
            id="gallery-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            role="tabpanel"
            aria-labelledby={`tab-${kategoriAktif}`}
          >
            <AnimatePresence mode="popLayout">
              {fotoTerrender.map((foto, index) => (
                <motion.div
                  key={foto.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <TiltCard glowColor="rgba(45, 122, 45, 0.2)" className="rounded-2xl overflow-hidden aspect-[4/3] h-full">
                    <div 
                      className="card group cursor-pointer relative overflow-hidden aspect-[4/3] h-full"
                      onClick={() => setIndexLightbox(index)}
                    >
                      <ParallaxImage
                        src={foto.src}
                        alt={foto.alt}
                        containerClassName="relative w-full h-full"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      
                      {/* Overlay Hover Effect */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 z-10 backdrop-blur-xs">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <ZoomIn size={20} />
                        </div>
                        <span className="font-bold text-sm text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300" style={{ fontFamily: "var(--font-heading)" }}>
                          {foto.judul}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-white/80 mt-1">
                          {labelKategori[foto.kategori]}
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Tombol Muat Lebih Banyak */}
          {fotoTerfilter.length > limitTampil && (
            <div className="flex justify-center mt-12">
              <MagneticButton>
                <button
                  onClick={() => setLimitTampil((prev) => prev + 12)}
                  className="px-6 py-3 text-sm font-semibold rounded-full border border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md focus-visible:outline-none"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Muat Lebih Banyak ({fotoTerfilter.length - limitTampil} Foto Tersisa)
                </button>
              </MagneticButton>
            </div>
          )}

          {/* Alert jika kategori kosong */}
          {fotoTerfilter.length === 0 && (
            <div className="text-center py-16 text-[var(--color-text-light)]">
              Tidak ada foto untuk kategori ini.
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX OVERLAY WITH MOTION ANIMATION */}
      <AnimatePresence>
        {indexLightbox !== null && fotoTerfilter[indexLightbox] && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay backdrop-blur-md bg-black/90 fixed inset-0 z-[9999] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Detail Tampilan Gambar"
          >
            {/* Tombol Tutup */}
            <button
              onClick={handleTutupLightbox}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
              aria-label="Tutup popup gambar"
            >
              <X size={24} />
            </button>

            {/* Tombol Kiri */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
              aria-label="Gambar sebelumnya"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Kontainer Gambar Utama */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl max-h-[80vh] px-4 flex flex-col items-center justify-center"
            >
              <div className="relative w-full aspect-[4/3] max-h-[70vh] rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={fotoTerfilter[indexLightbox].src}
                  alt={fotoTerfilter[indexLightbox].alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1024px"
                  priority
                />
              </div>
              
              {/* Keterangan Teks */}
              <div className="text-center text-white mt-4 max-w-2xl space-y-1">
                <h4 className="font-bold text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                  {fotoTerfilter[indexLightbox].judul}
                </h4>
                <p className="text-xs text-white/60">
                  Kategori: {labelKategori[fotoTerfilter[indexLightbox].kategori]}
                </p>
                <p className="text-sm text-white/80 italic pt-1">
                  {fotoTerfilter[indexLightbox].alt}
                </p>
              </div>
            </motion.div>

            {/* Tombol Kanan */}
            <button
              onClick={handleNext}
              className="absolute right-4 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
              aria-label="Gambar berikutnya"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
