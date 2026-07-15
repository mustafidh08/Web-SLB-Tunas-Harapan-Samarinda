import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import { getAllKegiatanMeta, formatTanggalID } from "@/lib/mdx";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Kegiatan & Berita Terbaru",
  description: "Ikuti dokumentasi kegiatan rutin, kreativitas siswa, dan kabar terbaru dari SLB Tunas Harapan Samarinda.",
};

export default function KegiatanPage() {
  const posts = getAllKegiatanMeta();

  return (
    <>
      {/* HEADER SECTION */}
      <section className="bg-gray-100 pt-40 pb-12 border-b border-gray-200">
        <div className="container-custom">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
            Kegiatan & Berita Sekolah
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-mid)] mt-2">
            Dokumentasi harian, info pengumuman penting, serta wujud kreativitas siswa-siswi SLB Tunas Harapan.
          </p>
        </div>
      </section>

      {/* LIST KEGIATAN */}
      <section className="section-py bg-white">
        <div className="container-custom">
          <SectionTitle 
            label="Kabar SLB Tunas Harapan" 
            title="Kegiatan & Artikel Terbaru"
            subtitle="Kami rutin mendokumentasikan kegiatan belajar mengajar, acara peringatan hari besar, serta pelatihan keterampilan siswa di sini."
          />

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="card flex flex-col h-full">
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image 
                      src={post.foto} 
                      alt={post.judul} 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="red">{post.kategori}</Badge>
                    </div>
                  </div>
                  
                  {/* Body Konten */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[var(--color-text-light)] mb-3">
                        <Calendar size={12} />
                        <span>{formatTanggalID(post.tanggal)}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-3 text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors line-clamp-2" style={{ fontFamily: "var(--font-heading)" }}>
                        <Link href={`/kegiatan/${post.slug}`}>
                          {post.judul}
                        </Link>
                      </h3>
                      <p className="text-sm text-[var(--color-text-mid)] leading-relaxed mb-4 line-clamp-3">
                        {post.ringkasan}
                      </p>
                    </div>
                    
                    <Link 
                      href={`/kegiatan/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors group/link mt-2 self-start"
                      id={`read-more-${post.slug}`}
                    >
                      Baca Selengkapnya <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-[var(--color-text-light)]">
              Belum ada berita atau kegiatan yang diterbitkan.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
