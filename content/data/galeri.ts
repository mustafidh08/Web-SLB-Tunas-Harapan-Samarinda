// content/data/galeri.ts
// FILE GENERATED AUTOMATICALLY BY SCRIP GENERATOR. DO NOT EDIT DIRECTLY.

export type KategoriGaleri =
  | "semua"
  | "ruang-kelas"
  | "keterampilan"
  | "uks"
  | "wc"
  | "bangunan"
  | "kegiatan";

export interface FotoGaleri {
  id: string;
  judul: string;
  kategori: Exclude<KategoriGaleri, "semua">;
  src: string;
  alt: string;
}

export const labelKategori: Record<KategoriGaleri, string> = {
  semua: "Semua",
  "ruang-kelas": "Ruang Kelas",
  keterampilan: "Ruang Keterampilan",
  uks: "UKS",
  wc: "WC / Toilet",
  bangunan: "Bangunan & Area Umum",
  kegiatan: "Kegiatan Sekolah",
};

export const dataGaleri: FotoGaleri[] = [
  {
    "id": "bangunan-1",
    "judul": "Gedung Belajar",
    "kategori": "bangunan",
    "src": "/images/galeri/bangunan/gedung belajar.jpeg",
    "alt": "Gedung belajar tempat siswa-siswi menuntut ilmu"
  },
  {
    "id": "bangunan-2",
    "judul": "Gedung Tampak Depan",
    "kategori": "bangunan",
    "src": "/images/galeri/bangunan/gedung tampak depan.jpg",
    "alt": "Tampak depan gedung sekolah SLB Tunas Harapan Samarinda"
  },
  {
    "id": "bangunan-3",
    "judul": "Jalan Akses Menuju SLB",
    "kategori": "bangunan",
    "src": "/images/galeri/bangunan/jalan akses menuju slb.jpeg",
    "alt": "Jalan akses utama menuju lingkungan SLB Tunas Harapan"
  },
  {
    "id": "bangunan-4",
    "judul": "Lorong Kelas Belajar (Aksesibilitas)",
    "kategori": "bangunan",
    "src": "/images/galeri/bangunan/lorong kelas belajar (Aksesbilitas pintu buka keluar, jendela buka ke atas, handrail, guiding blok).jpeg",
    "alt": "Aksesibilitas ramah anak: pintu buka keluar, jendela buka ke atas, handrail, dan guiding block"
  },
  {
    "id": "bangunan-5",
    "judul": "Area Parkir",
    "kategori": "bangunan",
    "src": "/images/galeri/bangunan/parkiran.jpeg",
    "alt": "Fasilitas area parkir kendaraan sekolah"
  },
  {
    "id": "bangunan-6",
    "judul": "Papan Nama SLB (Plang)",
    "kategori": "bangunan",
    "src": "/images/galeri/bangunan/plang slb.jpeg",
    "alt": "Papan identitas resmi SLB Tunas Harapan"
  },
  {
    "id": "bangunan-7",
    "judul": "Tampak Luar SLB",
    "kategori": "bangunan",
    "src": "/images/galeri/bangunan/tampak luar slb.jpeg",
    "alt": "Kondisi fisik gedung tampak luar SLB Tunas Harapan"
  },
  {
    "id": "kegiatan-1",
    "judul": "Upacara Bendera Khidmat",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/kegiatan-1.jpeg",
    "alt": "Siswa-siswi mengikuti upacara bendera hari Senin dengan khidmat"
  },
  {
    "id": "kegiatan-2",
    "judul": "Kegiatan Kerjasama & Sosialisasi",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/kegiatan-2.jpeg",
    "alt": "Interaksi edukatif siswa bersama guru dalam membangun kerjasama tim"
  },
  {
    "id": "kegiatan-3",
    "judul": "Praktek Seni Rupa Kreatif",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/kegiatan-5.jpeg",
    "alt": "Siswa melukis gambar kreatif menggunakan cat air"
  },
  {
    "id": "kegiatan-4",
    "judul": "Latihan Pramuka Mandiri",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/kegiatan-7.jpeg",
    "alt": "Kegiatan kepramukaan melatih kemandirian dan kerjasama tim"
  },
  {
    "id": "kegiatan-5",
    "judul": "Penerimaan Siswa Baru",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/kegiatan-8.jpeg",
    "alt": "Penyambutan siswa baru pada hari pertama masuk sekolah"
  },
  {
    "id": "kegiatan-6",
    "judul": "Praktek Kemandirian Harian",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.57.42 PM.jpeg",
    "alt": "Latihan kemandirian praktis sehari-hari bagi siswa berkebutuhan khusus"
  },
  {
    "id": "kegiatan-7",
    "judul": "Pentas Kreasi & Bakat Siswa",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.57.43 PM (1).jpeg",
    "alt": "Ekspresi seni dan bakat siswa-siswi SLB Tunas Harapan Samarinda"
  },
  {
    "id": "kegiatan-8",
    "judul": "Upacara Hari Besar Pakaian Adat",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.57.43 PM.jpeg",
    "alt": "Siswa mengenakan pakaian adat saat upacara peringatan hari besar"
  },
  {
    "id": "kegiatan-9",
    "judul": "Kegiatan Kokurikuler Luar Kelas",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.57.47 PM.jpeg",
    "alt": "Guru dan siswa berfoto bersama spanduk Kokurikuler di depan bus wisata"
  },
  {
    "id": "kegiatan-10",
    "judul": "Latihan Vokasional & Kreativitas",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.38 PM (1).jpeg",
    "alt": "Pelatihan vokasional untuk membekali kemandirian dan keterampilan siswa"
  },
  {
    "id": "kegiatan-11",
    "judul": "Kegiatan Kerjasama & Sosialisasi",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.38 PM.jpeg",
    "alt": "Interaksi edukatif siswa bersama guru dalam membangun kerjasama tim"
  },
  {
    "id": "kegiatan-12",
    "judul": "Dokumentasi Pembelajaran Kelas",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.39 PM.jpeg",
    "alt": "Suasana menyenangkan saat sesi pembelajaran tatap muka di kelas"
  },
  {
    "id": "kegiatan-13",
    "judul": "Outbound Kokurikuler Alam",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.40 PM.jpeg",
    "alt": "Foto bersama siswa dan guru pendamping kegiatan outbond alam"
  },
  {
    "id": "kegiatan-14",
    "judul": "Kegiatan Kreatif Pagi Hari",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.41 PM (1).jpeg",
    "alt": "Sesi aktivitas jasmani dan motorik di luar kelas sebelum belajar"
  },
  {
    "id": "kegiatan-15",
    "judul": "Praktek Kemandirian Harian",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.41 PM.jpeg",
    "alt": "Latihan kemandirian praktis sehari-hari bagi siswa berkebutuhan khusus"
  },
  {
    "id": "kegiatan-16",
    "judul": "Pentas Kreasi & Bakat Siswa",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.42 PM (1).jpeg",
    "alt": "Ekspresi seni dan bakat siswa-siswi SLB Tunas Harapan Samarinda"
  },
  {
    "id": "kegiatan-17",
    "judul": "Bimbingan Guru Secara Individual",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.42 PM.jpeg",
    "alt": "Pendampingan khusus secara personal oleh guru terlatih kepada siswa"
  },
  {
    "id": "kegiatan-18",
    "judul": "Aktivitas Belajar Mandiri",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.43 PM.jpeg",
    "alt": "Siswa-siswi SLB Tunas Harapan belajar mandiri secara aktif di sekolah"
  },
  {
    "id": "kegiatan-19",
    "judul": "Latihan Vokasional & Kreativitas",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.46 PM.jpeg",
    "alt": "Pelatihan vokasional untuk membekali kemandirian dan keterampilan siswa"
  },
  {
    "id": "kegiatan-20",
    "judul": "Kegiatan Kerjasama & Sosialisasi",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.47 PM.jpeg",
    "alt": "Interaksi edukatif siswa bersama guru dalam membangun kerjasama tim"
  },
  {
    "id": "kegiatan-21",
    "judul": "Dokumentasi Pembelajaran Kelas",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.52 PM (1).jpeg",
    "alt": "Suasana menyenangkan saat sesi pembelajaran tatap muka di kelas"
  },
  {
    "id": "kegiatan-22",
    "judul": "Pendidikan Karakter & Disiplin",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.52 PM.jpeg",
    "alt": "Pengembangan kepribadian, kedisiplinan, dan budi pekerti luhur bagi siswa"
  },
  {
    "id": "kegiatan-23",
    "judul": "Kegiatan Kreatif Pagi Hari",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.53 PM (1).jpeg",
    "alt": "Sesi aktivitas jasmani dan motorik di luar kelas sebelum belajar"
  },
  {
    "id": "kegiatan-24",
    "judul": "Hari Pendidikan Nasional",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.53 PM.jpeg",
    "alt": "Sambutan guru pada upacara peringatan Hari Pendidikan Nasional"
  },
  {
    "id": "kegiatan-25",
    "judul": "Pentas Kreasi & Bakat Siswa",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.54 PM (1).jpeg",
    "alt": "Ekspresi seni dan bakat siswa-siswi SLB Tunas Harapan Samarinda"
  },
  {
    "id": "kegiatan-26",
    "judul": "Bimbingan Guru Secara Individual",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.54 PM.jpeg",
    "alt": "Pendampingan khusus secara personal oleh guru terlatih kepada siswa"
  },
  {
    "id": "kegiatan-27",
    "judul": "Aktivitas Belajar Mandiri",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.55 PM (1).jpeg",
    "alt": "Siswa-siswi SLB Tunas Harapan belajar mandiri secara aktif di sekolah"
  },
  {
    "id": "kegiatan-28",
    "judul": "Latihan Vokasional & Kreativitas",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.55 PM.jpeg",
    "alt": "Pelatihan vokasional untuk membekali kemandirian dan keterampilan siswa"
  },
  {
    "id": "kegiatan-29",
    "judul": "Kegiatan Kerjasama & Sosialisasi",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.57 PM.jpeg",
    "alt": "Interaksi edukatif siswa bersama guru dalam membangun kerjasama tim"
  },
  {
    "id": "kegiatan-30",
    "judul": "Dokumentasi Pembelajaran Kelas",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.58 PM.jpeg",
    "alt": "Suasana menyenangkan saat sesi pembelajaran tatap muka di kelas"
  },
  {
    "id": "kegiatan-31",
    "judul": "Pendidikan Karakter & Disiplin",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.59 PM (1).jpeg",
    "alt": "Pengembangan kepribadian, kedisiplinan, dan budi pekerti luhur bagi siswa"
  },
  {
    "id": "kegiatan-32",
    "judul": "Kegiatan Kreatif Pagi Hari",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.58.59 PM.jpeg",
    "alt": "Sesi aktivitas jasmani dan motorik di luar kelas sebelum belajar"
  },
  {
    "id": "kegiatan-33",
    "judul": "Halal Bi Halal MKKS SLB",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.00 PM.jpeg",
    "alt": "Foto bersama kepala sekolah dan guru pada acara Halal bi Halal MKKS"
  },
  {
    "id": "kegiatan-34",
    "judul": "Pentas Kreasi & Bakat Siswa",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.01 PM (1).jpeg",
    "alt": "Ekspresi seni dan bakat siswa-siswi SLB Tunas Harapan Samarinda"
  },
  {
    "id": "kegiatan-35",
    "judul": "Bimbingan Guru Secara Individual",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.01 PM.jpeg",
    "alt": "Pendampingan khusus secara personal oleh guru terlatih kepada siswa"
  },
  {
    "id": "kegiatan-36",
    "judul": "Aktivitas Belajar Mandiri",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.02 PM.jpeg",
    "alt": "Siswa-siswi SLB Tunas Harapan belajar mandiri secara aktif di sekolah"
  },
  {
    "id": "kegiatan-37",
    "judul": "Latihan Vokasional & Kreativitas",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.03 PM (1).jpeg",
    "alt": "Pelatihan vokasional untuk membekali kemandirian dan keterampilan siswa"
  },
  {
    "id": "kegiatan-38",
    "judul": "Kegiatan Kerjasama & Sosialisasi",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.03 PM.jpeg",
    "alt": "Interaksi edukatif siswa bersama guru dalam membangun kerjasama tim"
  },
  {
    "id": "kegiatan-39",
    "judul": "Dokumentasi Pembelajaran Kelas",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.06 PM.jpeg",
    "alt": "Suasana menyenangkan saat sesi pembelajaran tatap muka di kelas"
  },
  {
    "id": "kegiatan-40",
    "judul": "Pendidikan Karakter & Disiplin",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.07 PM (1).jpeg",
    "alt": "Pengembangan kepribadian, kedisiplinan, dan budi pekerti luhur bagi siswa"
  },
  {
    "id": "kegiatan-41",
    "judul": "Kegiatan Kreatif Pagi Hari",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.07 PM.jpeg",
    "alt": "Sesi aktivitas jasmani dan motorik di luar kelas sebelum belajar"
  },
  {
    "id": "kegiatan-42",
    "judul": "Praktek Kemandirian Harian",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.09 PM (2).jpeg",
    "alt": "Latihan kemandirian praktis sehari-hari bagi siswa berkebutuhan khusus"
  },
  {
    "id": "kegiatan-43",
    "judul": "Pentas Kreasi & Bakat Siswa",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.09 PM.jpeg",
    "alt": "Ekspresi seni dan bakat siswa-siswi SLB Tunas Harapan Samarinda"
  },
  {
    "id": "kegiatan-44",
    "judul": "Bimbingan Guru Secara Individual",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.10 PM.jpeg",
    "alt": "Pendampingan khusus secara personal oleh guru terlatih kepada siswa"
  },
  {
    "id": "kegiatan-45",
    "judul": "Aktivitas Belajar Mandiri",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.12 PM (1).jpeg",
    "alt": "Siswa-siswi SLB Tunas Harapan belajar mandiri secara aktif di sekolah"
  },
  {
    "id": "kegiatan-46",
    "judul": "Latihan Vokasional & Kreativitas",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.12 PM.jpeg",
    "alt": "Pelatihan vokasional untuk membekali kemandirian dan keterampilan siswa"
  },
  {
    "id": "kegiatan-47",
    "judul": "Kunjungan Pengawas Dinas Pendidikan",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.19 PM (1).jpeg",
    "alt": "Foto bersama staff sekolah dengan pengawas Dinas Pendidikan"
  },
  {
    "id": "kegiatan-48",
    "judul": "Dokumentasi Pembelajaran Kelas",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.19 PM (2).jpeg",
    "alt": "Suasana menyenangkan saat sesi pembelajaran tatap muka di kelas"
  },
  {
    "id": "kegiatan-49",
    "judul": "Pendidikan Karakter & Disiplin",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.20 PM (1).jpeg",
    "alt": "Pengembangan kepribadian, kedisiplinan, dan budi pekerti luhur bagi siswa"
  },
  {
    "id": "kegiatan-50",
    "judul": "Kegiatan Kreatif Pagi Hari",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.20 PM.jpeg",
    "alt": "Sesi aktivitas jasmani dan motorik di luar kelas sebelum belajar"
  },
  {
    "id": "kegiatan-51",
    "judul": "Praktek Kemandirian Harian",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.25 PM.jpeg",
    "alt": "Latihan kemandirian praktis sehari-hari bagi siswa berkebutuhan khusus"
  },
  {
    "id": "kegiatan-52",
    "judul": "Pentas Kreasi & Bakat Siswa",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.26 PM (1).jpeg",
    "alt": "Ekspresi seni dan bakat siswa-siswi SLB Tunas Harapan Samarinda"
  },
  {
    "id": "kegiatan-53",
    "judul": "Bimbingan Guru Secara Individual",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.26 PM.jpeg",
    "alt": "Pendampingan khusus secara personal oleh guru terlatih kepada siswa"
  },
  {
    "id": "kegiatan-54",
    "judul": "Aktivitas Belajar Mandiri",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.27 PM.jpeg",
    "alt": "Siswa-siswi SLB Tunas Harapan belajar mandiri secara aktif di sekolah"
  },
  {
    "id": "kegiatan-55",
    "judul": "Latihan Vokasional & Kreativitas",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.28 PM.jpeg",
    "alt": "Pelatihan vokasional untuk membekali kemandirian dan keterampilan siswa"
  },
  {
    "id": "kegiatan-56",
    "judul": "Kegiatan Kerjasama & Sosialisasi",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.30 PM.jpeg",
    "alt": "Interaksi edukatif siswa bersama guru dalam membangun kerjasama tim"
  },
  {
    "id": "kegiatan-57",
    "judul": "Pelatihan Seni Melukis Batik",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.31 PM.jpeg",
    "alt": "Instruktur membimbing siswa melukis motif batik menggunakan canting"
  },
  {
    "id": "kegiatan-58",
    "judul": "Pendidikan Karakter & Disiplin",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.32 PM.jpeg",
    "alt": "Pengembangan kepribadian, kedisiplinan, dan budi pekerti luhur bagi siswa"
  },
  {
    "id": "kegiatan-59",
    "judul": "Kegiatan Kreatif Pagi Hari",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.34 PM.jpeg",
    "alt": "Sesi aktivitas jasmani dan motorik di luar kelas sebelum belajar"
  },
  {
    "id": "kegiatan-60",
    "judul": "Praktek Kemandirian Harian",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.35 PM (1).jpeg",
    "alt": "Latihan kemandirian praktis sehari-hari bagi siswa berkebutuhan khusus"
  },
  {
    "id": "kegiatan-61",
    "judul": "Market Day & Vokasional Boga",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.35 PM.jpeg",
    "alt": "Transaksi jual beli makanan hasil karya tata boga siswa"
  },
  {
    "id": "kegiatan-62",
    "judul": "Bimbingan Guru Secara Individual",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.36 PM (1).jpeg",
    "alt": "Pendampingan khusus secara personal oleh guru terlatih kepada siswa"
  },
  {
    "id": "kegiatan-63",
    "judul": "Aktivitas Belajar Mandiri",
    "kategori": "kegiatan",
    "src": "/images/galeri/kegiatan/WhatsApp Image 2026-07-10 at 12.59.36 PM.jpeg",
    "alt": "Siswa-siswi SLB Tunas Harapan belajar mandiri secara aktif di sekolah"
  },
  {
    "id": "keterampilan-1",
    "judul": "Area Bermain & Stimulasi",
    "kategori": "keterampilan",
    "src": "/images/galeri/keterampilan/area bermain.jpeg",
    "alt": "Area bermain anak di halaman luar"
  },
  {
    "id": "keterampilan-2",
    "judul": "Praktek Tata Rias Vokasional",
    "kategori": "keterampilan",
    "src": "/images/galeri/keterampilan/R. keterampilan kecantikan 2.jpeg",
    "alt": "Fasilitas cermin rias untuk praktek kecantikan"
  },
  {
    "id": "keterampilan-3",
    "judul": "Kelas Keterampilan Kecantikan",
    "kategori": "keterampilan",
    "src": "/images/galeri/keterampilan/R. keterampilan kecantikan.jpeg",
    "alt": "Ruang belajar salon dan tata rias kecantikan"
  },
  {
    "id": "keterampilan-4",
    "judul": "Latihan Tata Boga",
    "kategori": "keterampilan",
    "src": "/images/galeri/keterampilan/R. Tata boga.jpeg",
    "alt": "Ruang memasak dan latihan tata boga siswa"
  },
  {
    "id": "keterampilan-5",
    "judul": "Ruang Terapi Sensori",
    "kategori": "keterampilan",
    "src": "/images/galeri/keterampilan/R. Terapi.jpeg",
    "alt": "Fasilitas ruang terapi motorik dan sensori"
  },
  {
    "id": "ruang-kelas-1",
    "judul": "Ruang Kelas Adaptif",
    "kategori": "ruang-kelas",
    "src": "/images/galeri/ruang-kelas/r. kelas 1.jpeg",
    "alt": "Suasana ruang kelas SDLB yang nyaman dan adaptif"
  },
  {
    "id": "ruang-kelas-2",
    "judul": "Pembelajaran Interaktif",
    "kategori": "ruang-kelas",
    "src": "/images/galeri/ruang-kelas/r. kelas 2.jpeg",
    "alt": "Pembelajaran tatap muka interaktif bersama guru"
  },
  {
    "id": "ruang-kelas-3",
    "judul": "Sarana Belajar Bersih",
    "kategori": "ruang-kelas",
    "src": "/images/galeri/ruang-kelas/r. kelas 3.jpeg",
    "alt": "Meja kursi belajar bersih untuk kenyamanan siswa"
  },
  {
    "id": "ruang-kelas-4",
    "judul": "Tata Ruang Kondusif",
    "kategori": "ruang-kelas",
    "src": "/images/galeri/ruang-kelas/r. kelas 4.jpeg",
    "alt": "Ruang kelas dengan dekorasi ramah anak"
  },
  {
    "id": "ruang-kelas-5",
    "judul": "Fasilitas Belajar Lengkap",
    "kategori": "ruang-kelas",
    "src": "/images/galeri/ruang-kelas/r. kelas 5.jpeg",
    "alt": "Fasilitas papan tulis dan media pembelajaran di kelas"
  },
  {
    "id": "uks-1",
    "judul": "Ranjang Perawatan UKS",
    "kategori": "uks",
    "src": "/images/galeri/uks/uks 1.jpeg",
    "alt": "Tempat tidur perawatan medis darurat di UKS"
  },
  {
    "id": "uks-2",
    "judul": "Pertolongan Pertama Medis",
    "kategori": "uks",
    "src": "/images/galeri/uks/uks 2.jpeg",
    "alt": "Fasilitas medis pertolongan pertama di UKS"
  },
  {
    "id": "uks-3",
    "judul": "Kotak Obat Lengkap",
    "kategori": "uks",
    "src": "/images/galeri/uks/uks 3.jpeg",
    "alt": "Peralatan medis dan kebersihan ruang UKS"
  },
  {
    "id": "uks-4",
    "judul": "Ruang UKS Terawat",
    "kategori": "uks",
    "src": "/images/galeri/uks/uks 4.jpeg",
    "alt": "Tata letak ruang UKS yang bersih dan rapi"
  },
  {
    "id": "wc-1",
    "judul": "Wastafel Cuci Tangan",
    "kategori": "wc",
    "src": "/images/galeri/wc/Wastavel.jpeg",
    "alt": "Wastafel cuci tangan dengan cermin dan sabun cair"
  },
  {
    "id": "wc-2",
    "judul": "Toilet Siswa Higienis",
    "kategori": "wc",
    "src": "/images/galeri/wc/wc 1.jpeg",
    "alt": "Toilet duduk bersih dengan lantai keramik yang kering"
  },
  {
    "id": "wc-3",
    "judul": "Sanitasi Kamar Mandi",
    "kategori": "wc",
    "src": "/images/galeri/wc/wc 2.jpeg",
    "alt": "WC dengan pencahayaan dan ventilasi yang memadai"
  },
  {
    "id": "wc-4",
    "judul": "Sanitasi Ramah Anak",
    "kategori": "wc",
    "src": "/images/galeri/wc/wc 3.jpeg",
    "alt": "Kamar mandi sekolah ramah anak berkebutuhan khusus"
  }
];
