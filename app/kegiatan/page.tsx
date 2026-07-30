import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import { getAllKegiatanMeta, formatTanggalID } from "@/lib/mdx";
import { Calendar, ArrowRight } from "lucide-react";
import KineticText from "@/components/ui/KineticText";
import TiltCard from "@/components/ui/TiltCard";
import ParallaxImage from "@/components/ui/ParallaxImage";

export const metadata = {
  title: "Kegiatan & Berita Terbaru",
  description: "Ikuti dokumentasi kegiatan rutin, kreativitas siswa, dan kabar terbaru dari SLB Tunas Harapan Samarinda.",
};

export default function KegiatanPage() {
  const posts = getAllKegiatanMeta();

  return (
    <>
      {/* HEADER SECTION */}
      <section className="bg-gradient-to-b from-gray-100 to-white pt-40 pb-12 border-b border-gray-200 overflow-hidden">
        <div className="container-custom">
          <KineticText
            text="Kegiatan & Berita Sekolah"
            as="h1"
            className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-dark)]"
            highlightWords={["Berita", "Sekolah"]}
            highlightClass="text-[var(--color-primary)]"
          />
          <p className="text-sm sm:text-base text-[var(--color-text-mid)] mt-2">
            Dokumentasi harian, info pengumuman penting, serta wujud kreativitas siswa-siswi SLB Tunas Harapan Samarinda.
          </p>
        </div>
      </section>

      {/* LIST KEGIATAN */}
      <section className="section-py bg-white overflow-hidden">
        <div className="container-custom">
          <SectionTitle 
            label="Kabar SLB Tunas Harapan" 
            title="Kegiatan & Artikel Terbaru"
            subtitle="Kami rutin mendokumentasikan kegiatan belajar mengajar, acara peringatan hari besar, serta pelatihan keterampilan siswa di sini."
          />

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <TiltCard key={post.slug} glowColor="rgba(204, 31, 42, 0.2)" className="rounded-2xl h-full">
                  <article className="card flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                      <ParallaxImage 
                        src={post.foto} 
                        alt={post.judul} 
                        containerClassName="relative w-full h-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4 z-10">
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
                </TiltCard>
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
