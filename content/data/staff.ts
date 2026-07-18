// content/data/staff.ts
// Data resmi pendidik dan tenaga kependidikan SLB Tunas Harapan

export interface StaffMember {
  id: string;
  nama: string;
  jabatan: string;
  foto: string;
  deskripsi?: string;
  tempatLahir?: string;
  tanggalLahir?: string;
  pendidikan?: string;
  jurusan?: string;
}

export const dataStaff: StaffMember[] = [
  {
    id: "baderi",
    nama: "Baderi, S.Pd",
    jabatan: "Kepala Sekolah",
    foto: "/images/staff/Pak Baderi.png",
    deskripsi: "Kepala Sekolah SLB Tunas Harapan Samarinda yang memimpin dengan visi ketakwaan dan kemandirian bagi murid luar biasa.",
    tempatLahir: "Magetan",
    tanggalLahir: "12 Desember 1965",
    pendidikan: "S1",
    jurusan: "Bahasa dan Seni",
  },
  {
    id: "lilik-farida",
    nama: "Lilik Farida, S.Pd",
    jabatan: "Guru",
    foto: "/images/staff/Bu Lilik.png",
    deskripsi: "Mengajar anak berkebutuhan khusus dengan pendekatan Bahasa dan Seni untuk meningkatkan kreativitas murid.",
    tempatLahir: "Magetan",
    tanggalLahir: "04 April 1968",
    pendidikan: "S1",
    jurusan: "Bahasa dan Seni",
  },
  {
    id: "susilawati",
    nama: "Susilawati, S.Pd",
    jabatan: "Guru",
    foto: "/images/staff/Bu Susi.png",
    deskripsi: "Mendidik dengan mengedepankan pembentukan karakter, moral, dan budi pekerti Pancasila.",
    tempatLahir: "Palaran",
    tanggalLahir: "20 Maret 1988",
    pendidikan: "S1",
    jurusan: "Pendidikan Pancasila",
  },
  {
    id: "rita-masitah",
    nama: "Rita Masitah",
    jabatan: "Guru",
    foto: "/images/staff/Bu Rita.png",
    deskripsi: "Mengampu mata pelajaran sains dan IPA dengan metode pembelajaran adaptif yang menyenangkan.",
    tempatLahir: "Samarinda",
    tanggalLahir: "24 Maret 1979",
    pendidikan: "SMA",
    jurusan: "IPA",
  },
  {
    id: "kamsiah",
    nama: "Kamsiah",
    jabatan: "Bendahara",
    foto: "/images/staff/Mbak Kam.png",
    deskripsi: "Mengelola administrasi keuangan dan operasional yayasan sekolah dengan rapi dan akuntabel.",
    tempatLahir: "Magetan",
    tanggalLahir: "21 November 1985",
    pendidikan: "SMK",
    jurusan: "Perkantoran",
  },
  {
    id: "eka-sari-zuni",
    nama: "Eka Sari Zuni S., A.M.Pust",
    jabatan: "Guru",
    foto: "/images/staff/Bu Yuni.png",
    deskripsi: "Mengembangkan minat baca murid serta mengelola perpustakaan sekolah sebagai pusat literasi inklusif.",
    tempatLahir: "Lamongan",
    tanggalLahir: "5 Juni 1984",
    pendidikan: "D-2",
    jurusan: "Ilmu Perpustakaan",
  },
  {
    id: "carina-nafisah",
    nama: "Carina Nafisah Masturah, S.Psi",
    jabatan: "Guru",
    foto: "/images/staff/Bu Carina.jpeg",
    deskripsi: "Spesialis bimbingan psikologi yang mendampingi tumbuh kembang emosional dan kognitif khusus murid.",
    tempatLahir: "Samarinda",
    tanggalLahir: "11 Agustus 1996",
    pendidikan: "S1",
    jurusan: "Psikologi",
  },
  {
    id: "irma-rahmawati",
    nama: "Irma Rahmawati, S.Pd",
    jabatan: "Guru",
    foto: "/images/staff/Bu Irma.png",
    deskripsi: "Pendidik jenjang PAUD & TKLB yang membimbing dengan kesabaran ekstra dan penuh kasih sayang.",
    tempatLahir: "Ponorogo",
    tanggalLahir: "10 April 1970",
    pendidikan: "S1",
    jurusan: "Paud",
  },
  {
    id: "putri-adistiya",
    nama: "Putri Adistiya, A.Md.Kes",
    jabatan: "Guru",
    foto: "/images/staff/Bu Putri.png",
    deskripsi: "Guru dengan kompetensi medis, mengintegrasikan kesehatan dan bina diri penunjang kemandirian fisik anak.",
    tempatLahir: "Samarinda",
    tanggalLahir: "4 Mei 2002",
    pendidikan: "D-3",
    jurusan: "Teknologi Lab. Medis",
  },
  {
    id: "nor-yakin",
    nama: "Nor Yakin, S.E",
    jabatan: "Guru",
    foto: "/images/staff/Pak Yakin.png",
    deskripsi: "Membekali keterampilan wirausaha dan pemahaman ekonomi praktis kepada murid tingkat SMPLB/SMALB.",
    tempatLahir: "Samarinda",
    tanggalLahir: "31 Januari 1994",
    pendidikan: "S1",
    jurusan: "Ekonomi",
  },
  {
    id: "mochamad-subakti",
    nama: "Mochamad Subakti",
    jabatan: "Guru",
    foto: "/images/staff/Mas Bakti.png",
    deskripsi: "Instruktur Tata Boga yang mengasah bakat kuliner mandiri dan motorik halus anak melalui resep-resep praktis.",
    tempatLahir: "Magetan",
    tanggalLahir: "19 November 1981",
    pendidikan: "SMK",
    jurusan: "Tata Boga",
  },
  {
    id: "umi-yaroh",
    nama: "Umi Yaroh, S.Pd",
    jabatan: "Guru",
    foto: "/images/staff/Bu Umi.png",
    deskripsi: "Mengajar pendidikan IPS dan ekonomi keluarga, memperluas wawasan sosial murid dalam masyarakat.",
    tempatLahir: "Tegal",
    tanggalLahir: "03 Januari 1994",
    pendidikan: "S1",
    jurusan: "Ekonomi",
  },
];
