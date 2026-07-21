import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAllKegiatanMeta, getKegiatanBySlug } from "@/lib/mdx";
import { timingSafeCompare, sanitizeInputString, sanitizeSlug, validateImageBase64 } from "@/lib/security";

const REPO_OWNER = "mustafidh08";
const REPO_NAME = "Web-SLB-Tunas-Harapan-Samarinda";
const BRANCH = "main";

// GET: Ambil daftar seluruh berita kegiatan
export async function GET() {
  try {
    const rawPosts = getAllKegiatanMeta();
    const posts = rawPosts.map((p) => ({
      ...p,
      gambarCover: p.foto || (p as unknown as Record<string, unknown>).gambarCover as string || "/images/kegiatan/default-cover.jpg",
    }));
    return NextResponse.json({ success: true, posts });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Gagal mengambil berita";
    return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
  }
}

// POST: Create / Update Berita Kegiatan
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      judul: rawJudul,
      tanggal: rawTanggal,
      ringkasan: rawRingkasan,
      konten: rawKonten,
      gambarCoverBase64,
      gambarCoverUrl,
      githubToken: tokenFromReq,
      password,
      isEdit,
      oldSlug: rawOldSlug,
    } = body;

    // 1. Verifikasi Password secara Timing-Safe
    const expectedPassword = process.env.ADMIN_PASSWORD || "slbtunasharapan";
    if (!password || !timingSafeCompare(String(password), expectedPassword)) {
      return NextResponse.json({ success: false, message: "Password admin salah" }, { status: 401 });
    }

    // 2. Sanitasi Input (Anti-XSS & Code Injection)
    const judul = sanitizeInputString(String(rawJudul || ""));
    const ringkasan = sanitizeInputString(String(rawRingkasan || ""));
    const konten = sanitizeInputString(String(rawKonten || ""));
    const tanggal = sanitizeInputString(String(rawTanggal || new Date().toISOString().split("T")[0]));

    if (!judul || !ringkasan || !konten) {
      return NextResponse.json({ success: false, message: "Judul, ringkasan, dan konten wajib diisi" }, { status: 400 });
    }

    // 3. Sanitasi Slug (Anti Path Traversal)
    const cleanOldSlug = rawOldSlug ? sanitizeSlug(String(rawOldSlug)) : "";
    const cleanNewSlug = sanitizeSlug(judul);
    const slug = isEdit && cleanOldSlug ? cleanOldSlug : cleanNewSlug;
    const mdxFileName = `${slug}.mdx`;

    const token = tokenFromReq || process.env.GITHUB_TOKEN;
    let finalImageUrl = gambarCoverUrl || "/images/kegiatan/default-cover.jpg";

    if (isEdit && !gambarCoverBase64 && !gambarCoverUrl) {
      const existingPost = getKegiatanBySlug(slug);
      if (existingPost) {
        finalImageUrl = existingPost.foto || (existingPost as unknown as Record<string, unknown>).gambarCover as string || finalImageUrl;
      }
    }

    // 4. Validasi Format Foto jika ada Base64
    if (gambarCoverBase64) {
      if (!validateImageBase64(gambarCoverBase64)) {
        return NextResponse.json({ success: false, message: "Format gambar tidak valid. Hanya menerima file JPG/PNG/WebP" }, { status: 400 });
      }

      const imageFileName = `kegiatan-${Date.now()}-${slug}.webp`;
      const base64Data = gambarCoverBase64.replace(/^data:image\/\w+;base64,/, "");

      if (token) {
        const githubImgUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/public/images/kegiatan/${imageFileName}`;
        await fetch(githubImgUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "SLB-Admin-Panel",
          },
          body: JSON.stringify({
            message: `Upload foto cover kegiatan: ${judul}`,
            content: base64Data,
            branch: BRANCH,
          }),
        });
        finalImageUrl = `/images/kegiatan/${imageFileName}`;
      } else {
        const uploadDir = path.join(process.cwd(), "public", "images", "kegiatan");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, imageFileName);
        fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));
        finalImageUrl = `/images/kegiatan/${imageFileName}`;
      }
    }

    // 5. Buat isi konten MDX yang tersanitasi
    const mdxContent = `---
judul: "${judul.replace(/"/g, '\\"')}"
tanggal: "${tanggal.replace(/"/g, '\\"')}"
ringkasan: "${ringkasan.replace(/"/g, '\\"')}"
gambarCover: "${finalImageUrl}"
---

${konten}
`;

    // 6. Commit file MDX ke GitHub / Local FS
    if (token) {
      const githubMdxUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/content/kegiatan/${mdxFileName}`;
      
      let sha: string | undefined;
      const getFileRes = await fetch(githubMdxUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": "SLB-Admin-Panel",
        },
      });
      if (getFileRes.ok) {
        const fileData = await getFileRes.json();
        sha = fileData.sha;
      }

      const res = await fetch(githubMdxUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "SLB-Admin-Panel",
        },
        body: JSON.stringify({
          message: `${isEdit ? "Update" : "Tambah"} berita kegiatan: ${judul}`,
          content: Buffer.from(mdxContent).toString("base64"),
          branch: BRANCH,
          ...(sha ? { sha } : {}),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return NextResponse.json(
          { success: false, message: `Gagal commit ke GitHub: ${errorData.message || "Token tidak valid"}` },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `Berita "${judul}" berhasil ${isEdit ? "diperbarui" : "diterbitkan"}! Vercel sedang melakukan deploy otomatis.`,
        slug,
      });
    } else {
      const kegiatanDir = path.join(process.cwd(), "content", "kegiatan");
      if (!fs.existsSync(kegiatanDir)) {
        fs.mkdirSync(kegiatanDir, { recursive: true });
      }
      fs.writeFileSync(path.join(kegiatanDir, mdxFileName), mdxContent, "utf-8");

      return NextResponse.json({
        success: true,
        message: `Berita "${judul}" berhasil ${isEdit ? "diperbarui" : "disimpan"} secara lokal!`,
        slug,
        isLocal: true,
      });
    }
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Kesalahan server";
    return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
  }
}

// DELETE: Hapus Berita Kegiatan
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { slug: rawSlug, githubToken: tokenFromReq, password } = body;

    const expectedPassword = process.env.ADMIN_PASSWORD || "slbtunasharapan";
    if (!password || !timingSafeCompare(String(password), expectedPassword)) {
      return NextResponse.json({ success: false, message: "Password admin salah" }, { status: 401 });
    }

    const slug = sanitizeSlug(String(rawSlug || ""));
    if (!slug) {
      return NextResponse.json({ success: false, message: "Slug berita tidak valid" }, { status: 400 });
    }

    const token = tokenFromReq || process.env.GITHUB_TOKEN;
    const mdxFileName = `${slug}.mdx`;

    if (token) {
      const githubMdxUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/content/kegiatan/${mdxFileName}`;
      
      const getFileRes = await fetch(githubMdxUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": "SLB-Admin-Panel",
        },
      });

      if (!getFileRes.ok) {
        return NextResponse.json({ success: false, message: "File berita tidak ditemukan di GitHub" }, { status: 404 });
      }

      const fileData = await getFileRes.json();

      const delRes = await fetch(githubMdxUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "SLB-Admin-Panel",
        },
        body: JSON.stringify({
          message: `Hapus berita kegiatan: ${slug}`,
          sha: fileData.sha,
          branch: BRANCH,
        }),
      });

      if (!delRes.ok) {
        return NextResponse.json({ success: false, message: "Gagal menghapus berita di GitHub" }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: "Berita berhasil dihapus! Vercel sedang melakukan deploy otomatis.",
      });
    } else {
      const filePath = path.join(process.cwd(), "content", "kegiatan", mdxFileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return NextResponse.json({
        success: true,
        message: "Berita berhasil dihapus secara lokal!",
        isLocal: true,
      });
    }
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Kesalahan server";
    return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
  }
}
