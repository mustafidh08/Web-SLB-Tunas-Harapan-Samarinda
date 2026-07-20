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
  ExternalLink
} from "lucide-react";

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

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"kegiatan" | "galeri" | "pengaturan">("kegiatan");
  const [githubToken, setGithubToken] = useState("");

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

  // Load Simpanan Token & Session Login dari LocalStorage
  useEffect(() => {
    const savedLogin = sessionStorage.getItem("slb_admin_session");
    if (savedLogin === "true") {
      setIsLoggedIn(true);
    }
    const savedToken = localStorage.getItem("slb_github_token") || "";
    setGithubToken(savedToken);
  }, []);

  // Fetch Data List Berita & Galeri
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

  useEffect(() => {
    if (isLoggedIn) {
      fetchKegiatanList();
      fetchGaleriList();
    }
  }, [isLoggedIn]);

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
        sessionStorage.setItem("slb_admin_session", "true");
      } else {
        setLoginError(data.message || "Password salah!");
      }
    } catch {
      setLoginError("Terjadi kesalahan koneksi!");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("slb_admin_session");
  };

  // Convert File to Base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isGaleri = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert("Ukuran gambar terlalu besar! Maksimal 4MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (isGaleri) {
        setGambarGaleriBase64(result);
        setPreviewGaleri(result);
      } else {
        setGambarCoverBase64(result);
        setPreviewCover(result);
      }
    };
    reader.readAsDataURL(file);
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 pt-40 pb-20">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 max-w-md w-full space-y-6">
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
              <input
                id="passInput"
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Masukkan password admin..."
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs flex items-center gap-2 border border-red-100">
                <AlertCircle size={16} />
                <span>{loginError}</span>
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


        </div>
      </div>
    );
  }

  // IF LOGGED IN
  return (
    <div className="min-h-screen bg-gray-50 pt-40 pb-20">
      <div className="container-custom max-w-5xl">
        {/* HEADER DASHBOARD */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-[var(--color-secondary-dark)] text-xs font-bold rounded-full mb-2 border border-green-200">
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
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors self-start md:self-center cursor-pointer"
          >
            <LogOut size={16} /> Keluar Admin
          </button>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex border-b border-gray-200 mb-8 gap-2 overflow-x-auto">
          <button
            onClick={() => { setActiveTab("kegiatan"); resetFormKegiatan(); }}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "kegiatan"
                ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-white rounded-t-xl"
                : "border-transparent text-[var(--color-text-mid)] hover:text-[var(--color-text-dark)]"
            }`}
          >
            <Newspaper size={18} /> Kelola Berita & Kegiatan
          </button>
          <button
            onClick={() => { setActiveTab("galeri"); resetFormGaleri(); }}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "galeri"
                ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-white rounded-t-xl"
                : "border-transparent text-[var(--color-text-mid)] hover:text-[var(--color-text-dark)]"
            }`}
          >
            <ImageIcon size={18} /> Kelola Foto Galeri
          </button>
          <button
            onClick={() => setActiveTab("pengaturan")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "pengaturan"
                ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-white rounded-t-xl"
                : "border-transparent text-[var(--color-text-mid)] hover:text-[var(--color-text-dark)]"
            }`}
          >
            <Settings size={18} /> Pengaturan GitHub Token
          </button>
        </div>

        {/* SEARCH BAR (Tampil di Tab Kegiatan & Galeri) */}
        {activeTab !== "pengaturan" && (
          <div className="mb-6 relative">
            <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Cari di daftar ${activeTab === "kegiatan" ? "berita kegiatan" : "foto galeri"}...`}
              className="w-full pl-11 pr-4 py-3 bg-white text-sm border border-gray-200 rounded-2xl focus:outline-none focus:border-[var(--color-primary)] shadow-sm"
            />
          </div>
        )}

        {/* TAB 1: KELOLA & FORM KEGIATAN */}
        {activeTab === "kegiatan" && (
          <div className="space-y-8">
            {/* FORM KEGIATAN */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                  <FileText className="text-[var(--color-primary)]" />
                  {isEditingKegiatan ? `Edit Berita: "${judulKegiatan}"` : "Formulir Tambah Berita Baru"}
                </h2>
                {isEditingKegiatan && (
                  <button
                    onClick={resetFormKegiatan}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 bg-gray-100 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <X size={14} /> Batal Edit
                  </button>
                )}
              </div>

              {msgKegiatan && (
                <div className={`p-4 rounded-2xl mb-6 text-xs sm:text-sm font-semibold flex items-center gap-3 ${
                  msgKegiatan.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
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
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
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
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
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
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[var(--color-primary)] resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[var(--color-text-dark)]">Upload Sampul Foto Kegiatan</label>
                  <div className="border-2 border-dashed border-gray-300 hover:border-[var(--color-primary)] p-6 rounded-2xl text-center bg-gray-50 transition-colors">
                    {previewCover ? (
                      <div className="space-y-3">
                        <img src={previewCover} alt="Preview Cover" className="max-h-56 mx-auto rounded-xl shadow-md object-cover" />
                        <button
                          type="button"
                          onClick={() => { setPreviewCover(""); setGambarCoverBase64(""); }}
                          className="text-xs text-red-600 underline font-semibold cursor-pointer"
                        >
                          Ganti Sampul Foto
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center justify-center">
                        <Upload size={32} className="text-gray-400 mb-2" />
                        <span className="text-xs font-bold text-[var(--color-primary)]">Klik untuk Upload Gambar Sampul</span>
                        <span className="text-[10px] text-gray-400 mt-1">Format JPG/PNG (Maks 4MB)</span>
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
                    className="w-full p-4 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[var(--color-primary)] leading-relaxed font-sans"
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
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-4">
              <h3 className="text-lg font-bold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                Daftar Berita & Kegiatan Sekolah ({filteredKegiatan.length})
              </h3>

              {filteredKegiatan.length === 0 ? (
                <p className="text-xs text-gray-500 italic py-4 text-center">Belum ada berita ditemukan.</p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredKegiatan.map((post) => (
                    <div key={post.slug} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 p-2 rounded-xl transition-colors">
                      <div className="flex items-center gap-4">
                        <img src={post.gambarCover} alt={post.judul} className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-gray-200" />
                        <div>
                          <h4 className="font-bold text-sm text-[var(--color-text-dark)] line-clamp-1">{post.judul}</h4>
                          <span className="text-[11px] text-gray-500 block mt-0.5">{post.tanggal}</span>
                          <p className="text-xs text-[var(--color-text-mid)] line-clamp-1 mt-1">{post.ringkasan}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                        <a
                          href={`/kegiatan/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-500 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Lihat Berita"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <button
                          onClick={() => handleEditKegiatan(post)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors cursor-pointer"
                        >
                          <Edit3 size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteKegiatan(post.slug, post.judul)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors cursor-pointer"
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
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                  <ImageIcon className="text-[var(--color-secondary)]" />
                  {isEditingGaleri ? `Edit Foto: "${judulFoto}"` : "Formulir Tambah Foto Galeri"}
                </h2>
                {isEditingGaleri && (
                  <button
                    onClick={resetFormGaleri}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 bg-gray-100 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <X size={14} /> Batal Edit
                  </button>
                )}
              </div>

              {msgGaleri && (
                <div className={`p-4 rounded-2xl mb-6 text-xs sm:text-sm font-semibold flex items-center gap-3 ${
                  msgGaleri.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
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
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[var(--color-secondary)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="galeriKategori" className="block text-xs font-bold text-[var(--color-text-dark)]">Kategori Foto Galeri</label>
                    <select
                      id="galeriKategori"
                      value={kategoriFoto}
                      onChange={(e) => setKategoriFoto(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[var(--color-secondary)] bg-white cursor-pointer"
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
                  <div className="border-2 border-dashed border-gray-300 hover:border-[var(--color-secondary)] p-6 rounded-2xl text-center bg-gray-50 transition-colors">
                    {previewGaleri ? (
                      <div className="space-y-3">
                        <img src={previewGaleri} alt="Preview Galeri" className="max-h-56 mx-auto rounded-xl shadow-md object-cover" />
                        <button
                          type="button"
                          onClick={() => { setPreviewGaleri(""); setGambarGaleriBase64(""); }}
                          className="text-xs text-red-600 underline font-semibold cursor-pointer"
                        >
                          Ganti Foto
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center justify-center">
                        <Upload size={32} className="text-gray-400 mb-2" />
                        <span className="text-xs font-bold text-[var(--color-secondary-dark)]">Klik untuk Upload Foto Galeri</span>
                        <span className="text-[10px] text-gray-400 mt-1">Format JPG/PNG (Maks 4MB)</span>
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
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[var(--color-secondary)]"
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
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-4">
              <h3 className="text-lg font-bold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
                Daftar Foto Galeri Sekolah ({filteredGaleri.length})
              </h3>

              {filteredGaleri.length === 0 ? (
                <p className="text-xs text-gray-500 italic py-4 text-center">Belum ada foto galeri ditemukan.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredGaleri.map((photo) => (
                    <div key={photo.id} className="border border-gray-200 rounded-2xl p-3 bg-gray-50/50 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <img src={photo.src} alt={photo.judul} className="w-full h-36 rounded-xl object-cover border border-gray-200" />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-gray-200 text-gray-700 rounded font-mono">
                            {photo.kategori}
                          </span>
                          <h4 className="font-bold text-sm text-[var(--color-text-dark)] line-clamp-1 mt-1">{photo.judul}</h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-gray-200/80">
                        <button
                          onClick={() => handleEditGaleri(photo)}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors cursor-pointer"
                        >
                          <Edit3 size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteGaleri(photo.id, photo.judul)}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors cursor-pointer"
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

        {/* TAB 3: PENGATURAN & OTORISASI GITHUB */}
        {activeTab === "pengaturan" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
              <Settings className="text-blue-600" /> Pengaturan Otorisasi & Otomatisasi GitHub
            </h2>

            <div className="bg-blue-50 border border-blue-200 p-4 sm:p-6 rounded-2xl text-xs sm:text-sm text-blue-900 leading-relaxed space-y-3">
              <h3 className="font-bold flex items-center gap-2 text-blue-950">
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
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl font-mono focus:outline-none focus:border-blue-600"
              />
              <p className="text-[11px] text-[var(--color-text-light)]">
                💡 <strong>Catatan:</strong> Jika Anda sudah memasukkan <code className="bg-gray-100 px-1 py-0.5 rounded text-blue-700">GITHUB_TOKEN</code> di menu Environment Variables Vercel, Anda dapat mengosongkan kolom di atas.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
