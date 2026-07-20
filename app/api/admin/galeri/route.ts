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
      kategori,
      alt,
      gambarBase64,
      gambarUrl,
      githubToken: tokenFromReq,
      password,
    } = body;

    // Verifikasi password
    const expectedPassword = process.env.ADMIN_PASSWORD || "slbtunasharapan";
    if (password !== expectedPassword) {
      return NextResponse.json({ success: false, message: "Password admin salah" }, { status: 401 });
    }

    if (!judul || !kategori) {
      return NextResponse.json({ success: false, message: "Judul foto dan kategori wajib diisi" }, { status: 400 });
    }

    const token = tokenFromReq || process.env.GITHUB_TOKEN;
    const slug = judul
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    const photoId = `${kategori}-${Date.now().toString().slice(-4)}`;

    let finalImageUrl = gambarUrl || "/images/galeri/kegiatan/default.jpg";

    // 1. Upload foto ke folder public/images/galeri/[kategori]/
    if (gambarBase64) {
      const imageFileName = `${slug}-${Date.now()}.jpg`;
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
            message: `Upload foto galeri baru: ${judul}`,
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

    const newPhotoItem = {
      id: photoId,
      judul,
      kategori,
      src: finalImageUrl,
      alt: alt || judul,
    };

    // 2. Perbarui file content/data/galeri.ts
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
      const currentContent = Buffer.from(fileData.content, "base64").toString("utf-8");

      // Sisipkan item baru di awal array dataGaleri = [ ... ]
      const arrayStartIndex = currentContent.indexOf("export const dataGaleri: FotoGaleri[] = [");
      if (arrayStartIndex === -1) {
        return NextResponse.json({ success: false, message: "Format file galeri.ts tidak dapat diparse" }, { status: 500 });
      }

      const insertPos = currentContent.indexOf("[", arrayStartIndex) + 1;
      const jsonItemString = `\n  ${JSON.stringify(newPhotoItem, null, 4).replace(/\n/g, "\n  ")},`;
      const updatedContent = currentContent.slice(0, insertPos) + jsonItemString + currentContent.slice(insertPos);

      const putRes = await fetch(githubFileUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "SLB-Admin-Panel",
        },
        body: JSON.stringify({
          message: `Tambah foto galeri baru: ${judul}`,
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
        message: "Foto galeri baru berhasil disimpan! Vercel sedang melakukan deploy otomatis.",
        item: newPhotoItem,
      });
    } else {
      // Mode FS Lokal
      const filePath = path.join(process.cwd(), "content", "data", "galeri.ts");
      const currentContent = fs.readFileSync(filePath, "utf-8");
      const arrayStartIndex = currentContent.indexOf("export const dataGaleri: FotoGaleri[] = [");
      const insertPos = currentContent.indexOf("[", arrayStartIndex) + 1;
      const jsonItemString = `\n  ${JSON.stringify(newPhotoItem, null, 4).replace(/\n/g, "\n  ")},`;
      const updatedContent = currentContent.slice(0, insertPos) + jsonItemString + currentContent.slice(insertPos);

      fs.writeFileSync(filePath, updatedContent, "utf-8");

      return NextResponse.json({
        success: true,
        message: "Foto galeri berhasil disimpan secara lokal!",
        item: newPhotoItem,
        isLocal: true,
      });
    }
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Kesalahan server";
    return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
  }
}
