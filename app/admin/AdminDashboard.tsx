"use client";

import { useState, useEffect } from "react";
import { 
  Key, 
  Newspaper, 
  Image as ImageIcon, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Settings, 
  FileText, 
  Edit3, 
  Trash2, 
  X, 
  Plus,
  HelpCircle,
  Search,
  ExternalLink,
  Eye,
  EyeOff,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download
} from "lucide-react";
import { convertAndCompressToWebP } from "@/lib/imageCompressor";

interface KegiatanPost {
  slug: string;
  judul: string;
  tanggal: string;
  ringkasan: string;
  gambarCover: string;
}

interface FotoGaleriItem {
  id: string;
  judul: string;
  kategori: string;
  src: string;
  alt: string;
}

interface TransaksiItem {
  id: string;
  tanggal: string;
  uraian: string;
  kategori: string;
  tipe: "pemasukan" | "pengeluaran";
  nominal: number;
  buktiUrl?: string;
}

interface LaporanDokumenItem {
  id: string;
  judul: string;
  periode: string;
  fileUrl: string;
  tanggalUpload: string;
}

export default function AdminDashboard() {
  // State Autentikasi Admin & Tab Active
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"kegiatan" | "galeri" | "keuangan" | "pengaturan">("kegiatan");
  const [githubToken, setGithubToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("slb_github_token") || "";
    }
    return "";
  });

  // Data List & Search
  const [kegiatanList, setKegiatanList] = useState<KegiatanPost[]>([]);
  const [galeriList, setGaleriList] = useState<FotoGaleriItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // State Form Kegiatan (Create / Edit)
  const [isEditingKegiatan, setIsEditingKegiatan] = useState(false);
  const [editingSlug, setEditingSlug] = useState("");
  const [judulKegiatan, setJudulKegiatan] = useState("");
  const [tanggalKegiatan, setTanggalKegiatan] = useState(() => new Date().toISOString().split("T")[0]);
  const [ringkasanKegiatan, setRingkasanKegiatan] = useState("");
  const [kontenKegiatan, setKontenKegiatan] = useState("");
  const [gambarCoverBase64, setGambarCoverBase64] = useState("");
  const [previewCover, setPreviewCover] = useState("");
  const [submittingKegiatan, setSubmittingKegiatan] = useState(false);
  const [msgKegiatan, setMsgKegiatan] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // State Form Galeri (Create / Edit)
  const [isEditingGaleri, setIsEditingGaleri] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState("");
  const [judulFoto, setJudulFoto] = useState("");
  const [kategoriFoto, setKategoriFoto] = useState<string>("kegiatan");
  const [altFoto, setAltFoto] = useState("");
  const [gambarGaleriBase64, setGambarGaleriBase64] = useState("");
  const [previewGaleri, setPreviewGaleri] = useState("");
  const [submittingGaleri, setSubmittingGaleri] = useState(false);
  const [msgGaleri, setMsgGaleri] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // State Form & Data Keuangan
  const [keuanganData, setKeuanganData] = useState<{
    ringkasan: { totalPemasukan: number; totalPengeluaran: number; saldoKas: number; terakhirDiperbarui: string };
    transaksi: TransaksiItem[];
    laporanDokumen: LaporanDokumenItem[];
  }>({
    ringkasan: { totalPemasukan: 0, totalPengeluaran: 0, saldoKas: 0, terakhirDiperbarui: "" },
    transaksi: [],
    laporanDokumen: [],
  });

  // State Form & Edit Transaksi Keuangan
  const [isEditingTrx, setIsEditingTrx] = useState(false);
  const [editingTrxId, setEditingTrxId] = useState("");
  const [tanggalTrx, setTanggalTrx] = useState(() => new Date().toISOString().split("T")[0]);
  const [uraianTrx, setUraianTrx] = useState("");
  const [kategoriTrx, setKategoriTrx] = useState("Pengadaan Alat Peraga Edukatif (APE) & Sensori Terapi");
  const [tipeTrx, setTipeTrx] = useState<"pengeluaran" | "pemasukan">("pengeluaran");
  const [nominalTrx, setNominalTrx] = useState("");

  // State Form & Edit Dokumen Laporan Keuangan
  const [isEditingDoc, setIsEditingDoc] = useState(false);
  const [editingDocId, setEditingDocId] = useState("");
  const [judulDoc, setJudulDoc] = useState("");
  const [periodeDoc, setPeriodeDoc] = useState("");
  const [docOption, setDocOption] = useState<"upload" | "link">("link");
  const [fileUrlDoc, setFileUrlDoc] = useState("");
  const [docFileBase64, setDocFileBase64] = useState("");
  const [docFileName, setDocFileName] = useState("");

  const [submittingKeuangan, setSubmittingKeuangan] = useState(false);
  const [msgKeuangan, setMsgKeuangan] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const resetFormTrx = () => {
    setIsEditingTrx(false);
    setEditingTrxId("");
    setTanggalTrx(new Date().toISOString().split("T")[0]);
    setUraianTrx("");
    setNominalTrx("");
    setKategoriTrx("Pengadaan Alat Peraga Edukatif (APE) & Sensori Terapi");
    setTipeTrx("pengeluaran");
  };

  const resetFormDoc = () => {
    setIsEditingDoc(false);
    setEditingDocId("");
    setJudulDoc("");
    setPeriodeDoc("");
    setFileUrlDoc("");
    setDocFileBase64("");
    setDocFileName("");
    setDocOption("link");
  };

  const handleEditTransaksi = (trx: TransaksiItem) => {
    setIsEditingTrx(true);
    setEditingTrxId(trx.id);
    setTanggalTrx(trx.tanggal);
    setUraianTrx(trx.uraian);
    setKategoriTrx(trx.kategori);
    setTipeTrx(trx.tipe);
    setNominalTrx(String(trx.nominal));
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleEditDokumen = (doc: LaporanDokumenItem) => {
    setIsEditingDoc(true);
    setEditingDocId(doc.id);
    setJudulDoc(doc.judul);
    setPeriodeDoc(doc.periode);
    setFileUrlDoc(doc.fileUrl);
    setDocOption("link");
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  const handleDocFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const result = evt.target?.result as string;
      setDocFileBase64(result);
    };
    reader.readAsDataURL(file);
  };

  // State Setting & Token
  const [msgToken, setMsgToken] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Check HttpOnly Cookie Session dari Server
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/login");
        const data = await res.json();
        if (data.success && data.isLoggedIn) {
          setIsLoggedIn(true);
        }
      } catch {
        // Ignore
      }
    };
    checkSession();
  }, []);

  // Fetch Data List Berita, Galeri & Keuangan
  const fetchKegiatanList = async () => {
    try {
      const res = await fetch("/api/admin/kegiatan");
      const data = await res.json();
      if (data.success) {
        setKegiatanList(data.posts || []);
      }
    } catch {
      console.error("Gagal load kegiatan list");
    }
  };

  const fetchGaleriList = async () => {
    try {
      const res = await fetch("/api/admin/galeri");
      const data = await res.json();
      if (data.success) {
        setGaleriList(data.photos || []);
      }
    } catch {
      console.error("Gagal load galeri list");
    }
  };

  const fetchKeuanganList = async () => {
    try {
      const res = await fetch("/api/admin/keuangan");
      const data = await res.json();
      if (data.success && data.data) {
        setKeuanganData(data.data);
      }
    } catch {
      console.error("Gagal load data keuangan");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchKegiatanList();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchGaleriList();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchKeuanganList();
    }
  }, [isLoggedIn]);

  // Handler Simpan Transaksi Keuangan (Create / Edit)
  const handleSaveTransaksi = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingKeuangan(true);
    setMsgKeuangan(null);

    try {
      const res = await fetch("/api/admin/keuangan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isEditingTrx ? "EDIT_TRANSAKSI" : "ADD_TRANSAKSI",
          password: passwordInput || "slbtunasharapan",
          githubToken,
          transaksiData: {
            id: isEditingTrx ? editingTrxId : undefined,
            tanggal: tanggalTrx,
            uraian: uraianTrx,
            kategori: kategoriTrx,
            tipe: tipeTrx,
            nominal: Number(nominalTrx) || 0,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMsgKeuangan({ type: "success", text: isEditingTrx ? "Transaksi keuangan berhasil diperbarui!" : "Transaksi keuangan berhasil ditambahkan!" });
        resetFormTrx();
        fetchKeuanganList();
      } else {
        setMsgKeuangan({ type: "error", text: data.message || "Gagal menyimpan transaksi" });
      }
    } catch {
      setMsgKeuangan({ type: "error", text: "Terjadi kesalahan server saat menyimpan transaksi." });
    } finally {
      setSubmittingKeuangan(false);
    }
  };

  // Handler Simpan Dokumen Laporan Keuangan (Create / Edit, Upload / Link)
  const handleSaveDokumen = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingKeuangan(true);
    setMsgKeuangan(null);

    try {
      const res = await fetch("/api/admin/keuangan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isEditingDoc ? "EDIT_DOKUMEN" : "ADD_DOKUMEN",
          password: passwordInput || "slbtunasharapan",
          githubToken,
          dokumenData: {
            id: isEditingDoc ? editingDocId : undefined,
            judul: judulDoc,
            periode: periodeDoc,
            fileUrl: docOption === "link" ? fileUrlDoc : undefined,
            fileBase64: docOption === "upload" ? docFileBase64 : undefined,
            fileName: docOption === "upload" ? docFileName : undefined,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMsgKeuangan({ type: "success", text: isEditingDoc ? "Dokumen laporan resmi berhasil diperbarui!" : "Dokumen laporan resmi berhasil dipublikasikan!" });
        resetFormDoc();
        fetchKeuanganList();
      } else {
        setMsgKeuangan({ type: "error", text: data.message || "Gagal menyimpan berkas laporan" });
      }
    } catch {
      setMsgKeuangan({ type: "error", text: "Terjadi kesalahan server saat menyimpan berkas." });
    } finally {
      setSubmittingKeuangan(false);
    }
  };

  // Handler Hapus Transaksi / Dokumen
  const handleDeleteKeuangan = async (id: string, type: "TRANSAKSI" | "DOKUMEN", label: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus ${type.toLowerCase()} "${label}"?`)) return;

    try {
      const res = await fetch("/api/admin/keuangan", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          type,
          password: passwordInput || "slbtunasharapan",
          githubToken,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message);
        fetchKeuanganList();
      } else {
        alert(data.message || "Gagal menghapus catatan");
      }
    } catch {
      alert("Terjadi kesalahan server saat menghapus catatan.");
    }
  };

  // Handler Login Admin
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();

      if (data.success) {
        setIsLoggedIn(true);
      } else {
        setLoginError(data.message || "Password salah!");
      }
    } catch {
      setLoginError("Terjadi kesalahan koneksi!");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
    } catch {
      // Ignore
    }
    setIsLoggedIn(false);
  };

  // Convert File to Base64 & WebP format
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, isGaleri = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Mengompres & mengonversi foto otomatis ke format WebP di browser
      const { base64 } = await convertAndCompressToWebP(file, 1600, 1600, 0.82);

      if (isGaleri) {
        setGambarGaleriBase64(base64);
        setPreviewGaleri(base64);
      } else {
        setGambarCoverBase64(base64);
        setPreviewCover(base64);
      }
    } catch {
      alert("Gagal mengompres gambar. Coba pilih file gambar lain.");
    }
  };

  // Reset Form Kegiatan
  const resetFormKegiatan = () => {
    setIsEditingKegiatan(false);
    setEditingSlug("");
    setJudulKegiatan("");
    setTanggalKegiatan(new Date().toISOString().split("T")[0]);
    setRingkasanKegiatan("");
    setKontenKegiatan("");
    setGambarCoverBase64("");
    setPreviewCover("");
  };

  // Populate Edit Kegiatan
  const handleEditKegiatan = (post: KegiatanPost) => {
    setIsEditingKegiatan(true);
    setEditingSlug(post.slug);
    setJudulKegiatan(post.judul);
    setTanggalKegiatan(post.tanggal);
    setRingkasanKegiatan(post.ringkasan);
    setKontenKegiatan(post.ringkasan); // Fallback ringkasan sebagai konten jika awal
    setPreviewCover(post.gambarCover);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Delete Kegiatan
  const handleDeleteKegiatan = async (slug: string, judul: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus berita "${judul}"?`)) return;

    try {
      const res = await fetch("/api/admin/kegiatan", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          githubToken,
          password: passwordInput || "slbtunasharapan",
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message);
        fetchKegiatanList();
      } else {
        alert(data.message || "Gagal menghapus berita");
      }
    } catch {
      alert("Terjadi kesalahan saat menghapus berita.");
    }
  };

  // Submit Form Kegiatan (Create / Update)
  const handleSubmitKegiatan = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingKegiatan(true);
    setMsgKegiatan(null);

    try {
      const res = await fetch("/api/admin/kegiatan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          judul: judulKegiatan,
          tanggal: tanggalKegiatan,
          ringkasan: ringkasanKegiatan,
          konten: kontenKegiatan,
          gambarCoverBase64,
          githubToken,
          password: passwordInput || "slbtunasharapan",
          isEdit: isEditingKegiatan,
          oldSlug: editingSlug,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMsgKegiatan({ type: "success", text: data.message });
        resetFormKegiatan();
        fetchKegiatanList();
      } else {
        setMsgKegiatan({ type: "error", text: data.message || "Gagal menyimpan berita" });
      }
    } catch {
      setMsgKegiatan({ type: "error", text: "Terjadi kesalahan server saat menyimpan berita." });
    } finally {
      setSubmittingKegiatan(false);
    }
  };

  // Reset Form Galeri
  const resetFormGaleri = () => {
    setIsEditingGaleri(false);
    setEditingPhotoId("");
    setJudulFoto("");
    setAltFoto("");
    setGambarGaleriBase64("");
    setPreviewGaleri("");
  };

  // Populate Edit Galeri
  const handleEditGaleri = (photo: FotoGaleriItem) => {
    setIsEditingGaleri(true);
    setEditingPhotoId(photo.id);
    setJudulFoto(photo.judul);
    setKategoriFoto(photo.kategori);
    setAltFoto(photo.alt);
    setPreviewGaleri(photo.src);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Delete Galeri
  const handleDeleteGaleri = async (photoId: string, judul: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus foto "${judul}" dari galeri?`)) return;

    try {
      const res = await fetch("/api/admin/galeri", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photoId,
          githubToken,
          password: passwordInput || "slbtunasharapan",
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message);
        fetchGaleriList();
      } else {
        alert(data.message || "Gagal menghapus foto");
      }
    } catch {
      alert("Terjadi kesalahan saat menghapus foto.");
    }
  };

  // Submit Form Galeri (Create / Update)
  const handleSubmitGaleri = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingGaleri(true);
    setMsgGaleri(null);

    try {
      const res = await fetch("/api/admin/galeri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          judul: judulFoto,
          kategori: kategoriFoto,
          alt: altFoto || judulFoto,
          gambarBase64: gambarGaleriBase64,
          githubToken,
          password: passwordInput || "slbtunasharapan",
          isEdit: isEditingGaleri,
          photoId: editingPhotoId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMsgGaleri({ type: "success", text: data.message });
        resetFormGaleri();
        fetchGaleriList();
      } else {
        setMsgGaleri({ type: "error", text: data.message || "Gagal menyimpan foto galeri" });
      }
    } catch {
      setMsgGaleri({ type: "error", text: "Terjadi kesalahan server saat menyimpan foto." });
    } finally {
      setSubmittingGaleri(false);
    }
  };

  // Save GitHub Token di localStorage
  const handleSaveToken = (token: string) => {
    setGithubToken(token);
    localStorage.setItem("slb_github_token", token);
  };

  // Filtered Lists
  const filteredKegiatan = kegiatanList.filter((k) =>
    k.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.ringkasan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGaleri = galeriList.filter((g) =>
    g.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // IF NOT LOGGED IN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-[#0B0F17] flex items-center justify-center p-4 pt-40 pb-20 transition-colors duration-300">
        <div className="bg-white dark:bg-[#161F2E] p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-[#222F43] max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-[var(--color-primary-tint)] text-[var(--color-primary)] rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Key size={32} />
            </div>
            <h1 className="text-2xl font-extrabold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
              Admin Panel SLB Tunas Harapan
            </h1>
            <p className="text-xs text-[var(--color-text-mid)]">
              Masukkan password pengelola untuk menambah, mengubah (edit), dan menghapus berita serta foto galeri.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="passInput" className="block text-xs font-bold text-[var(--color-text-dark)] mb-1">
                Password Admin
              </label>
              <div className="relative">
                <input
                  id="passInput"
                  type={showPassword ? "text" : "password"}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Masukkan password admin..."
                  className="w-full pl-4 pr-11 py-3 text-sm border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 p-0.5 rounded-lg transition-colors cursor-pointer"
                  title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-xs space-y-1.5 border border-red-200">
                <div className="flex items-start gap-2 font-bold">
                  <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {loginLoading ? "Memeriksa..." : "Masuk ke Dashboard Admin"}
            </button>
          </form>

          <div className="pt-3 border-t border-gray-100 text-center">
            <span className="text-[11px] text-gray-500 font-medium leading-relaxed block">
              🛡️ <strong>Proteksi Keamanan:</strong> Maksimal 3x percobaan salah. Akses IP Anda akan diblokir otomatis selama 15 menit jika batas kesempatan terlampaui.
            </span>
          </div>
        </div>
      </div>
    );
  }

  // IF LOGGED IN
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F17] pt-44 pb-20 transition-colors duration-300">
      <div className="container-custom max-w-5xl">
        {/* HEADER DASHBOARD */}
        <div className="bg-white dark:bg-[#161F2E] p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-[#222F43] mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-emerald-950/50 text-[var(--color-secondary-dark)] dark:text-emerald-400 text-xs font-bold rounded-full mb-2 border border-green-200 dark:border-emerald-800/80">
              <CheckCircle2 size={14} /> Terhubung sebagai Pengelola Publikasi (CRUD Aktif)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
              Admin Panel SLB Tunas Harapan
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-text-mid)] mt-1">
              Kelola Tambah, Edit, dan Hapus konten berita serta foto galeri secara mandiri.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 border border-red-200 dark:border-red-800 rounded-xl transition-colors self-start md:self-center cursor-pointer"
          >
            <LogOut size={16} /> Keluar Admin
          </button>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex border-b border-gray-200 dark:border-[#222F43] mb-8 gap-2 overflow-x-auto">
          <button
            onClick={() => { setActiveTab("kegiatan"); resetFormKegiatan(); }}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "kegiatan"
                ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-white dark:bg-[#161F2E] rounded-t-xl"
                : "border-transparent text-[var(--color-text-mid)] hover:text-[var(--color-text-dark)] hover:bg-gray-100 dark:hover:bg-[#161F2E]"
            }`}
          >
            <Newspaper size={18} /> Kelola Berita & Kegiatan
          </button>
          <button
            onClick={() => { setActiveTab("galeri"); resetFormGaleri(); }}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "galeri"
                ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-white dark:bg-[#161F2E] rounded-t-xl"
                : "border-transparent text-[var(--color-text-mid)] hover:text-[var(--color-text-dark)] hover:bg-gray-100 dark:hover:bg-[#161F2E]"
            }`}
          >
            <ImageIcon size={18} /> Kelola Foto Galeri
          </button>
          <button
            onClick={() => { setActiveTab("keuangan"); fetchKeuanganList(); }}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "keuangan"
                ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-white dark:bg-[#161F2E] rounded-t-xl"
                : "border-transparent text-[var(--color-text-mid)] hover:text-[var(--color-text-dark)] hover:bg-gray-100 dark:hover:bg-[#161F2E]"
            }`}
          >
            <DollarSign size={18} /> Transparansi Keuangan
          </button>
          <button
            onClick={() => setActiveTab("pengaturan")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "pengaturan"
                ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-white dark:bg-[#161F2E] rounded-t-xl"
                : "border-transparent text-[var(--color-text-mid)] hover:text-[var(--color-text-dark)] hover:bg-gray-100 dark:hover:bg-[#161F2E]"
            }`}
          >
            <Settings size={18} /> Pengaturan GitHub Token
          </button>
        </div>

        {/* SEARCH BAR (Tampil di Tab Kegiatan & Galeri) */}
        {activeTab !== "pengaturan" && activeTab !== "keuangan" && (
          <div className="mb-6 relative">
            <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              aria-label="Cari di daftar berita kegiatan atau foto galeri"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Cari di daftar ${activeTab === "kegiatan" ? "berita kegiatan" : "foto galeri"}...`}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#161F2E] text-sm text-[var(--color-text-dark)] border border-gray-200 dark:border-[#222F43] rounded-2xl focus:outline-none focus:border-[var(--color-primary)] shadow-sm"
            />
          </div>
        )}

        {/* TAB 1: KELOLA & FORM KEGIATAN */}
        {activeTab === "kegiatan" && (
          <div className="space-y-8">
            {/* FORM KEGIATAN */}
            <div className="bg-white dark:bg-[#161F2E] p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-[#222F43]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                  <FileText className="text-[var(--color-primary)]" />
                  {isEditingKegiatan ? `Edit Berita: "${judulKegiatan}"` : "Formulir Tambah Berita Baru"}
                </h2>
                {isEditingKegiatan && (
                  <button
                    onClick={resetFormKegiatan}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 bg-gray-100 dark:bg-[#0B0F17] hover:bg-red-50 dark:hover:bg-red-950/50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <X size={14} /> Batal Edit
                  </button>
                )}
              </div>

              {msgKegiatan && (
                <div className={`p-4 rounded-2xl mb-6 text-xs sm:text-sm font-semibold flex items-center gap-3 ${
                  msgKegiatan.type === "success" ? "bg-green-50 dark:bg-emerald-950/50 text-green-800 dark:text-emerald-300 border border-green-200 dark:border-emerald-800/80" : "bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
                }`}>
                  {msgKegiatan.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                  <span>{msgKegiatan.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmitKegiatan} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label htmlFor="kegiatanJudul" className="block text-xs font-bold text-[var(--color-text-dark)]">Judul Berita / Kegiatan</label>
                    <input
                      id="kegiatanJudul"
                      type="text"
                      required
                      value={judulKegiatan}
                      onChange={(e) => setJudulKegiatan(e.target.value)}
                      placeholder="Contoh: Peringatan Hari Disabilitas Internasional 2026 di SLB Tunas Harapan"
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="kegiatanTanggal" className="block text-xs font-bold text-[var(--color-text-dark)]">Tanggal Pelaksanaan</label>
                    <input
                      id="kegiatanTanggal"
                      type="date"
                      required
                      value={tanggalKegiatan}
                      onChange={(e) => setTanggalKegiatan(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="kegiatanRingkasan" className="block text-xs font-bold text-[var(--color-text-dark)]">Ringkasan Singkat (Muncul di Halaman Beranda)</label>
                  <textarea
                    id="kegiatanRingkasan"
                    required
                    rows={2}
                    value={ringkasanKegiatan}
                    onChange={(e) => setRingkasanKegiatan(e.target.value)}
                    placeholder="Tuliskan 1-2 kalimat rangkuman kegiatan..."
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-primary)] resize-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[var(--color-text-dark)]">Upload Sampul Foto Kegiatan</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-[#2A3B54] hover:border-[var(--color-primary)] p-6 rounded-2xl text-center bg-gray-50 dark:bg-[#0B0F17]/50 transition-colors">
                    {previewCover ? (
                      <div className="space-y-3">
                        <img src={previewCover} alt="Preview Cover" className="max-h-56 mx-auto rounded-xl shadow-md object-cover" />
                        <button
                          type="button"
                          onClick={() => { setPreviewCover(""); setGambarCoverBase64(""); }}
                          className="text-xs text-red-600 dark:text-red-400 underline font-semibold cursor-pointer"
                        >
                          Ganti Sampul Foto
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center justify-center">
                        <Upload size={32} className="text-gray-400 dark:text-gray-500 mb-2" />
                        <span className="text-xs font-bold text-[var(--color-primary)]">Klik untuk Upload Gambar Sampul</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold mt-1">✨ Otomatis dikompres & dikonversi ke WebP (Super Ringan)</span>
                        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, false)} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="kegiatanKonten" className="block text-xs font-bold text-[var(--color-text-dark)]">Isi Berita Lengkap</label>
                  <textarea
                    id="kegiatanKonten"
                    required
                    rows={8}
                    value={kontenKegiatan}
                    onChange={(e) => setKontenKegiatan(e.target.value)}
                    placeholder="Tuliskan cerita lengkap kegiatan di sini..."
                    className="w-full p-4 text-sm border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-primary)] leading-relaxed font-sans transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingKegiatan}
                  className={`w-full py-4 text-white font-bold rounded-2xl transition-all shadow-md text-sm cursor-pointer ${
                    isEditingKegiatan ? "bg-amber-600 hover:bg-amber-700" : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {submittingKegiatan
                    ? "Sedang Memproses..."
                    : isEditingKegiatan
                    ? "✏️ Simpan Perubahan Berita"
                    : "🚀 Terbitkan Berita Baru Sekarang"}
                </button>
              </form>
            </div>

            {/* DAFTAR BERITA KEGIATAN SAAT INI (READ / UPDATE / DELETE LIST) */}
            <div className="bg-white dark:bg-[#161F2E] p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-[#222F43] space-y-4">
              <h3 className="text-lg font-bold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                Daftar Berita & Kegiatan Sekolah ({filteredKegiatan.length})
              </h3>

              {filteredKegiatan.length === 0 ? (
                <p className="text-xs text-gray-500 dark:text-gray-400 italic py-4 text-center">Belum ada berita ditemukan.</p>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-[#222F43]">
                  {filteredKegiatan.map((post) => (
                    <div key={post.slug} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 dark:hover:bg-[#0B0F17]/50 p-2 rounded-xl transition-colors">
                      <div className="flex items-center gap-4">
                        <img src={post.gambarCover} alt={post.judul} className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-gray-200 dark:border-[#222F43]" />
                        <div>
                          <h4 className="font-bold text-sm text-[var(--color-text-dark)] line-clamp-1">{post.judul}</h4>
                          <span className="text-[11px] text-gray-500 dark:text-gray-400 block mt-0.5">{post.tanggal}</span>
                          <p className="text-xs text-[var(--color-text-mid)] line-clamp-1 mt-1">{post.ringkasan}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                        <a
                          href={`/kegiatan/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 bg-gray-100 dark:bg-[#0B0F17] hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg transition-colors cursor-pointer"
                          title="Lihat Berita"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <button
                          onClick={() => handleEditKegiatan(post)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 rounded-lg border border-amber-200 dark:border-amber-800 transition-colors cursor-pointer"
                        >
                          <Edit3 size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteKegiatan(post.slug, post.judul)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 rounded-lg border border-red-200 dark:border-red-800 transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: KELOLA & FORM GALERI */}
        {activeTab === "galeri" && (
          <div className="space-y-8">
            {/* FORM GALERI */}
            <div className="bg-white dark:bg-[#161F2E] p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-[#222F43]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                  <ImageIcon className="text-[var(--color-secondary)]" />
                  {isEditingGaleri ? `Edit Foto: "${judulFoto}"` : "Formulir Tambah Foto Galeri"}
                </h2>
                {isEditingGaleri && (
                  <button
                    onClick={resetFormGaleri}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 bg-gray-100 dark:bg-[#0B0F17] hover:bg-red-50 dark:hover:bg-red-950/50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <X size={14} /> Batal Edit
                  </button>
                )}
              </div>

              {msgGaleri && (
                <div className={`p-4 rounded-2xl mb-6 text-xs sm:text-sm font-semibold flex items-center gap-3 ${
                  msgGaleri.type === "success" ? "bg-green-50 dark:bg-emerald-950/50 text-green-800 dark:text-emerald-300 border border-green-200 dark:border-emerald-800/80" : "bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
                }`}>
                  {msgGaleri.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                  <span>{msgGaleri.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmitGaleri} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="galeriJudul" className="block text-xs font-bold text-[var(--color-text-dark)]">Judul Foto</label>
                    <input
                      id="galeriJudul"
                      type="text"
                      required
                      value={judulFoto}
                      onChange={(e) => setJudulFoto(e.target.value)}
                      placeholder="Contoh: Kegiatan Praktek Memasak Siswa SMALB"
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-secondary)] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="galeriKategori" className="block text-xs font-bold text-[var(--color-text-dark)]">Kategori Foto Galeri</label>
                    <select
                      id="galeriKategori"
                      value={kategoriFoto}
                      onChange={(e) => setKategoriFoto(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-secondary)] cursor-pointer transition-colors"
                    >
                      <option value="kegiatan">Kegiatan Sekolah</option>
                      <option value="ruang-kelas">Ruang Kelas Belajar</option>
                      <option value="keterampilan">Ruang Keterampilan Vokasional</option>
                      <option value="uks">UKS (Kesehatan)</option>
                      <option value="wc">WC / Toilet Disabilitas</option>
                      <option value="bangunan">Bangunan & Area Gedung</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[var(--color-text-dark)]">Upload File Foto Galeri</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-[#2A3B54] hover:border-[var(--color-secondary)] p-6 rounded-2xl text-center bg-gray-50 dark:bg-[#0B0F17]/50 transition-colors">
                    {previewGaleri ? (
                      <div className="space-y-3">
                        <img src={previewGaleri} alt="Preview Galeri" className="max-h-56 mx-auto rounded-xl shadow-md object-cover" />
                        <button
                          type="button"
                          onClick={() => { setPreviewGaleri(""); setGambarGaleriBase64(""); }}
                          className="text-xs text-red-600 dark:text-red-400 underline font-semibold cursor-pointer"
                        >
                          Ganti Foto
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center justify-center">
                        <Upload size={32} className="text-gray-400 dark:text-gray-500 mb-2" />
                        <span className="text-xs font-bold text-[var(--color-secondary-dark)] dark:text-emerald-400">Klik untuk Upload Foto Galeri</span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold mt-1">✨ Otomatis dikompres & dikonversi ke WebP (Super Ringan)</span>
                        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, true)} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="galeriAlt" className="block text-xs font-bold text-[var(--color-text-dark)]">Deskripsi Pembaca Gambar (Opsional)</label>
                  <input
                    id="galeriAlt"
                    type="text"
                    value={altFoto}
                    onChange={(e) => setAltFoto(e.target.value)}
                    placeholder="Keterangan singkat visual foto untuk aksesibilitas..."
                    className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-secondary)] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingGaleri}
                  className={`w-full py-4 text-white font-bold rounded-2xl transition-all shadow-md text-sm cursor-pointer ${
                    isEditingGaleri ? "bg-amber-600 hover:bg-amber-700" : "bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)]"
                  }`}
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {submittingGaleri
                    ? "Memproses..."
                    : isEditingGaleri
                    ? "✏️ Simpan Perubahan Foto"
                    : "📸 Simpan Foto ke Galeri"}
                </button>
              </form>
            </div>

            {/* DAFTAR FOTO GALERI SAAT INI (READ / UPDATE / DELETE LIST) */}
            <div className="bg-white dark:bg-[#161F2E] p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-[#222F43] space-y-4">
              <h3 className="text-lg font-bold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                Daftar Foto Galeri Sekolah ({filteredGaleri.length})
              </h3>

              {filteredGaleri.length === 0 ? (
                <p className="text-xs text-gray-500 dark:text-gray-400 italic py-4 text-center">Belum ada foto galeri ditemukan.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredGaleri.map((photo) => (
                    <div key={photo.id} className="border border-gray-200 dark:border-[#222F43] rounded-2xl p-3 bg-gray-50/50 dark:bg-[#0B0F17]/50 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <img src={photo.src} alt={photo.judul} className="w-full h-36 rounded-xl object-cover border border-gray-200 dark:border-[#222F43]" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded font-mono">
                            {photo.kategori}
                          </span>
                          <h4 className="font-bold text-sm text-[var(--color-text-dark)] line-clamp-1 mt-1">{photo.judul}</h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-gray-200/80 dark:border-[#222F43]">
                        <button
                          onClick={() => handleEditGaleri(photo)}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 rounded-lg border border-amber-200 dark:border-amber-800 transition-colors cursor-pointer"
                        >
                          <Edit3 size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteGaleri(photo.id, photo.judul)}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 rounded-lg border border-red-200 dark:border-red-800 transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} /> Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: TRANSPARANSI KEUANGAN DONASI */}
        {activeTab === "keuangan" && (
          <div className="space-y-8">
            {/* Metric Cards Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#161F2E] p-6 rounded-2xl border border-gray-200 dark:border-[#222F43] shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Donasi Masuk</p>
                  <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                    Rp {(keuanganData.ringkasan.totalPemasukan || 0).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#161F2E] p-6 rounded-2xl border border-gray-200 dark:border-[#222F43] shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <TrendingDown size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Dana Tersalurkan</p>
                  <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-0.5">
                    Rp {(keuanganData.ringkasan.totalPengeluaran || 0).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#161F2E] p-6 rounded-2xl border border-gray-200 dark:border-[#222F43] shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <DollarSign size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Saldo Kas Aktif</p>
                  <p className="text-xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
                    Rp {(keuanganData.ringkasan.saldoKas || 0).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>

            {/* Message Notification */}
            {msgKeuangan && (
              <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border ${msgKeuangan.type === "success" ? "bg-green-50 text-green-700 border-green-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800" : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800"}`}>
                {msgKeuangan.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{msgKeuangan.text}</span>
              </div>
            )}

            {/* Form 1: Catat / Edit Transaksi Keuangan */}
            <div className="bg-white dark:bg-[#161F2E] p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-[#222F43] space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[var(--color-text-dark)] flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {isEditingTrx ? <Edit3 className="text-amber-500" /> : <Plus className="text-emerald-600" />}
                  {isEditingTrx ? `Edit Transaksi: "${uraianTrx}"` : "Catat Transaksi Mutasi Keuangan Baru"}
                </h2>
                {isEditingTrx && (
                  <button
                    type="button"
                    onClick={resetFormTrx}
                    className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <X size={14} /> Batal Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveTransaksi} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[var(--color-text-dark)]">Tanggal Transaksi</label>
                    <input
                      type="date"
                      required
                      value={tanggalTrx}
                      onChange={(e) => setTanggalTrx(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[var(--color-text-dark)]">Jenis Transaksi</label>
                    <select
                      value={tipeTrx}
                      onChange={(e) => setTipeTrx(e.target.value as "pengeluaran" | "pemasukan")}
                      className="w-full px-4 py-2.5 text-xs border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
                    >
                      <option value="pengeluaran">Pengeluaran Program</option>
                      <option value="pemasukan">Pemasukan Donasi</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[var(--color-text-dark)]">Nominal (Rp)</label>
                    <input
                      type="number"
                      required
                      placeholder="Contoh: 2500000"
                      value={nominalTrx}
                      onChange={(e) => setNominalTrx(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[var(--color-text-dark)]">Kategori Alokasi</label>
                  <select
                    value={kategoriTrx}
                    onChange={(e) => setKategoriTrx(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
                  >
                    <option value="Pengadaan Alat Peraga Edukatif (APE) & Sensori Terapi">Pengadaan Alat Peraga Edukatif (APE) & Sensori Terapi</option>
                    <option value="Beasiswa & Alokasi Operasional Siswa Prasejahtera">Beasiswa & Alokasi Operasional Siswa Prasejahtera</option>
                    <option value="Pelatihan Vokasional & Keterampilan Wirausaha Siswa">Pelatihan Vokasional & Keterampilan Wirausaha Siswa</option>
                    <option value="Perbaikan & Sanitasi Aksesibilitas Fisik Sekolah">Perbaikan & Sanitasi Aksesibilitas Fisik Sekolah</option>
                    <option value="Donasi Masuk">Donasi Masuk (Umum)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[var(--color-text-dark)]">Uraian / Rincian Penggunaan Dana</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pembelian 5 set papan braille & alat latih fokus sensori motorik"
                    value={uraianTrx}
                    onChange={(e) => setUraianTrx(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submittingKeuangan}
                    className={`px-6 py-2.5 text-xs font-bold rounded-xl !text-white active:scale-95 transition-all cursor-pointer shadow-sm ${
                      isEditingTrx ? "bg-amber-600 hover:bg-amber-700" : "bg-emerald-600 hover:bg-emerald-700"
                    }`}
                    style={{ color: "#ffffff" }}
                  >
                    {submittingKeuangan ? "Memproses..." : isEditingTrx ? "✏️ Update Transaksi Keuangan" : "➕ Simpan Transaksi Keuangan"}
                  </button>
                  {isEditingTrx && (
                    <button
                      type="button"
                      onClick={resetFormTrx}
                      className="px-4 py-2.5 text-xs font-bold rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Form 2: Publikasikan / Edit Dokumen Laporan Resmi */}
            <div className="bg-white dark:bg-[#161F2E] p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-[#222F43] space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[var(--color-text-dark)] flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {isEditingDoc ? <Edit3 className="text-amber-500" /> : <FileText className="text-blue-600" />}
                  {isEditingDoc ? `Edit Laporan: "${judulDoc}"` : "Publikasikan Berkas Laporan Resmi"}
                </h2>
                {isEditingDoc && (
                  <button
                    type="button"
                    onClick={resetFormDoc}
                    className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <X size={14} /> Batal Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveDokumen} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[var(--color-text-dark)]">Judul Dokumen Laporan</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Laporan Akuntabilitas & Transparansi Q2 2026"
                      value={judulDoc}
                      onChange={(e) => setJudulDoc(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[var(--color-text-dark)]">Periode Laporan</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: April - Juni 2026"
                      value={periodeDoc}
                      onChange={(e) => setPeriodeDoc(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>
                </div>

                {/* DUAL OPTION CHOICE: UPLOAD FILE vs TEMPEL LINK */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-[var(--color-text-dark)]">Metode Penyediaan Berkas Laporan</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => setDocOption("link")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                        docOption === "link"
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0B0F17] text-[var(--color-text-mid)]"
                      }`}
                    >
                      <ExternalLink size={14} /> 🔗 Tempel Link / URL Berkas
                    </button>
                    <button
                      type="button"
                      onClick={() => setDocOption("upload")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                        docOption === "upload"
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300"
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0B0F17] text-[var(--color-text-mid)]"
                      }`}
                    >
                      <Upload size={14} /> 📁 Upload Berkas (PDF/Word/Excel)
                    </button>
                  </div>

                  {/* OPTION 1: LINK URL */}
                  {docOption === "link" && (
                    <div className="space-y-1 pt-1">
                      <label className="block text-[11px] font-medium text-[var(--color-text-mid)]">Link / URL Berkas Laporan</label>
                      <input
                        type="text"
                        required={docOption === "link"}
                        placeholder="Contoh: /docs/Laporan-Q2-2026.pdf atau URL link Google Drive"
                        value={fileUrlDoc}
                        onChange={(e) => setFileUrlDoc(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl focus:outline-none focus:border-[var(--color-primary)] font-mono"
                      />
                    </div>
                  )}

                  {/* OPTION 2: FILE UPLOAD */}
                  {docOption === "upload" && (
                    <div className="space-y-2 pt-1">
                      <label className="block text-[11px] font-medium text-[var(--color-text-mid)]">Pilih Berkas Dokumen (PDF, DOCX, XLSX)</label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        onChange={handleDocFileSelect}
                        className="w-full text-xs text-[var(--color-text-dark)] file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-100 file:text-blue-700 dark:file:bg-blue-950 dark:file:text-blue-300 hover:file:bg-blue-200 cursor-pointer"
                      />
                      {docFileName && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 size={14} /> Berkas siap diunggah: <code>{docFileName}</code>
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submittingKeuangan}
                    className={`px-6 py-2.5 text-xs font-bold rounded-xl !text-white active:scale-95 transition-all cursor-pointer shadow-sm ${
                      isEditingDoc ? "bg-amber-600 hover:bg-amber-700" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    style={{ color: "#ffffff" }}
                  >
                    {submittingKeuangan ? "Memproses..." : isEditingDoc ? "✏️ Update Dokumen Laporan" : "📄 Publikasikan Dokumen Laporan"}
                  </button>
                  {isEditingDoc && (
                    <button
                      type="button"
                      onClick={resetFormDoc}
                      className="px-4 py-2.5 text-xs font-bold rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Tabel Manajemen Transaksi & List Dokumen (CRUD) */}
            <div className="bg-white dark:bg-[#161F2E] p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-[#222F43] space-y-8">
              {/* 1. Kelola Transaksi */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                  Daftar Mutasi Transaksi ({keuanganData.transaksi.length})
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-[#0B0F17] font-bold text-[var(--color-text-dark)] border-b border-gray-200 dark:border-[#222F43]">
                        <th className="p-3">Tanggal</th>
                        <th className="p-3">Uraian</th>
                        <th className="p-3">Kategori</th>
                        <th className="p-3 text-right">Nominal</th>
                        <th className="p-3 text-center">Aksi (CRUD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-[#222F43]">
                      {keuanganData.transaksi.map((t) => (
                        <tr key={t.id}>
                          <td className="p-3 font-mono">{t.tanggal}</td>
                          <td className="p-3 font-medium">{t.uraian}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${t.tipe === "pemasukan" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"}`}>
                              {t.kategori}
                            </span>
                          </td>
                          <td className={`p-3 text-right font-bold font-mono ${t.tipe === "pemasukan" ? "text-emerald-600" : "text-gray-900 dark:text-white"}`}>
                            {t.tipe === "pemasukan" ? "+" : "-"} Rp {t.nominal.toLocaleString("id-ID")}
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => handleEditTransaksi(t)}
                                className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-lg transition-colors cursor-pointer"
                                title="Edit Transaksi"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteKeuangan(t.id, "TRANSAKSI", t.uraian)}
                                className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                                title="Hapus Transaksi"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2. Kelola Dokumen Laporan Resmi */}
              <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-[#222F43]">
                <h2 className="text-lg font-bold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                  Daftar Berkas Laporan Resmi Terpublikasi ({keuanganData.laporanDokumen.length})
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {keuanganData.laporanDokumen.map((doc) => (
                    <div key={doc.id} className="p-4 rounded-xl border border-gray-200 dark:border-[#2A3B54] bg-gray-50/50 dark:bg-[#0B0F17] space-y-3">
                      <div>
                        <p className="font-bold text-xs text-[var(--color-text-dark)]">{doc.judul}</p>
                        <p className="text-[11px] text-[var(--color-text-mid)]">Periode: {doc.periode}</p>
                        <p className="text-[10px] text-gray-400 font-mono mt-1 truncate">Link: {doc.fileUrl}</p>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Download size={14} /> Unduh
                        </a>
                        <button
                          onClick={() => handleEditDokumen(doc)}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit3 size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteKeuangan(doc.id, "DOKUMEN", doc.judul)}
                          className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                          title="Hapus Dokumen"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PENGATURAN & OTORISASI GITHUB */}
        {activeTab === "pengaturan" && (
          <div className="bg-white dark:bg-[#161F2E] p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-[#222F43] space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
              <Settings className="text-blue-600 dark:text-blue-400" /> Pengaturan Otorisasi & Otomatisasi GitHub
            </h2>

            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-4 sm:p-6 rounded-2xl text-xs sm:text-sm text-blue-900 dark:text-blue-200 leading-relaxed space-y-3">
              <h3 className="font-bold flex items-center gap-2 text-blue-950 dark:text-blue-100">
                <HelpCircle size={18} /> Otomatisasi CRUD Berita & Foto via GitHub
              </h3>
              <p>
                Admin Panel ini memiliki kemampuan **CRUD Lengkap (Create, Read, Update, Delete)**. Setiap aksi Tambah, Edit, atau Hapus akan langsung memperbarui repositori GitHub sekolah secara otomatis, dan Vercel akan men-deploy ulang situs secara otomatis!
              </p>
            </div>

            <div className="space-y-4">
              <label htmlFor="tokenGithub" className="block text-xs font-bold text-[var(--color-text-dark)]">
                Personal Access Token (PAT) GitHub (Disimpan Aman di Browser Anda)
              </label>
              <input
                id="tokenGithub"
                type="password"
                value={githubToken}
                onChange={(e) => handleSaveToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full px-4 py-3 text-sm border border-gray-300 dark:border-[#2A3B54] bg-white dark:bg-[#0B0F17] text-[var(--color-text-dark)] rounded-xl font-mono focus:outline-none focus:border-blue-600 transition-colors"
              />
              <p className="text-[11px] text-[var(--color-text-light)]">
                💡 <strong>Catatan:</strong> Jika Anda sudah memasukkan <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-blue-700 dark:text-blue-300">GITHUB_TOKEN</code> di menu Environment Variables Vercel, Anda dapat mengosongkan kolom di atas.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
