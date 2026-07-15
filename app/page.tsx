import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Heart, Shield, Users, Calendar, MapPin, Award } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import { getAllKegiatanMeta, formatTanggalID } from "@/lib/mdx";
import { dataTestimoni } from "@/content/data/testimoni";
import FaqSection from "@/components/home/FaqSection";

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
      {/* 1. HERO SECTION (JUMBOTRON FULL IMAGE) */}
      <section className="relative text-white pt-[140px] md:pt-[170px] pb-16 md:pb-24 flex items-center min-h-[90vh] md:min-h-screen overflow-hidden" aria-label="Selamat Datang">
        {/* Background Image Full */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/Hero img.jpeg"
            alt="Siswa-siswi sekolah belajar bersama dengan ceria"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Overlay Gelap untuk Kontras Maksimal */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40 md:to-transparent" />
        </div>

        <div className="container-custom relative z-10 w-full">
          <div className="max-w-3xl space-y-6 text-left ml-2 sm:ml-4">
            <Badge variant="yellow">Pendidikan Inklusif & Penyayang</Badge>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-md"
              style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
            >
              Masa Depan Cerah bagi <span className="text-[var(--color-accent)]">Anak Istimewa</span> Kita
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed drop-shadow-sm"
              style={{ color: "rgba(255, 255, 255, 0.95)" }}
            >
              SLB Tunas Harapan Samarinda berkomitmen mendampingi, mendidik, dan mengasah potensi anak berkebutuhan khusus dengan kesabaran penuh agar tumbuh mandiri dan percaya diri.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 max-w-md sm:max-w-none">
              <Button variant="primary" href="/kontak" className="w-full sm:w-auto shadow-lg shadow-black/30">
                Hubungi Kami <ArrowRight size={16} />
              </Button>
              <Button variant="outline-white" href="/profil" className="w-full sm:w-auto">
                Pelajari Profil
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SAMBUTAN KEPALA SEKOLAH */}
      <section className="section-py bg-white" aria-label="Sambutan Kepala Sekolah">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-lg border border-gray-150">
                <Image
                  src="/images/staff/Pak Baderi.png" // Foto Kepala Sekolah Baderi, S.Pd
                  alt="Foto Kepala Sekolah Baderi, S.Pd."
                  fill
                  className="object-cover"
                  sizes="256px"
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
              <span className="text-xs font-bold tracking-widest text-[var(--color-secondary)] uppercase">
                Kata Sambutan
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                Mendidik dengan Hati, Membimbing dengan Kasih
              </h2>
              <span className="section-title-line mx-auto lg:mx-0" style={{ background: "var(--color-secondary)" }} />
              <div className="space-y-4 text-[var(--color-text-mid)] text-sm sm:text-base leading-relaxed">
                <p>
                  Assalamu&apos;alaikum Wr. Wb.,
                </p>
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
                <Button variant="secondary" href="/profil">
                  Baca Profil Sekolah Lengkap
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VALUE / KEUNGGULAN SEKOLAH */}
      <section className="section-py bg-gray-50" aria-label="Keunggulan Kami">
        <div className="container-custom">
          <SectionTitle
            label="Kenapa Kami?"
            title="Keunggulan SLB Tunas Harapan"
            subtitle="Kami berupaya keras menyediakan ekosistem terbaik demi mendukung setiap langkah tumbuh kembang anak-anak luar biasa."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--color-primary-tint)", color: "var(--color-primary)" }}>
                <Heart size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Guru Penuh Kasih</h3>
              <p className="text-sm text-[var(--color-text-mid)] leading-relaxed">
                Dididik oleh tenaga pengajar berpengalaman dan berdedikasi tinggi yang memahami psikologi & kebutuhan khusus anak.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--color-secondary-tint)", color: "var(--color-secondary)" }}>
                <BookOpen size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Kurikulum Adaptif</h3>
              <p className="text-sm text-[var(--color-text-mid)] leading-relaxed">
                Menerapkan metode pembelajaran yang fleksibel dan terfokus pada kemampuan motorik, kognitif, dan komunikasi praktis.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--color-accent-tint)", color: "var(--color-accent-dark)" }}>
                <Award size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Fokus Kemandirian</h3>
              <p className="text-sm text-[var(--color-text-mid)] leading-relaxed">
                Melatih keterampilan vokasional (membatik, menjahit, seni kriya) agar siswa siap memimpin masa depan mandiri.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(15, 118, 110, 0.1)", color: "rgb(15, 118, 110)" }}>
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Fasilitas Ramah Anak</h3>
              <p className="text-sm text-[var(--color-text-mid)] leading-relaxed">
                Fasilitas fisik sekolah (toilet, kelas, UKS) dirancang agar aman, bersih, dan mudah diakses oleh anak berkebutuhan khusus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PREVIEW FASILITAS / GALERI */}
      <section className="section-py bg-white" aria-label="Pratinjau Fasilitas">
        <div className="container-custom">
          <SectionTitle
            label="Kondisi Fisik Sekolah"
            title="Fasilitas SLB Tunas Harapan"
            subtitle="Request utama pemilik sekolah adalah memperlihatkan kondisi fisik sekolah secara transparan agar orang tua yakin sebelum berkunjung langsung."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fasilitasPreview.map((item, index) => (
              <div key={index} className="card group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="green">{item.tag}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[var(--color-text-dark)] group-hover:text-[var(--color-primary)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-mid)] leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="secondary" href="/galeri">
              Lihat Seluruh Galeri Foto Sekolah
            </Button>
          </div>
        </div>
      </section>

      {/* 5. KEGIATAN TERBARU (BLOG HIGHLIGHT) */}
      <section className="section-py bg-gray-50" aria-label="Kegiatan Terbaru">
        <div className="container-custom">
          <SectionTitle
            label="Kabar Sekolah"
            title="Kegiatan & Berita Terbaru"
            subtitle="Ikuti terus aktivitas harian, kegiatan kreatif, serta berita perkembangan penting di SLB Tunas Harapan."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beritaTerbaru.map((post) => (
              <article key={post.slug} className="card flex flex-col h-full">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.foto}
                    alt={post.judul}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
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
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="secondary" href="/kegiatan">
              Lihat Semua Berita & Kegiatan
            </Button>
          </div>
        </div>
      </section>

      {/* 6. FAQ (PERTANYAAN UMUM) */}
      <FaqSection />

      {/* 7. TESTIMONI ORANG TUA */}
      <section className="section-py bg-white overflow-hidden" aria-label="Testimoni Orang Tua">
        <div className="container-custom">
          <SectionTitle
            label="Testimoni"
            title="Apa Kata Orang Tua Murid?"
            subtitle="Pengalaman langsung dari para orang tua yang mempercayakan proses belajar putra-putri mereka di sekolah kami."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dataTestimoni.map((item) => (
              <div key={item.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between h-full hover:shadow-sm transition-shadow">
                <div>
                  <div className="flex items-center gap-1 text-[var(--color-accent-dark)] mb-4" aria-hidden="true">
                    {"★".repeat(5)}
                  </div>
                  <p className="text-sm sm:text-base italic text-[var(--color-text-mid)] leading-relaxed mb-6">
                    &ldquo;{item.isi}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3 border-t border-gray-200/60 pt-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-secondary-tint)] flex items-center justify-center font-bold text-[var(--color-secondary-dark)] text-sm">
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
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="section-py relative overflow-hidden" style={{ background: "var(--color-accent-tint)" }} aria-label="Daftarkan Anak">
        {/* Dekorasi kecil */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

        <div className="container-custom relative z-10 text-center space-y-6 max-w-3xl">
          <Badge variant="yellow">Kunjungan & Pendaftaran</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
            Kenali Kami Lebih Dekat secara Langsung
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--color-text-mid)] leading-relaxed max-w-2xl mx-auto">
            Kami mengundang Bapak, Ibu, serta ananda tercinta untuk datang mengunjungi lingkungan SLB Tunas Harapan, melihat fasilitas secara langsung, dan berkonsultasi dengan para pengajar kami.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Button variant="primary" href="/kontak">
              Jadwalkan Kunjungan
            </Button>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-bold text-sm text-[var(--color-secondary)] hover:underline"
            >
              Hubungi via WhatsApp →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
