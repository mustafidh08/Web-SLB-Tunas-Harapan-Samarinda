import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { Award, BookOpen, GraduationCap, MapPin, Smile, Users } from "lucide-react";

export const metadata = {
  title: "Profil Sekolah",
  description: "Pelajari sejarah, visi, misi, dan jenjang pendidikan luar biasa di SLB Tunas Harapan Samarinda.",
};

export default function ProfilPage() {
  const jenjangPendidikan = [
    {
      nama: "SDLB (Sekolah Dasar Luar Biasa)",
      desc: "Menyelenggarakan pendidikan akademis dasar adaptif dipadukan dengan latihan bina diri (makan, berpakaian, merawat diri secara mandiri).",
      icon: <BookOpen size={24} className="text-[var(--color-primary)]" />,
    },
    {
      nama: "SMPLB (Sekolah Menengah Pertama Luar Biasa)",
      desc: "Fokus pada penguatan akademis lanjutan dan pembekalan dasar keterampilan praktis (vokasional) agar anak mulai mengenali potensinya.",
      icon: <GraduationCap size={24} className="text-[var(--color-secondary)]" />,
    },
    {
      nama: "SMALB (Sekolah Menengah Atas Luar Biasa)",
      desc: "Penyelarasan kemandirian total dan penajaman keterampilan vokasional secara intensif guna menyiapkan transisi mandiri ke dunia kerja.",
      icon: <Award size={24} className="text-[var(--color-accent-dark)]" />,
    },
  ];

  return (
    <>
      {/* HEADER SECTION */}
      <section className="bg-gray-100 pt-40 pb-12 border-b border-gray-200">
        <div className="container-custom">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
            Profil Sekolah
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-mid)] mt-2">
            Mengenal lebih dalam sejarah, misi, dan jenjang pendidikan SLB Tunas Harapan.
          </p>
        </div>
      </section>

      {/* SEJARAH SEKOLAH */}
      <section className="section-py bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/hero/hero 2.jpeg"
                alt="Lingkungan SLB Tunas Harapan"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold tracking-widest text-[var(--color-primary)] uppercase">
                Sejarah Singkat
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                Perjalanan SLB Tunas Harapan
              </h2>
              <span className="section-title-line" style={{ background: "var(--color-accent)" }} />

              <div className="space-y-4 text-sm sm:text-base text-[var(--color-text-mid)] leading-relaxed">
                <p>
                  SLB Tunas Harapan didirikan di Palaran, Samarinda dengan niat tulus untuk menyediakan akses pendidikan yang layak dan ramah bagi anak-anak berkebutuhan khusus yang tinggal di kawasan Palaran dan sekitarnya.
                </p>
                <p>
                  Sebelum sekolah ini berdiri, banyak anak istimewa di daerah sekitar kesulitan mendapatkan pendampingan belajar khusus karena jarak tempuh yang jauh ke pusat kota Samarinda. Dengan inisiatif yang kuat, didirikanlah SLB Tunas Harapan untuk menjawab kebutuhan mendesak tersebut.
                </p>
                <p>
                  Hingga kini, sekolah ini terus berkembang baik dari segi kapasitas pengajar, kualitas sarana fisik, maupun keragaman keterampilan vokasional yang diajarkan, demi tercapainya satu tujuan mulia: mengantarkan anak-anak berkebutuhan khusus menuju pintu gerbang kemandirian.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISI & MISI */}
      <section className="section-py bg-gray-50">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            label="Landasan Kerja"
            title="Visi & Misi Sekolah"
            subtitle="Pedoman kerja utama kami dalam mendampingi tumbuh kembang putra-putri istimewa."
          />

          <div className="space-y-8">
            {/* VISI CARD */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 text-center space-y-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-primary-tint)] text-[var(--color-primary)] text-xl font-bold">
                V
              </span>
              <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Visi Kami</h3>
              <p className="text-base sm:text-lg italic text-[var(--color-text-dark)] font-medium max-w-2xl mx-auto leading-relaxed">
                &ldquo;Terwujudnya murid yang bertakwa, kreatif, mandiri dan komunikatif&rdquo;
              </p>
            </div>

            {/* MISI CARD */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="text-center space-y-2">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-secondary-tint)] text-[var(--color-secondary-dark)] text-xl font-bold">
                  M
                </span>
                <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Misi Kami</h3>
              </div>

              <ul className="space-y-4" role="list">
                {[
                  "Menumbuhkan ketakwaan kepada Tuhan Yang Maha Esa melalui pembiasaan ibadah, keteladanan, dan penguatan nilai moral sesuai karakteristik murid berkebutuhan khusus.",
                  "Menyelenggarakan pembelajaran mendalam, bermakna, dan adaptif melalui pengalaman langsung dan proses berkarya sesuai potensi dan kebutuhan murid.",
                  "Mengembangkan kemandirian murid melalui pembiasaan keterampilan hidup dan aktivitas sehari-hari secara bertahap.",
                  "Meningkatkan kemampuan komunikasi murid melalui berbagai bentuk dan media komunikasi sesuai kebutuhan individu.",
                  "Memperkuat kolaborasi sekolah, keluarga, dan lingkungan untuk mendukung tumbuh kembang optimal murid berkebutuhan khusus."
                ].map((misi, index) => (
                  <li key={index} className="flex gap-4 items-start text-sm sm:text-base text-[var(--color-text-mid)]">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                      style={{ background: "var(--color-secondary)" }}
                    >
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{misi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* JENJANG PENDIDIKAN & STATISTIK */}
      <section className="section-py bg-white">
        <div className="container-custom">
          <SectionTitle
            label="Layanan Akademik"
            title="Jenjang Pendidikan yang Tersedia"
            subtitle="Kami melayani anak berkebutuhan khusus dari tahapan sekolah dasar hingga sekolah menengah atas luar biasa."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {jenjangPendidikan.map((jenjang, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm mb-5">
                    {jenjang.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                    {jenjang.nama}
                  </h3>
                  <p className="text-sm text-[var(--color-text-mid)] leading-relaxed mb-6">
                    {jenjang.desc}
                  </p>
                </div>
                <div className="border-t border-gray-200/60 pt-4 flex items-center gap-2 text-xs font-semibold text-[var(--color-text-light)]">
                  <span>Senin – Sabtu</span>
                  <span>•</span>
                  <span>08.00 – 13.00 WITA</span>
                </div>
              </div>
            ))}
          </div>

          {/* Statistik Ringkas */}
          <div className="bg-[var(--color-primary-tint)] border border-red-100 rounded-3xl p-8 mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)]">3</span>
              <span className="block text-xs sm:text-sm font-semibold text-[var(--color-text-mid)] mt-1">Jenjang Pendidikan</span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)]">12</span>
              <span className="block text-xs sm:text-sm font-semibold text-[var(--color-text-mid)] mt-1">Guru & Staff Pengajar</span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)]">68</span>
              <span className="block text-xs sm:text-sm font-semibold text-[var(--color-text-mid)] mt-1">Siswa Aktif</span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)]">100%</span>
              <span className="block text-xs sm:text-sm font-semibold text-[var(--color-text-mid)] mt-1">Dedikasi Kasih Sayang</span>
            </div>
          </div>

          <div className="text-center mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" href="/profil/staff">
              Lihat Profil Guru & Staff Pengajar
            </Button>
            <Button variant="secondary" href="/galeri">
              Lihat Galeri Fasilitas
            </Button>
          </div>
        </div>
      </section>

      {/* STRUKTUR ORGANISASI SECTION */}
      <section className="section-py bg-white border-t border-gray-200">
        <div className="container-custom">
          <SectionTitle
            label="Tata Kelola"
            title="Struktur Organisasi"
            subtitle="Susunan kepengurusan dan pembagian tugas kerja resmi di SLB Tunas Harapan Samarinda."
          />

          {/* Bagan Organisasi Responsif */}
          <div className="max-w-5xl mx-auto space-y-10 mt-12">
            {/* Level 1: Yayasan */}
            <div className="flex justify-center">
              <div className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-2xl shadow-md text-center border border-[var(--color-primary-dark)]">
                <span className="text-[9px] uppercase tracking-wider opacity-90 block font-bold">Penyelenggara</span>
                <span className="font-extrabold text-sm sm:text-base" style={{ fontFamily: "var(--font-heading)" }}>YPK Tunas Harapan Kaltim</span>
              </div>
            </div>

            {/* Hubungan Garis Vertikal */}
            <div className="hidden md:flex justify-center -my-10">
              <div className="w-0.5 h-10 bg-gray-300" />
            </div>

            {/* Level 2: Komite, Kepala Sekolah, Tim Ahli */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-4xl mx-auto">
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 text-center md:text-right relative">
                <span className="text-[9px] text-[var(--color-text-light)] uppercase tracking-wider block font-bold">Mitra Sekolah</span>
                <span className="font-bold text-sm text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>Komite Sekolah</span>
              </div>

              <div className="bg-red-50 p-5 rounded-2xl border-2 border-[var(--color-primary)] text-center shadow-lg relative">
                {/* Aksen hiasan atas */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white text-[8px] font-extrabold uppercase px-3 py-0.5 rounded-full">
                  Pimpinan
                </div>
                <span className="text-[9px] text-[var(--color-primary)] uppercase tracking-wider block font-bold mt-1">Kepala Sekolah</span>
                <span className="font-extrabold text-base text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>Baderi, S.Pd</span>
              </div>

              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 text-center md:text-left">
                <span className="text-[9px] text-[var(--color-text-light)] uppercase tracking-wider block font-bold">Tim Ahli Psikologi</span>
                <span className="font-bold text-sm text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>Carina Nafisah Masturah, S.Psi</span>
              </div>
            </div>

            {/* Level 3: Bendahara & Tata Usaha */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-200 text-center">
                <span className="text-[9px] text-[var(--color-text-light)] uppercase tracking-wider block font-bold">Bendahara</span>
                <span className="font-bold text-sm text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>Kamsiah</span>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-200 text-center">
                <span className="text-[9px] text-[var(--color-text-light)] uppercase tracking-wider block font-bold">Tata Usaha</span>
                <span className="font-bold text-sm text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>Putri Adistiya, A.Md.Kes</span>
              </div>
            </div>

            {/* Level 4: Wakil Kepala Sekolah (Waka) */}
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-bold text-[var(--color-text-light)] uppercase tracking-widest">Wakil Kepala Sekolah (Waka)</span>
                <div className="w-12 h-0.5 bg-gray-300 mx-auto mt-2" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { jabatan: "Waka Kurikulum", nama: "Lilik Farida, S.Pd" },
                  { jabatan: "Waka Kesiswaan", nama: "Irma Rahmawati, S.Pd" },
                  { jabatan: "Waka Sarpras", nama: "Mochamad Subakti" },
                  { jabatan: "Waka Humas", nama: "Susilawati, S.Pd" }
                ].map((waka, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl shadow-xs border border-gray-200 text-center hover:border-[var(--color-secondary)] transition-all">
                    <span className="text-[9px] text-[var(--color-secondary-dark)] uppercase tracking-wider block font-bold">{waka.jabatan}</span>
                    <span className="font-bold text-sm text-[var(--color-text-dark)] mt-1 block" style={{ fontFamily: "var(--font-heading)" }}>{waka.nama}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Level 5: Operator, Wali Kelas, Koordinator Pendidikan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-200 text-center">
                <span className="text-[9px] text-[var(--color-text-light)] uppercase tracking-wider block font-bold">Operator Sekolah</span>
                <span className="font-bold text-sm text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>Putri Adistiya, A.Md.Kes</span>
              </div>
              <div className="bg-gray-100 p-5 rounded-2xl border border-gray-300 text-center flex items-center justify-center">
                <span className="font-bold text-sm text-gray-700" style={{ fontFamily: "var(--font-heading)" }}>Wali Kelas & Tenaga Pendidik</span>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-200 text-center">
                <span className="text-[9px] text-[var(--color-text-light)] uppercase tracking-wider block font-bold">Koordinator</span>
                <span className="font-bold text-sm text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>Pendidikan</span>
              </div>
            </div>

            {/* Level 6: Koordinator Layanan & Bidang */}
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-bold text-[var(--color-text-light)] uppercase tracking-widest">Koordinator Layanan & Layanan Khusus</span>
                <div className="w-12 h-0.5 bg-gray-300 mx-auto mt-2" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { bidang: "Kokurikuler", nama: "Lilik Farida, S.Pd" },
                  { bidang: "Keagamaan", nama: "Irma Rahmawati, S.Pd" },
                  { bidang: "Asesmen", nama: "Umi Yaroh, S.Pd" },
                  { bidang: "Pramuka", nama: "Nor Yakin, S.E" },
                  { bidang: "Literasi & Perpus", nama: "Eka Sari Zuni S., A.M.Pust" },
                  { bidang: "UKS", nama: "Rita Masitah" }
                ].map((bidang, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl shadow-xs border border-gray-200 text-center hover:border-[var(--color-accent)] transition-all flex flex-col justify-between">
                    <span className="text-[9px] text-[var(--color-accent-dark)] uppercase tracking-wider block font-extrabold">{bidang.bidang}</span>
                    <span className="font-bold text-xs text-[var(--color-text-dark)] mt-2 block leading-snug" style={{ fontFamily: "var(--font-heading)" }}>{bidang.nama}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IDENTITAS SEKOLAH SECTION */}
      <section className="section-py bg-gray-50 border-t border-gray-200">
        <div className="container-custom">
          <SectionTitle
            label="Informasi Resmi"
            title="Identitas & Data Administratif Sekolah"
            subtitle="Data profil legalitas dan kapasitas sarana penunjang kegiatan belajar mengajar SLB Tunas Harapan."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* Kartu Profil Legalitas */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <h3 className="text-lg font-bold text-[var(--color-text-dark)] flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                <Award size={20} className="text-[var(--color-primary)]" />
                Legalitas & Akreditasi
              </h3>
              <div className="border-b border-gray-100" />

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div>
                  <dt className="text-xs text-[var(--color-text-light)] uppercase font-semibold">Nama Resmi Sekolah</dt>
                  <dd className="text-sm font-semibold text-[var(--color-text-dark)] mt-0.5">SLB Tunas Harapan</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-text-light)] uppercase font-semibold">Status Sekolah</dt>
                  <dd className="text-sm font-semibold text-[var(--color-text-dark)] mt-0.5">Swasta</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-text-light)] uppercase font-semibold">NPSN</dt>
                  <dd className="text-sm font-semibold text-[var(--color-text-dark)] mt-0.5 font-mono">69774827</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-text-light)] uppercase font-semibold">NSS</dt>
                  <dd className="text-sm font-semibold text-[var(--color-text-dark)] mt-0.5 font-mono">102.16.60.04.025</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-text-light)] uppercase font-semibold">Status Akreditasi</dt>
                  <dd className="text-sm font-semibold text-[var(--color-text-dark)] mt-0.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 text-xs font-bold bg-yellow-100 text-yellow-800 rounded">C</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-text-light)] uppercase font-semibold">Waktu Penyelenggaraan</dt>
                  <dd className="text-sm font-semibold text-[var(--color-text-dark)] mt-0.5">Pagi</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs text-[var(--color-text-light)] uppercase font-semibold">SK Pendirian (Baru)</dt>
                  <dd className="text-xs font-semibold text-[var(--color-text-dark)] mt-0.5 font-mono">421.9/G112/Disdikbud,V/2020</dd>
                </div>
              </dl>
            </div>

            {/* Kartu Profil Fasilitas & Kapasitas */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <h3 className="text-lg font-bold text-[var(--color-text-dark)] flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                <BookOpen size={20} className="text-[var(--color-secondary)]" />
                Fasilitas & Kapasitas Penunjang
              </h3>
              <div className="border-b border-gray-100" />

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div>
                  <dt className="text-xs text-[var(--color-text-light)] uppercase font-semibold">Luas Tanah</dt>
                  <dd className="text-sm font-semibold text-[var(--color-text-dark)] mt-0.5">400 m²</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-text-light)] uppercase font-semibold">Luas Bangunan & Halaman</dt>
                  <dd className="text-xs font-semibold text-[var(--color-text-dark)] mt-0.5">Gedung: 262 m² | Halaman: 138 m²</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-text-light)] uppercase font-semibold">Keadaan & Konstruksi</dt>
                  <dd className="text-sm font-semibold text-[var(--color-text-dark)] mt-0.5">Permanen</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-text-light)] uppercase font-semibold">Ketunaan yang Dilayani</dt>
                  <dd className="text-xs font-semibold text-[var(--color-text-dark)] mt-0.5">A, B, C, D, Autis, & Cerebral Palsy</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-text-light)] uppercase font-semibold">Daya Listrik & Air</dt>
                  <dd className="text-sm font-semibold text-[var(--color-text-dark)] mt-0.5">Listrik: 3500 W | Air: PDAM</dd>
                </div>
                <div>
                  <dt className="text-xs text-[var(--color-text-light)] uppercase font-semibold">Koneksi Internet</dt>
                  <dd className="text-sm font-semibold text-[var(--color-text-dark)] mt-0.5">Telkomsel Orbit</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
