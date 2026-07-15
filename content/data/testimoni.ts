// content/data/testimoni.ts
// Data dummy testimoni orang tua murid
// Ganti dengan testimoni asli saat tersedia

export interface Testimoni {
  id: string;
  nama: string;
  peran: string;
  isi: string;
  foto?: string;
  anakJenjang?: string;
}

export const dataTestimoni: Testimoni[] = [
  {
    id: "testimoni-1",
    nama: "Ibu Sari Wulandari",
    peran: "Orang Tua Murid",
    anakJenjang: "SDLB",
    isi: "Anak saya sangat berkembang sejak bersekolah di SLB Tunas Harapan. Para guru sangat sabar dan penuh perhatian. Fasilitas sekolahnya juga bersih dan nyaman. Saya sangat bersyukur menemukan sekolah ini.",
  },
  {
    id: "testimoni-2",
    nama: "Bapak Eko Prasetyo",
    peran: "Orang Tua Murid",
    anakJenjang: "SMPLB",
    isi: "Alhamdulillah, anak saya sekarang sudah bisa lebih mandiri dan percaya diri. Program keterampilan di sini benar-benar membantu anak saya untuk bisa mengerjakan banyak hal sendiri. Terima kasih SLB Tunas Harapan.",
  },
  {
    id: "testimoni-3",
    nama: "Ibu Dewi Anggraini",
    peran: "Orang Tua Murid",
    anakJenjang: "TKLB",
    isi: "Sejak masuk SLB Tunas Harapan, anak saya yang awalnya pemalu dan susah bersosialisasi sekarang sudah mulai mau berinteraksi dengan teman-temannya. Metode pengajaran di sini sangat sesuai untuk anak saya.",
  },
];
