// content/data/faqs.ts
// Data FAQ seputar pendaftaran SLB Tunas Harapan
// Ganti dengan konten asli saat tersedia

export interface FAQItem {
  id: string;
  pertanyaan: string;
  jawaban: string;
  kategori?: string;
}

export const dataFAQs: FAQItem[] = [
  {
    id: "faq-1",
    pertanyaan: "Apa itu SLB Tunas Harapan?",
    jawaban:
      "SLB Tunas Harapan adalah Sekolah Luar Biasa yang berlokasi di Palaran, Samarinda, Kalimantan Timur. Sekolah ini didedikasikan untuk memberikan pendidikan berkualitas bagi anak-anak berkebutuhan khusus, mencakup jenjang SDLB, SMPLB, hingga SMALB.",
    kategori: "Umum",
  },
  {
    id: "faq-2",
    pertanyaan: "Jenjang pendidikan apa saja yang tersedia di SLB Tunas Harapan?",
    jawaban:
      "SLB Tunas Harapan menyediakan tiga jenjang pendidikan resmi: (1) SDLB (Sekolah Dasar Luar Biasa), (2) SMPLB (Sekolah Menengah Pertama Luar Biasa), dan (3) SMALB (Sekolah Menengah Atas Luar Biasa). Setiap jenjang dirancang khusus sesuai kebutuhan dan kemampuan peserta didik.",
    kategori: "Akademik",
  },
  {
    id: "faq-3",
    pertanyaan: "Siapa saja yang bisa mendaftar ke SLB Tunas Harapan?",
    jawaban:
      "SLB Tunas Harapan menerima anak-anak berkebutuhan khusus dengan berbagai kondisi, termasuk anak dengan hambatan penglihatan (tunanetra), hambatan pendengaran (tunarungu), hambatan intelektual (tunagrahita), hambatan fisik (tunadaksa), dan hambatan ganda. Usia masuk disesuaikan dengan jenjang yang dipilih.",
    kategori: "Pendaftaran",
  },
  {
    id: "faq-4",
    pertanyaan: "Bagaimana cara mendaftar ke SLB Tunas Harapan?",
    jawaban:
      "Proses pendaftaran dapat dilakukan dengan mengunjungi sekolah langsung di Jl. Palaran, Samarinda, Kalimantan Timur. Calon orang tua/wali murid dapat berkonsultasi terlebih dahulu dengan pihak sekolah sebelum mendaftar. Hubungi kami melalui nomor telepon atau WhatsApp yang tersedia di halaman Kontak untuk membuat janji kunjungan.",
    kategori: "Pendaftaran",
  },
  {
    id: "faq-5",
    pertanyaan: "Dokumen apa saja yang diperlukan saat pendaftaran?",
    jawaban:
      "Dokumen yang perlu disiapkan antara lain: (1) Kartu Keluarga (KK), (2) Akta Kelahiran, (3) Surat keterangan dari dokter atau psikolog mengenai kondisi anak (jika ada), (4) Foto anak terbaru, dan (5) Pas foto orang tua/wali. Untuk informasi lebih lanjut, silakan hubungi pihak sekolah.",
    kategori: "Pendaftaran",
  },
  {
    id: "faq-6",
    pertanyaan: "Apakah ada biaya sekolah di SLB Tunas Harapan?",
    jawaban:
      "Informasi mengenai biaya sekolah dapat dikonsultasikan langsung dengan pihak sekolah. Silakan hubungi kami melalui halaman Kontak untuk mendapatkan informasi terkini mengenai biaya dan kemungkinan bantuan yang tersedia.",
    kategori: "Biaya",
  },
  {
    id: "faq-7",
    pertanyaan: "Apa saja fasilitas yang tersedia di SLB Tunas Harapan?",
    jawaban:
      "SLB Tunas Harapan memiliki berbagai fasilitas pendukung pendidikan, antara lain: ruang kelas yang nyaman, ruang keterampilan (untuk pelatihan vokasional), Unit Kesehatan Sekolah (UKS), fasilitas toilet yang bersih, halaman sekolah yang luas, serta lingkungan belajar yang aman dan ramah anak.",
    kategori: "Fasilitas",
  },
  {
    id: "faq-8",
    pertanyaan: "Bagaimana jam operasional sekolah?",
    jawaban:
      "SLB Tunas Harapan beroperasi pada Senin sampai Sabtu, pukul 07.30 – 12.30 WITA. Untuk informasi lebih detail tentang jadwal, silakan hubungi pihak sekolah karena jadwal dapat berubah sewaktu-waktu sesuai kalender akademik.",
    kategori: "Operasional",
  },
  {
    id: "faq-9",
    pertanyaan: "Apakah ada program keterampilan atau vokasional untuk siswa?",
    jawaban:
      "Ya, SLB Tunas Harapan menyediakan program keterampilan dan pelatihan vokasional bagi siswa, terutama di jenjang SMPLB. Program ini dirancang untuk membantu siswa mengembangkan kemampuan praktis yang dapat berguna bagi kemandirian mereka di kehidupan sehari-hari dan dunia kerja.",
    kategori: "Akademik",
  },
  {
    id: "faq-10",
    pertanyaan: "Bagaimana cara menghubungi SLB Tunas Harapan?",
    jawaban:
      "Anda dapat menghubungi SLB Tunas Harapan melalui: (1) WhatsApp/Telepon di nomor yang tersedia di halaman Kontak, (2) Kunjungan langsung ke sekolah pada jam operasional, atau (3) Mengisi formulir kontak di halaman Kontak website ini. Tim kami akan merespons secepatnya.",
    kategori: "Kontak",
  },
];
