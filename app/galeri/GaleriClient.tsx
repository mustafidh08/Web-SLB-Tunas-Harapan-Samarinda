"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import { dataGaleri, labelKategori, KategoriGaleri } from "@/content/data/galeri";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export default function GaleriClient() {
  const [kategoriAktif, setKategoriAktif] = useState<KategoriGaleri>("semua");
  const [indexLightbox, setIndexLightbox] = useState<number | null>(null);
  const [limitTampil, setLimitTampil] = useState<number>(12);

  // Filter foto berdasarkan kategori aktif
  const fotoTerfilter = dataGaleri.filter(
    (foto) => kategoriAktif === "semua" || foto.kategori === kategoriAktif
  );

  // Reset limit tampil setiap kategori berubah
  useEffect(() => {
    setLimitTampil(12);
  }, [kategoriAktif]);

  // Foto yang dirender di layar (membatasi pemuatan awal demi performa optimal)
  const fotoTerrender = fotoTerfilter.slice(0, limitTampil);

  // Navigasi lightbox
  const handleTutupLightbox = () => setIndexLightbox(null);

  const handlePrev = useCallback(() => {
    if (indexLightbox === null) return;
    setIndexLightbox((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex === 0 ? fotoTerfilter.length - 1 : prevIndex - 1;
    });
  }, [indexLightbox, fotoTerfilter.length]);

  const handleNext = useCallback(() => {
    if (indexLightbox === null) return;
    setIndexLightbox((prevIndex) => {
      if (prevIndex === null) return null;
      return prevIndex === fotoTerfilter.length - 1 ? 0 : prevIndex + 1;
    });
  }, [indexLightbox, fotoTerfilter.length]);

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
      <section className="bg-gray-100 pt-40 pb-12 border-b border-gray-200">
        <div className="container-custom">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
            Galeri Foto Sekolah
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-mid)] mt-2">
            Melihat kondisi fisik, fasilitas belajar, ruang terapi, toilet, serta dokumentasi kegiatan siswa-siswi SLB Tunas Harapan secara riil.
          </p>
        </div>
      </section>

      {/* FILTER & GRID GALERI */}
      <section className="section-py bg-white">
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
                    setIndexLightbox(null); // Reset lightbox state
                  }}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none`}
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

          {/* Grid Foto */}
          <div 
            id="gallery-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            role="tabpanel"
            aria-labelledby={`tab-${kategoriAktif}`}
          >
            {fotoTerrender.map((foto, index) => (
              <div 
                key={foto.id} 
                className="card group cursor-pointer relative overflow-hidden aspect-[4/3]"
                onClick={() => setIndexLightbox(index)}
              >
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                
                {/* Overlay Hover Effect */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex flex-col items-center justify-center text-white p-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-350">
                    <ZoomIn size={20} />
                  </div>
                  <span className="font-bold text-sm text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-350" style={{ fontFamily: "var(--font-heading)" }}>
                    {foto.judul}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-white/80 mt-1">
                    {labelKategori[foto.kategori]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Muat Lebih Banyak */}
          {fotoTerfilter.length > limitTampil && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setLimitTampil((prev) => prev + 12)}
                className="px-6 py-3 text-sm font-semibold rounded-full border border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md focus-visible:outline-none"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Muat Lebih Banyak ({fotoTerfilter.length - limitTampil} Foto Tersisa)
              </button>
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

      {/* LIGHTBOX OVERLAY */}
      {indexLightbox !== null && fotoTerfilter[indexLightbox] && (
        <div 
          className="lightbox-overlay"
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
          <div className="relative w-full max-w-4xl max-h-[80vh] px-4 flex flex-col items-center justify-center">
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
            
            {/* Keterangan Teks di Bawah Gambar */}
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
          </div>

          {/* Tombol Kanan */}
          <button
            onClick={handleNext}
            className="absolute right-4 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 cursor-pointer"
            aria-label="Gambar berikutnya"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </>
  );
}
