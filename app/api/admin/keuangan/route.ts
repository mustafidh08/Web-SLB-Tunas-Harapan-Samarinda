import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { 
  timingSafeCompare, 
  sanitizeInputString, 
  verifySessionToken 
} from "@/lib/security";

const REPO_OWNER = "mustafidh08";
const REPO_NAME = "Web-SLB-Tunas-Harapan-Samarinda";
const BRANCH = "main";

export const dynamic = "force-dynamic";

function isAuthorized(request: Request, passwordFromReq?: string): boolean {
  const expectedPassword = process.env.ADMIN_PASSWORD || "slbtunasharapan";
  if (passwordFromReq && timingSafeCompare(String(passwordFromReq), expectedPassword)) {
    return true;
  }
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/slb_admin_session=([^;]+)/);
  const token = match ? match[1] : null;
  return verifySessionToken(token);
}

function getFilePath(): string {
  return path.join(process.cwd(), "data", "keuangan.json");
}

function readData() {
  const filePath = getFilePath();
  if (!fs.existsSync(filePath)) {
    return {
      ringkasan: { totalPemasukan: 0, totalPengeluaran: 0, saldoKas: 0, terakhirDiperbarui: new Date().toISOString().split("T")[0] },
      laporanDokumen: [],
      transaksi: [],
    };
  }
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

// GET: Ambil data rekapitulasi keuangan & laporan
export async function GET() {
  try {
    const data = readData();
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Gagal membaca data keuangan";
    return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
  }
}

// POST: Add / Edit transaksi atau dokumen laporan keuangan
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, password, githubToken, transaksiData, dokumenData } = body;

    if (!isAuthorized(request, password)) {
      return NextResponse.json({ success: false, message: "Akses ditolak: Password/Sesi Admin tidak valid" }, { status: 401 });
    }

    const data = readData();

    if (action === "ADD_TRANSAKSI" && transaksiData) {
      const newTrx = {
        id: `trx-${Date.now()}`,
        tanggal: sanitizeInputString(transaksiData.tanggal || new Date().toISOString().split("T")[0]),
        uraian: sanitizeInputString(transaksiData.uraian || ""),
        kategori: sanitizeInputString(transaksiData.kategori || "Donasi Masuk"),
        tipe: transaksiData.tipe === "pemasukan" ? "pemasukan" : "pengeluaran",
        nominal: Number(transaksiData.nominal) || 0,
        buktiUrl: sanitizeInputString(transaksiData.buktiUrl || ""),
      };

      data.transaksi.unshift(newTrx);
    } else if (action === "ADD_DOKUMEN" && dokumenData) {
      const newDoc = {
        id: `doc-${Date.now()}`,
        judul: sanitizeInputString(dokumenData.judul || ""),
        periode: sanitizeInputString(dokumenData.periode || ""),
        fileUrl: sanitizeInputString(dokumenData.fileUrl || ""),
        tanggalUpload: new Date().toISOString().split("T")[0],
      };

      data.laporanDokumen.unshift(newDoc);
    } else {
      return NextResponse.json({ success: false, message: "Aksi tidak dikenal" }, { status: 400 });
    }

    // Hitung Ulang Ringkasan Kas
    let totalPemasukan = 0;
    let totalPengeluaran = 0;

    data.transaksi.forEach((t: { tipe: string; nominal: number }) => {
      if (t.tipe === "pemasukan") {
        totalPemasukan += Number(t.nominal) || 0;
      } else {
        totalPengeluaran += Number(t.nominal) || 0;
      }
    });

    data.ringkasan = {
      totalPemasukan,
      totalPengeluaran,
      saldoKas: totalPemasukan - totalPengeluaran,
      terakhirDiperbarui: new Date().toISOString().split("T")[0],
    };

    const updatedContent = JSON.stringify(data, null, 2);

    // Simpan ke filesystem lokal
    const filePath = getFilePath();
    fs.writeFileSync(filePath, updatedContent, "utf-8");

    // Commit ke GitHub API jika token tersedia
    const ghToken = githubToken || process.env.GITHUB_TOKEN;
    if (ghToken) {
      const gitPath = "slb-tunas-harapan/data/keuangan.json";
      try {
        const getShaRes = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${gitPath}?ref=${BRANCH}`,
          { headers: { Authorization: `Bearer ${ghToken}`, Accept: "application/vnd.github.v3+json" } }
        );
        let sha = "";
        if (getShaRes.ok) {
          const shaData = await getShaRes.json();
          sha = shaData.sha;
        }

        await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${gitPath}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${ghToken}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify({
            message: `feat(keuangan): update laporan & rekapitulasi donasi via CMS Admin`,
            content: Buffer.from(updatedContent).toString("base64"),
            sha: sha || undefined,
            branch: BRANCH,
          }),
        });
      } catch (e) {
        console.error("Gagal commit GitHub:", e);
      }
    }

    return NextResponse.json({ success: true, message: "Data keuangan berhasil diperbarui!", data });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Gagal memproses data keuangan";
    return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
  }
}

// DELETE: Hapus transaksi atau dokumen laporan
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id, type, password, githubToken } = body;

    if (!isAuthorized(request, password)) {
      return NextResponse.json({ success: false, message: "Akses ditolak: Password/Sesi Admin tidak valid" }, { status: 401 });
    }

    const data = readData();

    if (type === "TRANSAKSI") {
      data.transaksi = data.transaksi.filter((t: { id: string }) => t.id !== id);
    } else if (type === "DOKUMEN") {
      data.laporanDokumen = data.laporanDokumen.filter((d: { id: string }) => d.id !== id);
    } else {
      return NextResponse.json({ success: false, message: "Tipe hapus tidak valid" }, { status: 400 });
    }

    // Hitung Ulang Ringkasan Kas
    let totalPemasukan = 0;
    let totalPengeluaran = 0;

    data.transaksi.forEach((t: { tipe: string; nominal: number }) => {
      if (t.tipe === "pemasukan") {
        totalPemasukan += Number(t.nominal) || 0;
      } else {
        totalPengeluaran += Number(t.nominal) || 0;
      }
    });

    data.ringkasan = {
      totalPemasukan,
      totalPengeluaran,
      saldoKas: totalPemasukan - totalPengeluaran,
      terakhirDiperbarui: new Date().toISOString().split("T")[0],
    };

    const updatedContent = JSON.stringify(data, null, 2);
    const filePath = getFilePath();
    fs.writeFileSync(filePath, updatedContent, "utf-8");

    const ghToken = githubToken || process.env.GITHUB_TOKEN;
    if (ghToken) {
      const gitPath = "slb-tunas-harapan/data/keuangan.json";
      try {
        const getShaRes = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${gitPath}?ref=${BRANCH}`,
          { headers: { Authorization: `Bearer ${ghToken}`, Accept: "application/vnd.github.v3+json" } }
        );
        let sha = "";
        if (getShaRes.ok) {
          const shaData = await getShaRes.json();
          sha = shaData.sha;
        }

        await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${gitPath}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${ghToken}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify({
            message: `fix(keuangan): hapus catatan ${type.toLowerCase()} via CMS Admin`,
            content: Buffer.from(updatedContent).toString("base64"),
            sha: sha || undefined,
            branch: BRANCH,
          }),
        });
      } catch (e) {
        console.error("Gagal commit GitHub:", e);
      }
    }

    return NextResponse.json({ success: true, message: "Catatan berhasil dihapus!", data });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Gagal menghapus catatan";
    return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
  }
}
