import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { dataGaleri, FotoGaleri, KategoriGaleri } from "@/content/data/galeri";
import { timingSafeCompare, sanitizeInputString, sanitizeSlug, validateImageBase64 } from "@/lib/security";

const REPO_OWNER = "mustafidh08";
const REPO_NAME = "Web-SLB-Tunas-Harapan-Samarinda";
const BRANCH = "main";

// GET: Ambil daftar seluruh foto galeri
export async function GET() {
  try {
    return NextResponse.json({ success: true, photos: dataGaleri });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Gagal mengambil data galeri";
    return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
  }
}

// POST: Create / Update Foto Galeri
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      judul: rawJudul,
      kategori: rawKategori,
      alt: rawAlt,
      gambarBase64,
      gambarUrl,
      githubToken: tokenFromReq,
      password,
      isEdit,
      photoId: reqPhotoId,
    } = body;

    // 1. Verifikasi Password secara Timing-Safe
    const expectedPassword = process.env.ADMIN_PASSWORD || "slbtunasharapan";
    if (!password || !timingSafeCompare(String(password), expectedPassword)) {
      return NextResponse.json({ success: false, message: "Password admin salah" }, { status: 401 });
    }

    // 2. Sanitasi Input (Anti-XSS)
    const judul = sanitizeInputString(String(rawJudul || ""));
    const alt = sanitizeInputString(String(rawAlt || ""));
    const kategori = sanitizeSlug(String(rawKategori || "kegiatan")) as Exclude<KategoriGaleri, "semua">;

    if (!judul || !kategori) {
      return NextResponse.json({ success: false, message: "Judul foto dan kategori wajib diisi" }, { status: 400 });
    }

    const cleanPhotoId = reqPhotoId ? sanitizeSlug(String(reqPhotoId)) : "";
    const photoId = isEdit && cleanPhotoId ? cleanPhotoId : `${kategori}-${Date.now().toString().slice(-4)}`;

    const token = tokenFromReq || process.env.GITHUB_TOKEN;
    const slug = sanitizeSlug(judul);
    let finalImageUrl = gambarUrl || "";

    // 3. Validasi Format Gambar Base64 jika ada upload baru
    if (gambarBase64) {
      if (!validateImageBase64(gambarBase64)) {
        return NextResponse.json({ success: false, message: "Format gambar tidak valid. Hanya menerima file JPG/PNG/WebP" }, { status: 400 });
      }

      const imageFileName = `${slug}-${Date.now()}.webp`;
      const base64Data = gambarBase64.replace(/^data:image\/\w+;base64,/, "");

      if (token) {
        const githubImgUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/public/images/galeri/${kategori}/${imageFileName}`;
        await fetch(githubImgUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "SLB-Admin-Panel",
          },
          body: JSON.stringify({
            message: `Upload foto galeri: ${judul}`,
            content: base64Data,
            branch: BRANCH,
          }),
        });
        finalImageUrl = `/images/galeri/${kategori}/${imageFileName}`;
      } else {
        const uploadDir = path.join(process.cwd(), "public", "images", "galeri", kategori);
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, imageFileName);
        fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));
        finalImageUrl = `/images/galeri/${kategori}/${imageFileName}`;
      }
    }

    if (isEdit && !finalImageUrl) {
      const existingPhoto = dataGaleri.find((p) => p.id === photoId);
      if (existingPhoto) {
        finalImageUrl = existingPhoto.src;
      }
    }

    if (!finalImageUrl) {
      finalImageUrl = "/images/galeri/kegiatan/default.jpg";
    }

    const targetPhotoItem: FotoGaleri = {
      id: photoId,
      judul,
      kategori,
      src: finalImageUrl,
      alt: alt || judul,
    };

    // Update file content/data/galeri.ts di GitHub / Local FS
    const fileHeader = `// content/data/galeri.ts
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

export const dataGaleri: FotoGaleri[] = `;

    let updatedPhotos: FotoGaleri[] = [];
    if (isEdit) {
      updatedPhotos = dataGaleri.map((p) => (p.id === photoId ? targetPhotoItem : p));
    } else {
      updatedPhotos = [targetPhotoItem, ...dataGaleri];
    }

    const updatedContent = fileHeader + JSON.stringify(updatedPhotos, null, 2) + ";\n";

    if (token) {
      const githubFileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/content/data/galeri.ts`;
      const getRes = await fetch(githubFileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": "SLB-Admin-Panel",
        },
      });

      if (!getRes.ok) {
        return NextResponse.json({ success: false, message: "Gagal mengambil data galeri dari GitHub" }, { status: 500 });
      }

      const fileData = await getRes.json();

      const putRes = await fetch(githubFileUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "SLB-Admin-Panel",
        },
        body: JSON.stringify({
          message: `${isEdit ? "Update" : "Tambah"} foto galeri: ${judul}`,
          content: Buffer.from(updatedContent).toString("base64"),
          sha: fileData.sha,
          branch: BRANCH,
        }),
      });

      if (!putRes.ok) {
        return NextResponse.json({ success: false, message: "Gagal memperbarui file galeri.ts di GitHub" }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: `Foto "${judul}" berhasil ${isEdit ? "diperbarui" : "disimpan"}! Vercel sedang melakukan deploy otomatis.`,
        item: targetPhotoItem,
      });
    } else {
      const filePath = path.join(process.cwd(), "content", "data", "galeri.ts");
      fs.writeFileSync(filePath, updatedContent, "utf-8");

      return NextResponse.json({
        success: true,
        message: `Foto "${judul}" berhasil ${isEdit ? "diperbarui" : "disimpan"} secara lokal!`,
        item: targetPhotoItem,
        isLocal: true,
      });
    }
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Kesalahan server";
    return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
  }
}

// DELETE: Hapus Foto Galeri
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { photoId: rawPhotoId, githubToken: tokenFromReq, password } = body;

    const expectedPassword = process.env.ADMIN_PASSWORD || "slbtunasharapan";
    if (!password || !timingSafeCompare(String(password), expectedPassword)) {
      return NextResponse.json({ success: false, message: "Password admin salah" }, { status: 401 });
    }

    const photoId = sanitizeSlug(String(rawPhotoId || ""));
    if (!photoId) {
      return NextResponse.json({ success: false, message: "ID foto tidak valid" }, { status: 400 });
    }

    const token = tokenFromReq || process.env.GITHUB_TOKEN;
    const updatedPhotos = dataGaleri.filter((p) => p.id !== photoId);

    const fileHeader = `// content/data/galeri.ts
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

export const dataGaleri: FotoGaleri[] = `;

    const updatedContent = fileHeader + JSON.stringify(updatedPhotos, null, 2) + ";\n";

    if (token) {
      const githubFileUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/content/data/galeri.ts`;
      const getRes = await fetch(githubFileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": "SLB-Admin-Panel",
        },
      });

      if (!getRes.ok) {
        return NextResponse.json({ success: false, message: "Gagal mengambil data galeri dari GitHub" }, { status: 500 });
      }

      const fileData = await getRes.json();

      const putRes = await fetch(githubFileUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "SLB-Admin-Panel",
        },
        body: JSON.stringify({
          message: `Hapus foto galeri (ID: ${photoId})`,
          content: Buffer.from(updatedContent).toString("base64"),
          sha: fileData.sha,
          branch: BRANCH,
        }),
      });

      if (!putRes.ok) {
        return NextResponse.json({ success: false, message: "Gagal menghapus foto di GitHub" }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: "Foto galeri berhasil dihapus! Vercel sedang melakukan deploy otomatis.",
      });
    } else {
      const filePath = path.join(process.cwd(), "content", "data", "galeri.ts");
      fs.writeFileSync(filePath, updatedContent, "utf-8");

      return NextResponse.json({
        success: true,
        message: "Foto galeri berhasil dihapus secara lokal!",
        isLocal: true,
      });
    }
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Kesalahan server";
    return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
  }
}
