import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { dataStaff } from "@/content/data/staff";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Guru & Staff Pengajar",
  description: "Mengenal para guru dan tenaga kependidikan berdedikasi tinggi di SLB Tunas Harapan Samarinda.",
};

export default function StaffPage() {
  return (
    <>
      {/* HEADER SECTION */}
      <section className="bg-gray-100 pt-40 pb-12 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                Guru & Staff Pengajar
              </h1>
              <p className="text-sm sm:text-base text-[var(--color-text-mid)] mt-2">
                Mengenal lebih dekat para pendidik dan tenaga kependidikan yang mendampingi proses belajar putra-putri kita.
              </p>
            </div>
            <Button variant="secondary" href="/profil" className="self-start sm:self-center text-xs py-2 px-4 gap-1.5">
              <ArrowLeft size={14} /> Kembali ke Profil
            </Button>
          </div>
        </div>
      </section>

      {/* STAFF LIST SECTION */}
      <section className="section-py bg-white">
        <div className="container-custom">
          <SectionTitle 
            label="Keluarga Besar Sekolah" 
            title="Pendidik Berdedikasi"
            subtitle="Guru dan staff kami merupakan profesional terlatih di bidang pendidikan luar biasa yang mendidik dengan penuh ketulusan hati."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dataStaff.map((staff) => (
              <div key={staff.id} className="card group flex flex-col h-full">
                {/* Foto guru */}
                <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                  <Image
                    src={staff.foto}
                    alt={`Foto ${staff.nama}`}
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span 
                      className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded bg-black/60 text-white backdrop-blur-sm"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {staff.jabatan}
                    </span>
                  </div>
                </div>

                {/* Info guru */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 
                      className="font-bold text-base text-[var(--color-text-dark)] group-hover:text-[var(--color-primary)] transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {staff.nama}
                    </h3>
                    {staff.pendidikan && staff.jurusan && (
                      <div className="flex flex-wrap gap-1.5 pt-0.5 pb-1">
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-gray-100 text-gray-700 rounded">
                          {staff.pendidikan} - {staff.jurusan}
                        </span>
                      </div>
                    )}
                    {staff.deskripsi && (
                      <p className="text-xs text-[var(--color-text-mid)] leading-relaxed">
                        {staff.deskripsi}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AJAKAN BERGABUNG (CTA) */}
      <section className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="container-custom text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
            Ada Pertanyaan Khusus untuk Pengajar Kami?
          </h2>
          <p className="text-sm text-[var(--color-text-mid)] max-w-xl mx-auto">
            Bila Anda ingin berkonsultasi mengenai kondisi khusus buah hati Anda dengan wali kelas atau kurikulum kami, jangan ragu untuk menghubungi pihak sekolah.
          </p>
          <div className="pt-2">
            <Button variant="primary" href="/kontak">
              Hubungi Kami Sekarang
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
