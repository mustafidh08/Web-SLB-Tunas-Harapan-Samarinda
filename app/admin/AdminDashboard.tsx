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
  Calendar,
  Layers,
  HelpCircle
} from "lucide-react";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"kegiatan" | "galeri" | "pengaturan">("kegiatan");
  const [githubToken, setGithubToken] = useState("");

  // State Form Kegiatan
  const [judulKegiatan, setJudulKegiatan] = useState("");
  const [tanggalKegiatan, setTanggalKegiatan] = useState(() => new Date().toISOString().split("T")[0]);
  const [ringkasanKegiatan, setRingkasanKegiatan] = useState("");
  const [kontenKegiatan, setKontenKegiatan] = useState("");
  const [gambarCoverBase64, setGambarCoverBase64] = useState("");
  const [previewCover, setPreviewCover] = useState("");
  const [submittingKegiatan, setSubmittingKegiatan] = useState(false);
  const [msgKegiatan, setMsgKegiatan] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // State Form Galeri
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

  // Submit Form Kegiatan
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
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMsgKegiatan({ type: "success", text: data.message });
        setJudulKegiatan("");
        setRingkasanKegiatan("");
        setKontenKegiatan("");
        setGambarCoverBase64("");
        setPreviewCover("");
      } else {
        setMsgKegiatan({ type: "error", text: data.message || "Gagal menyimpan berita" });
      }
    } catch {
      setMsgKegiatan({ type: "error", text: "Terjadi kesalahan server saat menyimpan berita." });
    } finally {
      setSubmittingKegiatan(false);
    }
  };

  // Submit Form Galeri
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
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMsgGaleri({ type: "success", text: data.message });
        setJudulFoto("");
        setAltFoto("");
        setGambarGaleriBase64("");
        setPreviewGaleri("");
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

  // IF NOT LOGGED IN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 pt-40 pb-20">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-[var(--color-primary-tint)] text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Key size={32} />
            </div>
            <h1 className="text-2xl font-extrabold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
              Admin Panel Sekolah
            </h1>
            <p className="text-xs text-[var(--color-text-mid)]">
              Masukkan password pengelola SLB Tunas Harapan untuk menambah berita dan foto galeri secara mandiri.
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
              className="w-full py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {loginLoading ? "Memeriksa..." : "Masuk ke Admin Panel"}
            </button>
          </form>

          <div className="pt-2 text-center border-t border-gray-100">
            <span className="text-[11px] text-[var(--color-text-light)]">
              💡 Password bawaan default: <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-[var(--color-primary)]">slbtunasharapan</code>
            </span>
          </div>
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
              <CheckCircle2 size={14} /> Terhubung sebagai Pengelola Publikasi
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
              Admin Panel SLB Tunas Harapan
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-text-mid)] mt-1">
              Tambahkan konten kegiatan sekolah dan dokumentasi fasilitas secara langsung tanpa bantuan teknisi.
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
            onClick={() => setActiveTab("kegiatan")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "kegiatan"
                ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-white rounded-t-xl"
                : "border-transparent text-[var(--color-text-mid)] hover:text-[var(--color-text-dark)]"
            }`}
          >
            <Newspaper size={18} /> Tambah Berita Baru
          </button>
          <button
            onClick={() => setActiveTab("galeri")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "galeri"
                ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-white rounded-t-xl"
                : "border-transparent text-[var(--color-text-mid)] hover:text-[var(--color-text-dark)]"
            }`}
          >
            <ImageIcon size={18} /> Tambah Foto Galeri
          </button>
          <button
            onClick={() => setActiveTab("pengaturan")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "pengaturan"
                ? "border-[var(--color-primary)] text-[var(--color-primary)] bg-white rounded-t-xl"
                : "border-transparent text-[var(--color-text-mid)] hover:text-[var(--color-text-dark)]"
            }`}
          >
            <Settings size={18} /> Pengaturan Otorisasi (GitHub)
          </button>
        </div>

        {/* TAB 1: FORM KEGIATAN */}
        {activeTab === "kegiatan" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
              <FileText className="text-[var(--color-primary)]" /> Formulir Tambah Berita / Kegiatan Sekolah
            </h2>

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
                  <div className="relative">
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
              </div>

              <div className="space-y-2">
                <label htmlFor="kegiatanRingkasan" className="block text-xs font-bold text-[var(--color-text-dark)]">Ringkasan Singkat (Muncul di Halaman Utama)</label>
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
                  placeholder="Tuliskan cerita lengkap kegiatan di sini. Anda juga bisa menggunakan paragraf bercerita..."
                  className="w-full p-4 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[var(--color-primary)] leading-relaxed font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={submittingKegiatan}
                className="w-full py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold rounded-2xl transition-all shadow-md text-sm cursor-pointer"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {submittingKegiatan ? "Sedang Memproses & Terbitkan..." : "🚀 Terbitkan Berita Baru Sekarang"}
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: FORM GALERI */}
        {activeTab === "galeri" && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[var(--color-text-dark)]" style={{ fontFamily: "var(--font-heading)" }}>
              <ImageIcon className="text-[var(--color-secondary)]" /> Formulir Tambah Foto ke Galeri Sekolah
            </h2>

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
                className="w-full py-4 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-bold rounded-2xl transition-all shadow-md text-sm cursor-pointer"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {submittingGaleri ? "Memproses..." : "📸 Simpan Foto ke Galeri"}
              </button>
            </form>
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
                <HelpCircle size={18} /> Bagaimana Cara Kerja Otomatisasi Publikasi Ini?
              </h3>
              <p>
                Ketika Anda atau Staff mengunggah berita atau foto melalui Admin Panel ini, sistem dapat secara otomatis mengirimkannya (commit) ke repositori GitHub sekolah. Vercel akan mendeteksi perubahan tersebut dan **men-deploy ulang website secara otomatis** dalam 1-2 menit!
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
                💡 <strong>Catatan:</strong> Jika Anda sudah memasukkan <code className="bg-gray-100 px-1 py-0.5 rounded text-blue-700">GITHUB_TOKEN</code> di menu Environment Variables Vercel, Anda dapat mengosongkan kolom di atas. Token di atas hanya digunakan jika Anda ingin memasukkannya dari dasbor ini.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
