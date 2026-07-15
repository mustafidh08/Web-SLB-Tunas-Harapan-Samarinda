const fs = require('fs');
const path = require('path');

const GALERI_DIR = path.join(__dirname, 'public', 'images', 'galeri');
const OUTPUT_FILE = path.join(__dirname, 'content', 'data', 'galeri.ts');

const labelKategori = {
  semua: "Semua",
  "ruang-kelas": "Ruang Kelas",
  keterampilan: "Ruang Keterampilan",
  uks: "UKS",
  wc: "WC / Toilet",
  bangunan: "Bangunan & Area Umum",
  kegiatan: "Kegiatan Sekolah",
};

// Custom captions & titles mapping for specific files to keep the details we already verified
const customData = {
  // Ruang Kelas
  "ruang-kelas/r. kelas 1.jpeg": { judul: "Ruang Kelas Adaptif", alt: "Suasana ruang kelas SDLB yang nyaman dan adaptif" },
  "ruang-kelas/r. kelas 2.jpeg": { judul: "Pembelajaran Interaktif", alt: "Pembelajaran tatap muka interaktif bersama guru" },
  "ruang-kelas/r. kelas 3.jpeg": { judul: "Sarana Belajar Bersih", alt: "Meja kursi belajar bersih untuk kenyamanan siswa" },
  "ruang-kelas/r. kelas 4.jpeg": { judul: "Tata Ruang Kondusif", alt: "Ruang kelas dengan dekorasi ramah anak" },
  "ruang-kelas/r. kelas 5.jpeg": { judul: "Fasilitas Belajar Lengkap", alt: "Fasilitas papan tulis dan media pembelajaran di kelas" },

  // Keterampilan
  "keterampilan/R. Tata boga.jpeg": { judul: "Latihan Tata Boga", alt: "Ruang memasak dan latihan tata boga siswa" },
  "keterampilan/R. Terapi.jpeg": { judul: "Ruang Terapi Sensori", alt: "Fasilitas ruang terapi motorik dan sensori" },
  "keterampilan/R. keterampilan kecantikan.jpeg": { judul: "Kelas Keterampilan Kecantikan", alt: "Ruang belajar salon dan tata rias kecantikan" },
  "keterampilan/R. keterampilan kecantikan 2.jpeg": { judul: "Praktek Tata Rias Vokasional", alt: "Fasilitas cermin rias untuk praktek kecantikan" },
  "keterampilan/area bermain.jpeg": { judul: "Area Bermain & Stimulasi", alt: "Area bermain anak di halaman luar" },

  // UKS
  "uks/uks 1.jpeg": { judul: "Ranjang Perawatan UKS", alt: "Tempat tidur perawatan medis darurat di UKS" },
  "uks/uks 2.jpeg": { judul: "Pertolongan Pertama Medis", alt: "Fasilitas medis pertolongan pertama di UKS" },
  "uks/uks 3.jpeg": { judul: "Kotak Obat Lengkap", alt: "Peralatan medis dan kebersihan ruang UKS" },
  "uks/uks 4.jpeg": { judul: "Ruang UKS Terawat", alt: "Tata letak ruang UKS yang bersih dan rapi" },

  // WC
  "wc/Wastavel.jpeg": { judul: "Wastafel Cuci Tangan", alt: "Wastafel cuci tangan dengan cermin dan sabun cair" },
  "wc/wc 1.jpeg": { judul: "Toilet Siswa Higienis", alt: "Toilet duduk bersih dengan lantai keramik yang kering" },
  "wc/wc 2.jpeg": { judul: "Sanitasi Kamar Mandi", alt: "WC dengan pencahayaan dan ventilasi yang memadai" },
  "wc/wc 3.jpeg": { judul: "Sanitasi Ramah Anak", alt: "Kamar mandi sekolah ramah anak berkebutuhan khusus" },

  // Bangunan
  "bangunan/gedung tampak depan.jpg": { judul: "Gedung Tampak Depan", alt: "Tampak depan gedung sekolah SLB Tunas Harapan Samarinda" },
  "bangunan/tampak luar slb.jpeg": { judul: "Tampak Luar SLB", alt: "Kondisi fisik gedung tampak luar SLB Tunas Harapan" },
  "bangunan/gedung belajar.jpeg": { judul: "Gedung Belajar", alt: "Gedung belajar tempat siswa-siswi menuntut ilmu" },
  "bangunan/lorong kelas belajar (Aksesbilitas pintu buka keluar, jendela buka ke atas, handrail, guiding blok).jpeg": { 
    judul: "Lorong Kelas Belajar (Aksesibilitas)", 
    alt: "Aksesibilitas ramah anak: pintu buka keluar, jendela buka ke atas, handrail, dan guiding block" 
  },
  "bangunan/parkiran.jpeg": { judul: "Area Parkir", alt: "Fasilitas area parkir kendaraan sekolah" },
  "bangunan/plang slb.jpeg": { judul: "Papan Nama SLB (Plang)", alt: "Papan identitas resmi SLB Tunas Harapan" },
  "bangunan/jalan akses menuju slb.jpeg": { judul: "Jalan Akses Menuju SLB", alt: "Jalan akses utama menuju lingkungan SLB Tunas Harapan" },

  // Kegiatan (Khusus yang sudah dinamai/dianalisis)
  "kegiatan/kegiatan-1.jpeg": { judul: "Upacara Bendera Khidmat", alt: "Siswa-siswi mengikuti upacara bendera hari Senin dengan khidmat" },
  "kegiatan/WhatsApp Image 2026-07-10 at 12.57.43 PM.jpeg": { judul: "Upacara Hari Besar Pakaian Adat", alt: "Siswa mengenakan pakaian adat saat upacara peringatan hari besar" },
  "kegiatan/WhatsApp Image 2026-07-10 at 12.57.47 PM.jpeg": { judul: "Kegiatan Kokurikuler Luar Kelas", alt: "Guru dan siswa berfoto bersama spanduk Kokurikuler di depan bus wisata" },
  "kegiatan/WhatsApp Image 2026-07-10 at 12.58.40 PM.jpeg": { judul: "Outbound Kokurikuler Alam", alt: "Foto bersama siswa dan guru pendamping kegiatan outbond alam" },
  "kegiatan/WhatsApp Image 2026-07-10 at 12.58.53 PM.jpeg": { judul: "Hari Pendidikan Nasional", alt: "Sambutan guru pada upacara peringatan Hari Pendidikan Nasional" },
  "kegiatan/WhatsApp Image 2026-07-10 at 12.59.00 PM.jpeg": { judul: "Halal Bi Halal MKKS SLB", alt: "Foto bersama kepala sekolah dan guru pada acara Halal bi Halal MKKS" },
  "kegiatan/WhatsApp Image 2026-07-10 at 12.59.19 PM (1).jpeg": { judul: "Kunjungan Pengawas Dinas Pendidikan", alt: "Foto bersama staff sekolah dengan pengawas Dinas Pendidikan" },
  "kegiatan/WhatsApp Image 2026-07-10 at 12.59.35 PM.jpeg": { judul: "Market Day & Vokasional Boga", alt: "Transaksi jual beli makanan hasil karya tata boga siswa" },
  "kegiatan/WhatsApp Image 2026-07-10 at 12.59.31 PM.jpeg": { judul: "Pelatihan Seni Melukis Batik", alt: "Instruktur membimbing siswa melukis motif batik menggunakan canting" },
  "kegiatan/kegiatan-8.jpeg": { judul: "Penerimaan Siswa Baru", alt: "Penyambutan siswa baru pada hari pertama masuk sekolah" },
  "kegiatan/kegiatan-5.jpeg": { judul: "Praktek Seni Rupa Kreatif", alt: "Siswa melukis gambar kreatif menggunakan cat air" },
  "kegiatan/kegiatan-7.jpeg": { judul: "Latihan Pramuka Mandiri", alt: "Kegiatan kepramukaan melatih kemandirian dan kerjasama tim" },
};

// List of generic captions to rotate for unnamed kegiatan files to keep it varied and professional
const kegiatanCaptions = [
  { judul: "Aktivitas Belajar Mandiri", alt: "Siswa-siswi SLB Tunas Harapan belajar mandiri secara aktif di sekolah" },
  { judul: "Latihan Vokasional & Kreativitas", alt: "Pelatihan vokasional untuk membekali kemandirian dan keterampilan siswa" },
  { judul: "Kegiatan Kerjasama & Sosialisasi", alt: "Interaksi edukatif siswa bersama guru dalam membangun kerjasama tim" },
  { judul: "Dokumentasi Pembelajaran Kelas", alt: "Suasana menyenangkan saat sesi pembelajaran tatap muka di kelas" },
  { judul: "Pendidikan Karakter & Disiplin", alt: "Pengembangan kepribadian, kedisiplinan, dan budi pekerti luhur bagi siswa" },
  { judul: "Kegiatan Kreatif Pagi Hari", alt: "Sesi aktivitas jasmani dan motorik di luar kelas sebelum belajar" },
  { judul: "Praktek Kemandirian Harian", alt: "Latihan kemandirian praktis sehari-hari bagi siswa berkebutuhan khusus" },
  { judul: "Pentas Kreasi & Bakat Siswa", alt: "Ekspresi seni dan bakat siswa-siswi SLB Tunas Harapan Samarinda" },
  { judul: "Bimbingan Guru Secara Individual", alt: "Pendampingan khusus secara personal oleh guru terlatih kepada siswa" },
];

function getKegiatanCaption(index) {
  return kegiatanCaptions[index % kegiatanCaptions.length];
}

function run() {
  const folders = fs.readdirSync(GALERI_DIR);
  const dataList = [];

  folders.forEach(folder => {
    const folderPath = path.join(GALERI_DIR, folder);
    if (!fs.statSync(folderPath).isDirectory()) return;

    const files = fs.readdirSync(folderPath);
    let index = 1;

    files.forEach(file => {
      const ext = path.extname(file).toLowerCase();
      if (!['.jpeg', '.jpg', '.png'].includes(ext)) return;

      const relativeKey = `${folder}/${file}`;
      const src = `/images/galeri/${folder}/${file}`;
      const id = `${folder}-${index}`;
      
      let judul = "";
      let alt = "";

      if (customData[relativeKey]) {
        judul = customData[relativeKey].judul;
        alt = customData[relativeKey].alt;
      } else if (folder === 'kegiatan') {
        const fallback = getKegiatanCaption(index);
        // If file has some name clue, we can use it, else round-robin
        judul = fallback.judul;
        alt = fallback.alt;
      } else {
        // Fallback for others
        judul = `${labelKategori[folder]} ${index}`;
        alt = `${labelKategori[folder]} SLB Tunas Harapan`;
      }

      dataList.push({
        id,
        judul,
        kategori: folder,
        src,
        alt
      });

      index++;
    });
  });

  const outputCode = `// content/data/galeri.ts
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

export const dataGaleri: FotoGaleri[] = ${JSON.stringify(dataList, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, outputCode, 'utf8');
  console.log(`Successfully generated gallery data with ${dataList.length} photos!`);
}

run();
