import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const REPO_OWNER = "mustafidh08";
const REPO_NAME = "Web-SLB-Tunas-Harapan-Samarinda";
const BRANCH = "main";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      judul,
      tanggal,
      ringkasan,
      konten,
      gambarCoverBase64,
      gambarCoverUrl,
      githubToken: tokenFromReq,
      password,
    } = body;

    // Verifikasi password
    const expectedPassword = process.env.ADMIN_PASSWORD || "slbtunasharapan";
    if (password !== expectedPassword) {
      return NextResponse.json({ success: false, message: "Password admin salah" }, { status: 401 });
    }

    if (!judul || !ringkasan || !konten) {
      return NextResponse.json({ success: false, message: "Judul, ringkasan, dan konten wajib diisi" }, { status: 400 });
    }

    const token = tokenFromReq || process.env.GITHUB_TOKEN;
    const slug = judul
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    const mdxFileName = `${slug}.mdx`;

    let finalImageUrl = gambarCoverUrl || "/images/kegiatan/default-cover.jpg";

    // 1. Jika ada gambar cover dalam bentuk base64, simpan gambar dulu
    if (gambarCoverBase64) {
      const imageFileName = `kegiatan-${Date.now()}-${slug}.jpg`;
      const base64Data = gambarCoverBase64.replace(/^data:image\/\w+;base64,/, "");

      if (token) {
        // Commit gambar ke GitHub repository
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
        // Mode Lokal FS
        const uploadDir = path.join(process.cwd(), "public", "images", "kegiatan");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path.join(uploadDir, imageFileName);
        fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));
        finalImageUrl = `/images/kegiatan/${imageFileName}`;
      }
    }

    // 2. Buat isi konten MDX
    const mdxContent = `---
judul: "${judul.replace(/"/g, '\\"')}"
tanggal: "${tanggal || new Date().toISOString().split("T")[0]}"
ringkasan: "${ringkasan.replace(/"/g, '\\"')}"
gambarCover: "${finalImageUrl}"
---

${konten}
`;

    // 3. Commit file MDX ke folder content/kegiatan/
    if (token) {
      const githubMdxUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/content/kegiatan/${mdxFileName}`;
      
      // Cek apakah file sudah ada untuk mendapatkan sha (update vs create)
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
          message: `Tambah berita kegiatan baru: ${judul}`,
          content: Buffer.from(mdxContent).toString("base64"),
          branch: BRANCH,
          ...(sha ? { sha } : {}),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return NextResponse.json(
          { success: false, message: `Gagal commit ke GitHub: ${errorData.message || "Token tidak valid / izin kurang"}` },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Berita berhasil diterbitkan! Vercel sedang melakukan deploy otomatis (1-2 menit).",
        slug,
      });
    } else {
      // Mode Lokal FS
      const kegiatanDir = path.join(process.cwd(), "content", "kegiatan");
      if (!fs.existsSync(kegiatanDir)) {
        fs.mkdirSync(kegiatanDir, { recursive: true });
      }
      fs.writeFileSync(path.join(kegiatanDir, mdxFileName), mdxContent, "utf-8");

      return NextResponse.json({
        success: true,
        message: "Berita lokal berhasil disimpan! Jangan lupa git commit & push.",
        slug,
        isLocal: true,
      });
    }
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Kesalahan server";
    return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
  }
}
