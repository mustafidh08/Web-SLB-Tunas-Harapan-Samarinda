"use client";

import { useState } from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";
import KineticText from "@/components/ui/KineticText";
import TiltCard from "@/components/ui/TiltCard";
import MagneticButton from "@/components/ui/MagneticButton";

export default function KontakClient() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    whatsapp: "",
    topik: "Pendaftaran Siswa Baru (PPDB / Konsultasi Inklusi)",
    pesan: "",
  });
  const [kirimSukses, setKirimSukses] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [lastSubmitted, setLastSubmitted] = useState<{ nama: string; email: string; whatsapp: string; pesan: string; topik?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Goal Gradient Calculation: Memulai dari 50% ketika pengguna mulai mengetik (Artificial Head Start)
  const isStarted = Boolean(formData.nama || formData.whatsapp || formData.pesan);
  const isComplete = Boolean(formData.nama && formData.whatsapp && formData.pesan);
  const progressPercent = !isStarted ? 0 : isComplete ? 100 : 50;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // Send data ke API backend terproteksi untuk sanitasi Anti-XSS & Rate Limiting
      const res = await fetch("/api/kontak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          pesan: `[Topik: ${formData.topik}] ${formData.pesan}`,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setErrorMsg(data.message || "Gagal mengirim pesan.");
        setIsSubmitting(false);
        return;
      }

      // Gunakan data tersanitasi dari server
      const sanitized = data.sanitizedData;
      setLastSubmitted({ ...sanitized, topik: formData.topik });
      setKirimSukses(true);

      // Coba buka mailto di window terpisah agar tidak menghentikan state React
      const subject = `[${formData.topik}] Pertanyaan dari ${sanitized.nama}`;
      const body = `Halo SLB Tunas Harapan Samarinda,\n\nSaya ingin menanyakan perihal: ${formData.topik}.\n\nBerikut detail kontak saya:\n- Nama: ${sanitized.nama}\n- WhatsApp/HP: ${sanitized.whatsapp}\n- Email Pengirim: ${sanitized.email}\n\nPesan:\n${sanitized.pesan}\n\nTerima kasih.`;
      
      const mailtoUrl = `mailto:slbtunasharapan.smr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      setTimeout(() => {
        try {
          window.location.href = mailtoUrl;
        } catch {
          // Fallback safe
        }
      }, 300);

      setFormData({
        nama: "",
        email: "",
        whatsapp: "",
        topik: "Pendaftaran Siswa Baru (PPDB / Konsultasi Inklusi)",
        pesan: "",
      });
    } catch {
      setErrorMsg("Terjadi kesalahan jaringan. Silakan coba beberapa saat lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* HEADER SECTION (WITH SAFE TOP PADDING AGAINST FIXED NAVBAR) */}
      <section className="bg-gradient-to-b from-gray-100 to-white dark:from-[#161F2E] dark:to-[#0B0F17] pt-44 md:pt-48 pb-12 border-b border-gray-200 dark:border-[#222F43] overflow-hidden">
        <div className="container-custom">
          <KineticText
            text="Hubungi Kami"
            as="h1"
            className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-dark)]"
            highlightWords={["Kami"]}
            highlightClass="text-[var(--color-primary)]"
          />
          <p className="text-sm sm:text-base text-[var(--color-text-mid)] mt-2">
            Punya pertanyaan seputar pendaftaran, program sekolah, atau ingin berkunjung langsung? Silakan hubungi kami.
          </p>
        </div>
      </section>

      {/* DETAIL KONTAK & FORM & MAP */}
      <section className="section-py bg-white dark:bg-[#0B0F17] overflow-hidden">
        <div className="container-custom">
          <SectionTitle 
            label="Hubungi & Kunjungi" 
            title="Lokasi & Kontak SLB Tunas Harapan"
            subtitle="Kami berlokasi di Palaran, Samarinda. Kontak telepon/WhatsApp kami aktif selama jam operasional sekolah."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Info Kontak & Jam Operasional (Col 5) */}
            <div className="lg:col-span-5 h-full">
              <TiltCard glowColor="rgba(45, 122, 45, 0.2)" className="rounded-2xl h-full">
                <div className="flex flex-col justify-between space-y-8 bg-gray-50 dark:bg-[#161F2E] p-6 sm:p-8 rounded-2xl border border-gray-150 dark:border-[#222F43] h-full">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                      Informasi Kontak
                    </h3>
                    <span className="section-title-line" style={{ background: "var(--color-primary)", marginTop: "-0.5rem" }} />
                    
                    <ul className="space-y-6" role="list">
                      <li className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0B0F17] shadow-sm flex items-center justify-center flex-shrink-0 text-[var(--color-primary)] border border-gray-100 dark:border-[#222F43]">
                           <MapPin size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[var(--color-text-dark)]">Alamat Sekolah</h4>
                          <a
                            href="https://maps.app.goo.gl/DADHJaKVpLwwskSy9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[var(--color-text-mid)] hover:text-[var(--color-primary)] transition-colors block mt-1 leading-relaxed"
                          >
                            Jl. Swadaya - Gg. Soponyono IV RT.16, Handil Bakti, Kec. Palaran, Samarinda, Kaltim 75242
                          </a>
                        </div>
                      </li>

                      <li className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0B0F17] shadow-sm flex items-center justify-center flex-shrink-0 text-[var(--color-secondary)] dark:text-emerald-400 border border-gray-100 dark:border-[#222F43]">
                           <Phone size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[var(--color-text-dark)]">Telepon / WhatsApp</h4>
                          <div className="flex flex-col gap-1 mt-1">
                            <a 
                              href="https://wa.me/6285250402074" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-[var(--color-secondary-dark)] dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                              aria-label="Hubungi WhatsApp Sekolah"
                            >
                              0852-5040-2074
                            </a>
                          </div>
                        </div>
                      </li>

                      <li className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0B0F17] shadow-sm flex items-center justify-center flex-shrink-0 text-[var(--color-primary)] border border-gray-100 dark:border-[#222F43]">
                          <Mail size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[var(--color-text-dark)]">Email Resmi</h4>
                          <a 
                            href="mailto:slbtunasharapan.smr@gmail.com" 
                            className="text-sm text-[var(--color-text-mid)] hover:text-[var(--color-primary)] transition-colors block mt-1"
                          >
                            slbtunasharapan.smr@gmail.com
                          </a>
                        </div>
                      </li>

                      <li className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0B0F17] shadow-sm flex items-center justify-center flex-shrink-0 text-[var(--color-accent-dark)] dark:text-amber-400 border border-gray-100 dark:border-[#222F43]">
                          <Clock size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[var(--color-text-dark)]">Jam Kerja Operasional</h4>
                          <p className="text-sm text-[var(--color-text-mid)] mt-1">
                            Senin – Sabtu: <span className="font-semibold">08.00 – 13.00 WITA</span>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-[var(--color-secondary-tint)] dark:bg-emerald-950/50 p-4 rounded-xl border border-green-100/50 dark:border-emerald-800/80">
                    <p className="text-xs text-[var(--color-secondary-dark)] dark:text-emerald-400 font-medium leading-relaxed">
                      💡 <strong>Catatan Kunjungan:</strong> Harap membuat janji temu terlebih dahulu melalui WhatsApp/telepon sebelum berkunjung langsung demi memastikan kelancaran pertemuan dengan staff/kepala sekolah.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Form Kontak (Col 7 - Grid Wrapper Khusus) */}
            <div className="lg:col-span-7 h-full">
              <div className="bg-white dark:bg-[#161F2E] p-6 sm:p-8 rounded-2xl border border-gray-150 dark:border-[#222F43] shadow-sm flex flex-col justify-center h-full">
                {kirimSukses ? (
                  /* Peak-End Rule: Celebratory & Reassuring Success State */
                  <div className="text-center py-8 space-y-5 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                      <CheckCircle size={48} />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-extrabold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                        🎉 Pesan Berhasil Terkirim!
                      </h3>
                      <p className="text-sm text-[var(--color-text-mid)] max-w-md mx-auto leading-relaxed">
                        Terima kasih Bapak/Ibu <span className="font-bold text-[var(--color-text-dark)]">{lastSubmitted?.nama}</span>. Pesan Anda perihal <span className="font-semibold text-emerald-600 dark:text-emerald-400">{lastSubmitted?.topik}</span> telah diterima oleh tim SLB Tunas Harapan.
                      </p>
                    </div>

                    {lastSubmitted && (
                      <div className="pt-3 flex flex-col sm:flex-row justify-center gap-3">
                        <a
                          href={`https://wa.me/6285250402074?text=${encodeURIComponent(`Halo SLB Tunas Harapan Samarinda, saya ${lastSubmitted.nama} (perihal: ${lastSubmitted.topik}). Pesan saya: ${lastSubmitted.pesan}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold rounded-full bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 transition-all shadow-md"
                        >
                          <MessageSquare size={16} />
                          Lanjut Bicara di WhatsApp Admin
                        </a>
                        <button
                          onClick={() => setKirimSukses(false)}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold rounded-full border border-gray-250 dark:border-[#2A3B54] text-[var(--color-text-dark)] hover:bg-gray-100 dark:hover:bg-[#0B0F17] active:scale-95 transition-all cursor-pointer"
                        >
                          Kirim Pesan Lain
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" aria-label="Form Hubungi Kami">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                          Formulir Konsultasi & Pesan
                        </h3>
                        <p className="text-xs text-[var(--color-text-mid)] mt-0.5">
                          Silakan isi formulir di bawah ini untuk terhubung langsung dengan pihak sekolah.
                        </p>
                      </div>
                    </div>

                    {/* Goal Gradient Effect: Progress Meter dengan Artificial Head Start (50%) */}
                    {isStarted && (
                      <div className="space-y-1.5 bg-gray-50 dark:bg-[#0B0F17] p-3 rounded-xl border border-gray-200 dark:border-[#2A3B54]">
                        <div className="flex justify-between text-[11px] font-bold text-[var(--color-text-dark)]">
                          <span>{isComplete ? "✨ Form Lengkap & Siap Dikirim" : "📋 Progres Pengisian"}</span>
                          <span className="text-[var(--color-primary)] font-mono">{progressPercent}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[var(--color-primary)] to-emerald-500 transition-all duration-300 rounded-full"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {errorMsg && (
                      <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-semibold rounded-xl border border-red-200 dark:border-red-800 flex items-center gap-2">
                        <AlertCircle size={16} />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* Smart Default: Dropdown Topik Keperluan */}
                    <div className="space-y-1">
                      <label htmlFor="topik" className="block text-xs font-semibold text-[var(--color-text-dark)]">
                        Topik / Keperluan Konsultasi
                      </label>
                      <select
                        id="topik"
                        name="topik"
                        value={formData.topik}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-250 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-tint)] transition-all cursor-pointer"
                      >
                        <option value="Pendaftaran Siswa Baru (PPDB / Konsultasi Inklusi)">
                          Pendaftaran Siswa Baru (PPDB / Konsultasi Inklusi)
                        </option>
                        <option value="Informasi Program SDLB / SMPLB / SMALB">
                          Informasi Program SDLB / SMPLB / SMALB
                        </option>
                        <option value="Kunjungan Sekolah / Observasi">
                          Jadwal Kunjungan Sekolah / Observasi
                        </option>
                        <option value="Kerjasama Instansi / Beasiswa / Donasi">
                          Kerjasama Instansi / Beasiswa / Donasi
                        </option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="nama" className="block text-xs font-semibold text-[var(--color-text-dark)]">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          id="nama"
                          name="nama"
                          required
                          value={formData.nama}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 text-sm border border-gray-250 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-tint)] transition-all"
                          placeholder="Contoh: Budi Santoso"
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="whatsapp" className="block text-xs font-semibold text-[var(--color-text-dark)]">
                          No. WhatsApp / HP
                        </label>
                        <input
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          required
                          value={formData.whatsapp}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 text-sm border border-gray-250 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-tint)] transition-all"
                          placeholder="Contoh: 085250402074"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="email" className="block text-xs font-semibold text-[var(--color-text-dark)]">
                        Alamat Email (Opsional)
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-250 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-tint)] transition-all"
                        placeholder="Contoh: budi@gmail.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="pesan" className="block text-xs font-semibold text-[var(--color-text-dark)]">
                        Isi Pesan / Pertanyaan Anda
                      </label>
                      <textarea
                        id="pesan"
                        name="pesan"
                        required
                        rows={4}
                        value={formData.pesan}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-250 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-tint)] transition-all resize-none"
                        placeholder="Tuliskan pertanyaan, konsultasi pendaftaran, atau jadwal kunjungan yang diinginkan..."
                      />
                    </div>

                    <MagneticButton className="w-full">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                        className="w-full justify-center gap-2 cursor-pointer py-3 text-sm font-bold shadow-md"
                      >
                        {isSubmitting ? (
                          <span>Memproses Keamanan...</span>
                        ) : (
                          <>
                            <span>Kirim Pesan Sekarang</span>
                            <Send size={14} />
                          </>
                        )}
                      </Button>
                    </MagneticButton>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Google Maps Embed Section */}
          <div className="mt-16 space-y-4">
            <h3 className="text-xl font-bold text-[var(--color-text-dark)] text-center" style={{ fontFamily: "var(--font-heading)" }}>
              Peta Lokasi Sekolah
            </h3>
            <div className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
              <iframe
                title="Peta Lokasi SLB Tunas Harapan Palaran"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1317.1627895650793!2d117.15524023747044!3d-0.5533427226724303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df6810bab7b841d%3A0x232f5b65ae8416f9!2sSLB%20TUNAS%20HARAPAN!5e1!3m2!1sid!2sid!4v1783733553586!5m2!1sid!2sid"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
