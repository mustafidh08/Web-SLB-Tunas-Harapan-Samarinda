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
    pesan: "",
  });
  const [kirimSukses, setKirimSukses] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [lastSubmitted, setLastSubmitted] = useState<{ nama: string; email: string; whatsapp: string; pesan: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // Send data ke API backend terproteksi untuk sanitasi Anti-XSS & Rate Limiting
      const res = await fetch("/api/kontak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        setErrorMsg(data.message || "Gagal mengirim pesan.");
        setIsSubmitting(false);
        return;
      }

      // Gunakan data tersanitasi dari server
      const sanitized = data.sanitizedData;
      setLastSubmitted(sanitized);
      setKirimSukses(true);

      // Coba buka mailto di window terpisah agar tidak menghentikan state React
      const subject = `Pertanyaan dari ${sanitized.nama} (via Website SLB)`;
      const body = `Halo SLB Tunas Harapan Samarinda,\n\nSaya ingin menanyakan perihal sekolah.\n\nBerikut detail kontak saya:\n- Nama: ${sanitized.nama}\n- WhatsApp/HP: ${sanitized.whatsapp}\n- Email Pengirim: ${sanitized.email}\n\nPesan:\n${sanitized.pesan}\n\nTerima kasih.`;
      
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
      {/* HEADER SECTION */}
      <section className="bg-gradient-to-b from-gray-100 to-white pt-40 pb-12 border-b border-gray-200 overflow-hidden">
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
      <section className="section-py bg-white overflow-hidden">
        <div className="container-custom">
          <SectionTitle 
            label="Hubungi & Kunjungi" 
            title="Lokasi & Kontak SLB Tunas Harapan"
            subtitle="Kami berlokasi di Palaran, Samarinda. Kontak telepon/WhatsApp kami aktif selama jam operasional sekolah."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Info Kontak & Jam Operasional (Col 5) */}
            <TiltCard glowColor="rgba(45, 122, 45, 0.2)" className="lg:col-span-5 rounded-2xl h-full">
              <div className="flex flex-col justify-between space-y-8 bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-150 h-full">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                    Informasi Kontak
                  </h3>
                  <span className="section-title-line" style={{ background: "var(--color-primary)", marginTop: "-0.5rem" }} />
                  
                  <ul className="space-y-6" role="list">
                    <li className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-[var(--color-primary)]">
                         <MapPin size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[var(--color-text-dark)]">Alamat Sekolah</h4>
                        <p className="text-sm text-[var(--color-text-mid)] mt-1 leading-relaxed">
                          Jl. Swadaya - Gg. Soponyono IV RT.16,<br />Handil Bakti, Kec. Palaran,<br />Samarinda, Kalimantan Timur 75242
                        </p>
                      </div>
                    </li>

                    <li className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-[var(--color-secondary)]">
                         <Phone size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[var(--color-text-dark)]">Telepon / WhatsApp</h4>
                        <div className="flex flex-col gap-1 mt-1">
                          <a 
                            href="https://wa.me/628125332760" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-[var(--color-secondary-dark)] hover:underline font-semibold flex items-center gap-1"
                            aria-label="Hubungi WhatsApp Sekolah 1"
                          >
                            0812-5332-760 (Admin 1)
                          </a>
                          <a 
                            href="https://wa.me/6285250402074" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-[var(--color-secondary-dark)] hover:underline font-semibold flex items-center gap-1"
                            aria-label="Hubungi WhatsApp Sekolah 2"
                          >
                            0852-5040-2074 (Admin 2)
                          </a>
                        </div>
                      </div>
                    </li>

                    <li className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-[var(--color-primary)]">
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
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-[var(--color-accent-dark)]">
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
                
                <div className="bg-[var(--color-secondary-tint)] p-4 rounded-xl border border-green-100/50">
                  <p className="text-xs text-[var(--color-secondary-dark)] font-medium leading-relaxed">
                    💡 <strong>Catatan Kunjungan:</strong> Harap membuat janji temu terlebih dahulu melalui WhatsApp/telepon sebelum berkunjung langsung demi memastikan kelancaran pertemuan dengan staff/kepala sekolah.
                  </p>
                </div>
              </div>
            </TiltCard>

            {/* Form Kontak (Col 7 - Tanpa TiltCard agar input text stabil & nyaman) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-center h-full">
              {kirimSukses ? (
                <div className="text-center py-8 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-secondary-tint)] text-[var(--color-secondary)] flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle size={40} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                      Pesan Anda Terkirim!
                    </h3>
                    <p className="text-sm text-[var(--color-text-mid)] max-w-md mx-auto leading-relaxed">
                      Terima kasih telah menghubungi kami, <span className="font-semibold text-[var(--color-text-dark)]">{lastSubmitted?.nama}</span>. Aplikasi email Anda akan terbuka secara otomatis untuk mengirim pesan.
                    </p>
                  </div>

                  {lastSubmitted && (
                    <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                      <a
                        href={`https://wa.me/628125332760?text=${encodeURIComponent(`Halo SLB Tunas Harapan Samarinda, saya ${lastSubmitted.nama} ingin menanyakan perihal: ${lastSubmitted.pesan}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold rounded-full bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-dark)] transition-colors shadow-sm"
                      >
                        <MessageSquare size={14} />
                        Kirim Juga via WhatsApp
                      </a>
                      <button
                        onClick={() => setKirimSukses(false)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold rounded-full border border-gray-250 text-[var(--color-text-dark)] hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        Tulis Pesan Baru
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" aria-label="Form Hubungi Kami">
                  <h3 className="text-xl font-bold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                    Kirim Pesan Langsung
                  </h3>
                  <p className="text-xs text-[var(--color-text-mid)]">
                    Silakan isi formulir di bawah ini, tim kami akan merespons dalam waktu 1-2 hari kerja.
                  </p>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-200 flex items-center gap-2">
                      <AlertCircle size={16} />
                      <span>{errorMsg}</span>
                    </div>
                  )}

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
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-250 rounded-xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-tint)] transition-all"
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
                        className="w-full px-3.5 py-2.5 text-sm border border-gray-250 rounded-xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-tint)] transition-all"
                        placeholder="Contoh: 081234567890"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-xs font-semibold text-[var(--color-text-dark)]">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-250 rounded-xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-tint)] transition-all"
                      placeholder="Contoh: budi@gmail.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="pesan" className="block text-xs font-semibold text-[var(--color-text-dark)]">
                      Isi Pesan Anda
                    </label>
                    <textarea
                      id="pesan"
                      name="pesan"
                      required
                      rows={4}
                      value={formData.pesan}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-250 rounded-xl focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-tint)] transition-all resize-none"
                      placeholder="Tuliskan pertanyaan, konsultasi, atau jadwal kunjungan yang diinginkan..."
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
                          <span>Kirim Pesan</span>
                          <Send size={14} />
                        </>
                      )}
                    </Button>
                  </MagneticButton>
                </form>
              )}
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
