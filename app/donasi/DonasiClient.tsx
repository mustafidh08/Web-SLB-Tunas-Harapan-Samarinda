"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { 
  Heart, 
  Copy, 
  Check, 
  QrCode, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Award, 
  MessageSquare,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import KineticText from "@/components/ui/KineticText";
import TiltCard from "@/components/ui/TiltCard";
import MagneticButton from "@/components/ui/MagneticButton";

interface ProgramImpact {
  id: string;
  nominal: number;
  label: string;
  judul: string;
  deskripsi: string;
  icon: typeof Heart;
  populer?: boolean;
}

const PROGRAM_DONASI: ProgramImpact[] = [
  {
    id: "vokasional",
    nominal: 50000,
    label: "Rp 50.000",
    judul: "Bahan Praktik Vokasional Siswa",
    deskripsi: "Menyediakan bahan membuat kriya tangan, cetak sablon, dan tata boga untuk melatih kemandirian wirausaha siswa ABK.",
    icon: Sparkles,
  },
  {
    id: "ape",
    nominal: 100000,
    label: "Rp 100.000",
    judul: "Alat Peraga Edukatif Adaptif (APE)",
    deskripsi: "Mendukung pengadaan mainan sensori motorik, papan latih braille, dan media latih fokus khusus anak autis & tunagrahita.",
    icon: BookOpen,
    populer: true,
  },
  {
    id: "beasiswa",
    nominal: 250000,
    label: "Rp 250.000",
    judul: "Beasiswa & Terapi Siswa Kurang Mampu",
    deskripsi: "Membantu biaya seragam, modul belajar khusus, dan pendampingan terapi bagi siswa istimewa dari keluarga prasejahtera.",
    icon: Award,
  },
];

export default function DonasiClient() {
  const [selectedNominal, setSelectedNominal] = useState<number | "custom">(100000);
  const [customNominal, setCustomNominal] = useState<string>("");
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [showQris, setShowQris] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

  const handleCopy = (text: string, bankId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bankId);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const currentImpact = PROGRAM_DONASI.find((p) => p.nominal === selectedNominal) || {
    judul: "Dukungan Bebas Kebaikan Siswa",
    deskripsi: "Setiap kontribusi keikhlasan Anda akan disalurkan secara transparan untuk pemenuhan sarana belajar & terapi anak-anak istimewa.",
  };

  return (
    <>
      {/* 1. HERO SECTION WITH DIGNITY & EMPOWERMENT FRAMING */}
      <section className="bg-gradient-to-b from-gray-100 via-white to-gray-50 dark:from-[#161F2E] dark:via-[#0B0F17] dark:to-[#0B0F17] pt-44 md:pt-48 pb-16 border-b border-gray-200 dark:border-[#222F43] overflow-hidden">
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-4 shadow-sm border border-emerald-200 dark:border-emerald-800">
            <Heart size={14} className="fill-emerald-600 dark:fill-emerald-400" />
            <span>Mitra Kebaikan & Pemberdayaan ABK</span>
          </div>

          <KineticText
            text="Investasi Kemandirian: Bersama Membuka Pintu Masa Depan Bagi Anak-Anak Spesial"
            as="h1"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text-dark)] leading-tight justify-center"
            highlightWords={["Kemandirian:", "Masa", "Depan"]}
            highlightClass="text-[var(--color-primary)]"
          />

          <p className="text-sm sm:text-base md:text-lg text-[var(--color-text-mid)] mt-4 leading-relaxed max-w-2xl mx-auto">
            Di SLB Tunas Harapan Samarinda, kami percaya keterbatasan bukanlah penghalang. Setiap anak berkebutuhan khusus berhak atas sarana terapi, alat belajar adaptif, dan vokasional yang bermartabat.
          </p>

          {/* Quick Stats Trust Badge */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-xl mx-auto mt-8 pt-6 border-t border-gray-200/80 dark:border-[#222F43]">
            <div className="p-3 bg-white dark:bg-[#161F2E] rounded-xl border border-gray-150 dark:border-[#222F43] shadow-sm">
              <p className="text-xl font-bold text-[var(--color-primary)]">100% Resmi</p>
              <p className="text-xs text-[var(--color-text-mid)]">Lembaga Sekolah Terverifikasi</p>
            </div>
            <div className="p-3 bg-white dark:bg-[#161F2E] rounded-xl border border-gray-150 dark:border-[#222F43] shadow-sm">
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">100+ Siswa</p>
              <p className="text-xs text-[var(--color-text-mid)]">Penerima Manfaat Program</p>
            </div>
            <div className="p-3 bg-white dark:bg-[#161F2E] rounded-xl border border-gray-150 dark:border-[#222F43] shadow-sm col-span-2 md:col-span-1">
              <p className="text-xl font-bold text-amber-500">Transparan</p>
              <p className="text-xs text-[var(--color-text-mid)]">Laporan Akuntabel</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROGRAM ALOKASI & TRANSPARENCY IMPACT CALCULATOR */}
      <section className="section-py bg-white dark:bg-[#0B0F17] transition-colors duration-300">
        <div className="container-custom">
          <SectionTitle
            label="Transparansi Manfaat"
            title="Pilih Program Kebaikan Anda"
            subtitle="Setiap rupiah yang Anda alokasikan memiliki dampak nyata bagi tumbuh kembang dan kemandirian siswa kami."
          />

          {/* Grid Card Nominal Donasi */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {PROGRAM_DONASI.map((program) => {
              const IconComp = program.icon;
              const isSelected = selectedNominal === program.nominal;

              return (
                <TiltCard key={program.id} glowColor="rgba(16, 185, 129, 0.2)" className="h-full">
                  <div
                    onClick={() => setSelectedNominal(program.nominal)}
                    className={`relative cursor-pointer p-6 rounded-2xl border transition-all h-full flex flex-col justify-between ${
                      isSelected
                        ? "bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                        : "bg-white dark:bg-[#161F2E] border-gray-200 dark:border-[#222F43] hover:border-gray-300 dark:hover:border-gray-700"
                    }`}
                  >
                    <div>
                      {program.populer && (
                        <div className="mb-3">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-primary)] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                            🔥 Paling Banyak Dipilih
                          </span>
                        </div>
                      )}

                      <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                        <IconComp size={24} />
                      </div>
                      <p className="text-2xl font-black text-[var(--color-text-dark)]">{program.label}</p>
                      <h3 className="font-bold text-base text-[var(--color-text-dark)] mt-1 mb-2">{program.judul}</h3>
                      <p className="text-xs text-[var(--color-text-mid)] leading-relaxed">{program.deskripsi}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-150 dark:border-[#222F43] flex items-center justify-between">
                      <span className={`text-xs font-bold ${isSelected ? "text-emerald-600 dark:text-emerald-400" : "text-[var(--color-text-mid)]"}`}>
                        {isSelected ? "✓ Program Dipilih" : "Pilih Program Ini"}
                      </span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "bg-emerald-500 border-emerald-500 text-white" : "border-gray-300 dark:border-gray-700"}`}>
                        {isSelected && <Check size={12} />}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>

          {/* Impact Banner Highlight */}
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-200">Dampak Kontribusi Anda</span>
              <h4 className="text-lg font-bold">{currentImpact.judul}</h4>
              <p className="text-xs text-emerald-100 max-w-xl leading-relaxed">{currentImpact.deskripsi}</p>
            </div>
            <a
              href="#metode-pembayaran"
              className="px-5 py-2.5 bg-white font-bold text-xs rounded-xl hover:bg-emerald-50 active:scale-95 transition-all flex-shrink-0 shadow"
              style={{ color: "#064e3b" }}
            >
              <span style={{ color: "#064e3b" }}>Lanjut ke Pembayaran ↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. METODE PEMBAYARAN INTERAKTIF (PROGRESSIVE DISCLOSURE - NO BEGGING) */}
      <section id="metode-pembayaran" className="section-py bg-gray-50 dark:bg-[#0B0F17] border-t border-gray-200 dark:border-[#222F43]">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            label="Saluran Resmi Sekolah"
            title="Pilih Metode Transfer Kebaikan"
            subtitle="Silakan pilih saluran pembayaran yang paling memudahkan Anda. Seluruh transaksi ditujukan langsung ke rekening resmi SLB Tunas Harapan."
          />

          <div className="space-y-6">
            {/* A. REKENING BANK TRANSFER CARD */}
            <div className="bg-white dark:bg-[#161F2E] p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-[#222F43] shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-150 dark:border-[#222F43] pb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--color-text-dark)]">Transfer Bank Resmi</h3>
                  <p className="text-xs text-[var(--color-text-mid)]">Transfer langsung via ATM, Mobile Banking, atau Internet Banking.</p>
                </div>
              </div>

              {/* Grid Rekening Bank (Placeholder) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bank 1 */}
                <div className="p-4 rounded-xl border border-gray-200 dark:border-[#2A3B54] bg-gray-50/50 dark:bg-[#0B0F17] flex flex-col justify-between space-y-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      BANK KALTIMTARA
                    </span>
                    <p className="text-xl font-mono font-bold text-[var(--color-text-dark)] mt-2 tracking-wider">
                      1234 - 0100 - 5678
                    </p>
                    <p className="text-xs text-[var(--color-text-mid)]">a.n. <strong className="text-[var(--color-text-dark)]">SLB TUNAS HARAPAN PALARAN</strong></p>
                  </div>

                  <button
                    onClick={() => handleCopy("123401005678", "kaltimtara")}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#161F2E] text-[var(--color-text-dark)] hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition-all cursor-pointer shadow-xs"
                  >
                    {copiedBank === "kaltimtara" ? (
                      <>
                        <Check size={14} className="text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Nomor Rekening Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Salin No. Rekening</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Bank 2 */}
                <div className="p-4 rounded-xl border border-gray-200 dark:border-[#2A3B54] bg-gray-50/50 dark:bg-[#0B0F17] flex flex-col justify-between space-y-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      BANK SYARIAH INDONESIA (BSI)
                    </span>
                    <p className="text-xl font-mono font-bold text-[var(--color-text-dark)] mt-2 tracking-wider">
                      7890 - 1234 - 5678
                    </p>
                    <p className="text-xs text-[var(--color-text-mid)]">a.n. <strong className="text-[var(--color-text-dark)]">SLB TUNAS HARAPAN PALARAN</strong></p>
                  </div>

                  <button
                    onClick={() => handleCopy("789012345678", "bsi")}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#161F2E] text-[var(--color-text-dark)] hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition-all cursor-pointer shadow-xs"
                  >
                    {copiedBank === "bsi" ? (
                      <>
                        <Check size={14} className="text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Nomor Rekening Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Salin No. Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* B. PEMBAYARAN QRIS (PROGRESSIVE DISCLOSURE - TERSEMBUNYI HINGGA DIKLIK) */}
            <div className="bg-white dark:bg-[#161F2E] p-6 rounded-2xl border border-gray-200 dark:border-[#222F43] shadow-sm">
              <button
                onClick={() => setShowQris(!showQris)}
                className="w-full flex items-center justify-between gap-4 p-2 text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                    <QrCode size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[var(--color-text-dark)] group-hover:text-[var(--color-primary)] transition-colors">
                      Pembayaran Praktis via QRIS (QR Code)
                    </h3>
                    <p className="text-xs text-[var(--color-text-mid)]">Scan dengan Mobile Banking (BCA, Mandiri, BRI, BSI, dll) atau e-Wallet (GoPay, OVO, Dana).</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-250 dark:border-[#2A3B54] bg-gray-50 dark:bg-[#0B0F17] text-xs font-bold text-[var(--color-text-dark)]">
                  <span>{showQris ? "Sembunyikan QRIS" : "Tampilkan QRIS"}</span>
                  {showQris ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {/* Expandable QRIS Section */}
              {showQris && (
                <div className="mt-6 pt-6 border-t border-gray-150 dark:border-[#222F43] text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="max-w-xs mx-auto p-4 bg-white rounded-2xl border-2 border-gray-200 shadow-md">
                    {/* Placeholder QRIS Image */}
                    <div className="w-56 h-56 mx-auto bg-gray-100 rounded-xl flex flex-col items-center justify-center border border-dashed border-gray-300 p-4 text-gray-500 space-y-2">
                      <QrCode size={64} className="text-gray-400" />
                      <p className="text-xs font-bold text-gray-600">QRIS SLB TUNAS HARAPAN</p>
                      <p className="text-[10px] text-gray-400">NMID: ID1029384756102</p>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--color-text-mid)] max-w-md mx-auto">
                    💡 **Petunjuk**: Buka aplikasi BCA Mobile, Livin Mandiri, BRImo, BSI Mobile, atau GoPay/OVO/Dana Anda ➔ Pilih menu **Scan QRIS** ➔ Pindai kode di atas.
                  </p>
                </div>
              )}
            </div>

            {/* C. CONFIRMATION & THANK YOU CTA */}
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center space-y-4">
              <div className="flex justify-center text-emerald-600 dark:text-emerald-400">
                <ShieldCheck size={36} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-lg text-[var(--color-text-dark)]">Konfirmasi Transfer / Tanya Jawab</h4>
                <p className="text-xs text-[var(--color-text-mid)] max-w-lg mx-auto">
                  Setelah melakukan transfer, Bapak/Ibu dapat mengirimkan bukti kirim agar tim bendahara sekolah mencatat dan memberikan laporan tanda terima resmi.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={`https://wa.me/6285250402074?text=${encodeURIComponent(`Halo Admin SLB Tunas Harapan Samarinda, saya ingin mengonfirmasi donasi/dukungan untuk program: ${currentImpact.judul}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold rounded-full bg-emerald-600 hover:bg-emerald-700 !text-white active:scale-95 transition-all shadow-md"
                  style={{ color: "#ffffff" }}
                >
                  <MessageSquare size={16} className="text-white" />
                  <span style={{ color: "#ffffff" }}>Konfirmasi via WhatsApp Admin</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
