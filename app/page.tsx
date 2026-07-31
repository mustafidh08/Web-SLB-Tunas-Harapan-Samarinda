import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Heart, Shield, Calendar, Award } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import { getAllKegiatanMeta, formatTanggalID } from "@/lib/mdx";
import { dataTestimoni } from "@/content/data/testimoni";
import FaqSection from "@/components/home/FaqSection";
import KineticText from "@/components/ui/KineticText";
import TiltCard from "@/components/ui/TiltCard";
import ParallaxImage from "@/components/ui/ParallaxImage";
import CountUpNumber from "@/components/ui/CountUpNumber";
import MagneticButton from "@/components/ui/MagneticButton";

export default function BerandaPage() {
  // Ambil 3 berita terbaru
  const beritaTerbaru = getAllKegiatanMeta().slice(0, 3);

  // Kategori fasilitas untuk dipreview
  const fasilitasPreview = [
    {
      title: "Ruang Kelas Adaptif",
      desc: "Ruang belajar kondusif yang disesuaikan khusus dengan kebutuhan stimulasi visual dan auditori anak.",
      image: "/images/galeri/ruang-kelas/r. kelas 4.jpeg",
      tag: "Ruang Kelas",
    },
    {
      title: "Keterampilan Vokasional",
      desc: "Ruang pelatihan praktis membatik, menjahit, dan kerajinan tangan untuk melatih kemandirian siswa.",
      image: "/images/galeri/keterampilan/R. keterampilan kecantikan 2.jpeg",
      tag: "Keterampilan",
    },
    {
      title: "Unit Kesehatan Sekolah (UKS)",
      desc: "Layanan pertolongan pertama dan ruang istirahat medis yang terawat demi kenyamanan fisik siswa.",
      image: "/images/galeri/uks/uks 1.jpeg",
      tag: "UKS",
    },
  ];

  return (
    <>
      {/* 1. HERO SECTION (JUMBOTRON WITH HIGH-CONTRAST OVERLAY FOR WCAG AAA COMPLIANCE) */}
      <section className="relative text-white pt-[150px] md:pt-[180px] pb-16 md:pb-28 flex items-center min-h-[90vh] md:min-h-screen overflow-hidden" aria-label="Selamat Datang">
        {/* Background Image Full */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/Hero img.jpeg"
            alt="Siswa-siswi sekolah belajar bersama dengan ceria"
            fill
            priority
            className="object-cover object-center transform scale-105 transition-transform duration-1000"
          />
          {/* Overlay Gelap Gradien */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40 md:to-transparent z-10" />
        </div>

        <div className="container-custom relative z-20 w-full">
          <div className="max-w-3xl space-y-6 text-left ml-2 sm:ml-4">
            <Badge variant="yellow">Pendidikan Inklusif & Penyayang</Badge>
            
            <KineticText
              text="Masa Depan Cerah bagi Anak Istimewa Kita"
              as="h1"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-md text-white"
              defaultColorClass="text-white"
              highlightWords={["Anak", "Istimewa"]}
              highlightClass="text-[var(--color-accent)] font-extrabold"
            />

            <p
              className="text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed text-white font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
            >
              SLB Tunas Harapan Samarinda berkomitmen mendampingi, mendidik, dan mengasah potensi anak berkebutuhan khusus dengan kesabaran penuh agar tumbuh mandiri dan percaya diri.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 max-w-md sm:max-w-none">
              <MagneticButton>
                <Button variant="primary" href="/kontak" className="w-full sm:w-auto shadow-xl shadow-black/50 font-bold border-2 border-red-500">
                  Hubungi Kami <ArrowRight size={16} />
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button variant="outline-white" href="/profil" className="w-full sm:w-auto font-bold border-2 border-white/80 bg-black/30 backdrop-blur-xs">
                  Pelajari Profil
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SAMBUTAN KEPALA SEKOLAH (WITH PARALLAX & CLIP-PATH REVEAL) */}
      <section className="section-py bg-white dark:bg-[#0B0F17] overflow-hidden transition-colors duration-300" aria-label="Sambutan Kepala Sekolah">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-4 flex justify-center">
              <ParallaxImage
                src="/images/staff/Pak Baderi.png"
                alt="Foto Kepala Sekolah Baderi, S.Pd."
                containerClassName="relative w-64 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#222F43]"
                sizes="256px"
              />
            </div>

            <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
              <span className="text-xs font-bold tracking-widest text-[var(--color-secondary)] uppercase">
                Kata Sambutan
              </span>
              
              <KineticText
                text="Mendidik dengan Hati, Membimbing dengan Kasih"
                as="h2"
                className="text-2xl sm:text-3xl font-bold text-[var(--color-text-dark)]"
                highlightWords={["Hati,", "Kasih"]}
                highlightClass="text-[var(--color-primary)]"
              />

              <span className="section-title-line mx-auto lg:mx-0" style={{ background: "var(--color-secondary)" }} />
              <div className="space-y-4 text-[var(--color-text-mid)] text-sm sm:text-base leading-relaxed">
                <p>Assalamu&apos;alaikum Wr. Wb.,</p>
                <p>
                  Selamat datang di website resmi SLB Tunas Harapan, Palaran, Samarinda. Kami merasa sangat terhormat dipercayakan mendampingi putra-putri istimewa Bapak dan Ibu sekalian.
                </p>
                <p>
                  Di SLB Tunas Harapan, kami percaya bahwa keterbatasan fisik atau kognitif bukanlah akhir dari segalanya. Setiap anak memiliki keunikan dan potensi yang luar biasa jika didampingi dengan kasih sayang, metode belajar adaptif, dan sarana pengembangan keterampilan yang memadai.
                </p>
                <p className="font-semibold text-[var(--color-text-dark)]">
                  — Baderi, S.Pd., Kepala Sekolah SLB Tunas Harapan
                </p>
              </div>
              <div className="pt-2">
                <MagneticButton>
                  <Button variant="secondary" href="/profil">
                    Baca Profil Sekolah Lengkap
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ANIMATED STATS BANNER */}
      <section className="py-12 bg-[var(--color-primary)] text-white shadow-md">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 space-y-1">
              <p className="text-3xl md:text-5xl font-black text-[var(--color-accent)]">
                <CountUpNumber end={100} suffix="+" />
              </p>
              <p className="text-xs md:text-sm font-semibold opacity-95">Siswa Istimewa</p>
            </div>
            <div className="p-4 space-y-1">
              <p className="text-3xl md:text-5xl font-black text-[var(--color-accent)]">
                <CountUpNumber end={15} suffix="+" />
              </p>
              <p className="text-xs md:text-sm font-semibold opacity-95">Tenaga Pendidik</p>
            </div>
            <div className="p-4 space-y-1">
              <p className="text-3xl md:text-5xl font-black text-[var(--color-accent)]">
                <CountUpNumber end={5} suffix=" Unit" />
              </p>
              <p className="text-xs md:text-sm font-semibold opacity-95">Pelatihan Vokasional</p>
            </div>
            <div className="p-4 space-y-1">
              <p className="text-3xl md:text-5xl font-black text-[var(--color-accent)]">
                <CountUpNumber end={100} suffix="%" />
              </p>
              <p className="text-xs md:text-sm font-semibold opacity-95">Komitmen Inklusif</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUE / KEUNGGULAN SEKOLAH (WITH SPOTLIGHT TILT CARDS) */}
      <section className="section-py bg-gray-50 dark:bg-[#0B0F17] overflow-hidden transition-colors duration-300" aria-label="Keunggulan Kami">
        <div className="container-custom">
          <SectionTitle
            label="Kenapa Kami?"
            title="Keunggulan SLB Tunas Harapan"
            subtitle="Kami berupaya keras menyediakan ekosistem terbaik demi mendukung setiap langkah tumbuh kembang anak-anak luar biasa."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TiltCard glowColor="rgba(204, 31, 42, 0.2)" className="rounded-2xl h-full">
              <div className="bg-white dark:bg-[#161F2E] p-6 rounded-2xl shadow-sm border border-gray-150 dark:border-[#222F43] h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--color-primary-tint)", color: "var(--color-primary)" }}>
                    <Heart size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[var(--color-text-dark)]">Guru Penuh Kasih</h3>
                  <p className="text-sm text-[var(--color-text-mid)] leading-relaxed">
                    Dididik oleh tenaga pengajar berpengalaman dan berdedikasi tinggi yang memahami psikologi & kebutuhan khusus anak.
                  </p>
                </div>
              </div>
            </TiltCard>

            <TiltCard glowColor="rgba(45, 122, 45, 0.2)" className="rounded-2xl h-full">
              <div className="bg-white dark:bg-[#161F2E] p-6 rounded-2xl shadow-sm border border-gray-150 dark:border-[#222F43] h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--color-secondary-tint)", color: "var(--color-secondary)" }}>
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[var(--color-text-dark)]">Kurikulum Adaptif</h3>
                  <p className="text-sm text-[var(--color-text-mid)] leading-relaxed">
                    Menerapkan metode pembelajaran yang fleksibel dan terfokus pada kemampuan motorik, kognitif, dan komunikasi praktis.
                  </p>
                </div>
              </div>
            </TiltCard>

            <TiltCard glowColor="rgba(245, 200, 0, 0.3)" className="rounded-2xl h-full">
              <div className="bg-white dark:bg-[#161F2E] p-6 rounded-2xl shadow-sm border border-gray-150 dark:border-[#222F43] h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--color-accent-tint)", color: "var(--color-accent-dark)" }}>
                    <Award size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[var(--color-text-dark)]">Fokus Kemandirian</h3>
                  <p className="text-sm text-[var(--color-text-mid)] leading-relaxed">
                    Melatih keterampilan vokasional (membatik, menjahit, seni kriya) agar siswa siap memimpin masa depan mandiri.
                  </p>
                </div>
              </div>
            </TiltCard>

            <TiltCard glowColor="rgba(15, 118, 110, 0.25)" className="rounded-2xl h-full">
              <div className="bg-white dark:bg-[#161F2E] p-6 rounded-2xl shadow-sm border border-gray-150 dark:border-[#222F43] h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(15, 118, 110, 0.1)", color: "rgb(15, 118, 110)" }}>
                    <Shield size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[var(--color-text-dark)]">Fasilitas Ramah Anak</h3>
                  <p className="text-sm text-[var(--color-text-mid)] leading-relaxed">
                    Fasilitas fisik sekolah (toilet, kelas, UKS) dirancang agar aman, bersih, dan mudah diakses oleh anak berkebutuhan khusus.
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* 5. PREVIEW FASILITAS / GALERI */}
      <section className="section-py bg-white dark:bg-[#0B0F17] overflow-hidden transition-colors duration-300" aria-label="Pratinjau Fasilitas">
        <div className="container-custom">
          <SectionTitle
            label="Kondisi Fisik Sekolah"
            title="Fasilitas SLB Tunas Harapan"
            subtitle="Memperlihatkan kondisi fisik sekolah secara transparan agar orang tua yakin sebelum berkunjung langsung."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fasilitasPreview.map((item, index) => (
              <TiltCard key={index} glowColor="rgba(45, 122, 45, 0.2)" className="rounded-2xl h-full">
                <div className="card group h-full flex flex-col justify-between bg-white dark:bg-[#161F2E] border border-gray-150 dark:border-[#222F43]">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
                    <ParallaxImage
                      src={item.image}
                      alt={item.title}
                      containerClassName="relative w-full h-full"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <Badge variant="green">{item.tag}</Badge>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-[var(--color-text-dark)] group-hover:text-[var(--color-primary)] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[var(--color-text-mid)] leading-relaxed mb-4">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          <div className="text-center mt-10">
            <MagneticButton>
              <Button variant="secondary" href="/galeri">
                Lihat Seluruh Galeri Foto Sekolah
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 6. KEGIATAN TERBARU (BLOG HIGHLIGHT WITH TILT CARDS) */}
      <section className="section-py bg-gray-50 dark:bg-[#0B0F17] overflow-hidden transition-colors duration-300" aria-label="Kegiatan Terbaru">
        <div className="container-custom">
          <SectionTitle
            label="Kabar Sekolah"
            title="Kegiatan & Berita Terbaru"
            subtitle="Ikuti terus aktivitas harian, kegiatan kreatif, serta berita perkembangan penting di SLB Tunas Harapan."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beritaTerbaru.map((post) => (
              <TiltCard key={post.slug} glowColor="rgba(204, 31, 42, 0.2)" className="rounded-2xl h-full">
                <article className="card flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-[#161F2E] border border-gray-150 dark:border-[#222F43]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ParallaxImage
                      src={post.foto}
                      alt={post.judul}
                      containerClassName="relative w-full h-full"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <Badge variant="red">{post.kategori}</Badge>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[var(--color-text-light)] mb-3">
                        <Calendar size={12} />
                        <span>{formatTanggalID(post.tanggal)}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-3 text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors line-clamp-2">
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
                    >
                      Selengkapnya <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              </TiltCard>
            ))}
          </div>

          <div className="text-center mt-10">
            <MagneticButton>
              <Button variant="secondary" href="/kegiatan">
                Lihat Semua Berita & Kegiatan
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 7. FAQ (PERTANYAAN UMUM) */}
      <FaqSection />

      {/* 8. TESTIMONI ORANG TUA */}
      <section className="section-py bg-white dark:bg-[#0B0F17] overflow-hidden transition-colors duration-300" aria-label="Testimoni Orang Tua">
        <div className="container-custom">
          <SectionTitle
            label="Testimoni"
            title="Apa Kata Orang Tua Murid?"
            subtitle="Pengalaman langsung dari para orang tua yang mempercayakan proses belajar putra-putri mereka di sekolah kami."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dataTestimoni.map((item) => (
              <TiltCard key={item.id} glowColor="rgba(245, 200, 0, 0.2)" className="rounded-2xl h-full">
                <div className="bg-gray-50 dark:bg-[#161F2E] p-6 rounded-2xl border border-gray-150 dark:border-[#222F43] flex flex-col justify-between h-full hover:shadow-sm transition-shadow">
                  <div>
                    <div className="flex items-center gap-1 text-[var(--color-accent-dark)] dark:text-amber-400 mb-4" aria-hidden="true">
                      {"★".repeat(5)}
                    </div>
                    <p className="text-sm sm:text-base italic text-[var(--color-text-mid)] leading-relaxed mb-6">
                      &ldquo;{item.isi}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 border-t border-gray-200/60 dark:border-[#222F43] pt-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-secondary-tint)] flex items-center justify-center font-bold text-[var(--color-secondary-dark)] dark:text-[var(--color-secondary-light)] text-sm">
                      {item.nama[0] || "O"}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[var(--color-text-dark)]">{item.nama}</h4>
                      <p className="text-xs text-[var(--color-text-mid)]">
                        {item.peran} {item.anakJenjang && `(Anak kelas ${item.anakJenjang})`}
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA SECTION WITH MAGNETIC BUTTON & GLOW */}
      <section className="section-py relative overflow-hidden bg-gradient-to-br from-[var(--color-accent-tint)] via-white to-[var(--color-secondary-tint)] dark:from-[#161F2E] dark:via-[#0B0F17] dark:to-[#161F2E] border-t border-gray-150 dark:border-[#222F43] transition-colors duration-300" aria-label="Daftarkan Anak">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-accent)]/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-primary)]/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="container-custom relative z-10 text-center flex flex-col items-center max-w-3xl mx-auto">
          <div className="flex justify-center w-full mb-3">
            <Badge variant="yellow">Kunjungan & Pendaftaran</Badge>
          </div>
          
          <KineticText
            text="Kenali Kami Lebih Dekat secara Langsung"
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-text-dark)] justify-center"
            highlightWords={["Lebih", "Dekat"]}
            highlightClass="text-[var(--color-primary)]"
          />

          <p className="text-sm sm:text-base md:text-lg text-[var(--color-text-mid)] leading-relaxed max-w-2xl mx-auto">
            Kami mengundang Bapak, Ibu, serta ananda tercinta untuk datang mengunjungi lingkungan SLB Tunas Harapan, melihat fasilitas secara langsung, dan berkonsultasi dengan para pengajar kami.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <MagneticButton>
              <Button variant="primary" href="/kontak">
                Jadwalkan Kunjungan
              </Button>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://wa.me/6285250402074"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold text-sm text-[var(--color-secondary)] dark:text-[#4ADE80] hover:underline px-4 py-2"
              >
                Hubungi via WhatsApp →
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
