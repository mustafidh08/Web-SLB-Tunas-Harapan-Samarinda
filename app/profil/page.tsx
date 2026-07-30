import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { Award, BookOpen, GraduationCap } from "lucide-react";
import KineticText from "@/components/ui/KineticText";
import TiltCard from "@/components/ui/TiltCard";
import ParallaxImage from "@/components/ui/ParallaxImage";
import MagneticButton from "@/components/ui/MagneticButton";

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
      <section className="bg-gradient-to-b from-gray-100 to-white pt-44 md:pt-48 pb-12 border-b border-gray-200 overflow-hidden">
        <div className="container-custom">
          <KineticText
            text="Profil SLB Tunas Harapan"
            as="h1"
            className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-dark)]"
            highlightWords={["SLB", "Tunas", "Harapan"]}
            highlightClass="text-[var(--color-primary)]"
          />
          <p className="text-sm sm:text-base text-[var(--color-text-mid)] mt-2">
            Mengenal lebih dalam sejarah, misi, dan jenjang pendidikan SLB Tunas Harapan Samarinda.
          </p>
        </div>
      </section>

      {/* SEJARAH SEKOLAH WITH PARALLAX */}
      <section className="section-py bg-white overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <ParallaxImage
                src="/images/hero/hero 2.jpeg"
                alt="Lingkungan SLB Tunas Harapan"
                containerClassName="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold tracking-widest text-[var(--color-primary)] uppercase">
                Sejarah Singkat
              </span>
              
              <KineticText
                text="Perjalanan SLB Tunas Harapan"
                as="h2"
                className="text-2xl sm:text-3xl font-bold text-[var(--color-text-dark)]"
                highlightWords={["Tunas", "Harapan"]}
                highlightClass="text-[var(--color-secondary)]"
              />
              
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

      {/* VISI & MISI WITH TILT CARDS */}
      <section className="section-py bg-gray-50 overflow-hidden">
        <div className="container-custom max-w-4xl">
          <SectionTitle
            label="Landasan Kerja"
            title="Visi & Misi Sekolah"
            subtitle="Pedoman kerja utama kami dalam mendampingi tumbuh kembang putra-putri istimewa."
          />

          <div className="space-y-8">
            {/* VISI CARD */}
            <TiltCard glowColor="rgba(204, 31, 42, 0.2)" className="rounded-2xl">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 text-center space-y-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-primary-tint)] text-[var(--color-primary)] text-xl font-bold">
                  V
                </span>
                <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Visi Kami</h3>
                <p className="text-base sm:text-lg italic text-[var(--color-text-dark)] font-medium max-w-2xl mx-auto leading-relaxed">
                  &ldquo;Terwujudnya murid yang bertakwa, kreatif, mandiri dan komunikatif&rdquo;
                </p>
              </div>
            </TiltCard>

            {/* MISI CARD */}
            <TiltCard glowColor="rgba(45, 122, 45, 0.2)" className="rounded-2xl">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-5">
                <div className="text-center space-y-2">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-secondary-tint)] text-[var(--color-secondary)] text-xl font-bold">
                    M
                  </span>
                  <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Misi Kami</h3>
                </div>

                <ul className="space-y-3 text-sm sm:text-base text-[var(--color-text-mid)] leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] mt-2 flex-shrink-0" />
                    <span>Meningkatkan iman dan takwa melalui pembiasaan ibadah dan kegiatan keagamaan yang adaptif.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] mt-2 flex-shrink-0" />
                    <span>Menyelenggarakan pembelajaran berbasis minat dan bakat untuk melatih kreativitas siswa.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] mt-2 flex-shrink-0" />
                    <span>Memberikan pelatihan vokasional berkelanjutan agar siswa memiliki keterampilan hidup mandiri.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] mt-2 flex-shrink-0" />
                    <span>Melatih komunikasi sosial siswa melalui terapi wicara dan interaksi lingkungan ramah.</span>
                  </li>
                </ul>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* JENJANG PENDIDIKAN */}
      <section className="section-py bg-white overflow-hidden">
        <div className="container-custom">
          <SectionTitle
            label="Program Belajar"
            title="Jenjang Pendidikan"
            subtitle="Tiga jenjang pendidikan formal khusus untuk memfasilitasi setiap tahap perkembangan anak."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jenjangPendidikan.map((item, idx) => (
              <TiltCard key={idx} glowColor="rgba(245, 200, 0, 0.25)" className="rounded-2xl h-full">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-[var(--color-text-dark)]">{item.nama}</h3>
                    <p className="text-sm text-[var(--color-text-mid)] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          <div className="text-center mt-10">
            <MagneticButton>
              <Button variant="primary" href="/kontak">
                Konsultasikan Pendaftaran Anak
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
