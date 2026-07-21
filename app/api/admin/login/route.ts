import { NextResponse } from "next/server";
import { timingSafeCompare, getRateLimitStatus, recordFailedLoginAttempt, resetLoginAttempts } from "@/lib/security";

const MAX_LOGIN_ATTEMPTS = 5;
const BLOCK_WINDOW_MS = 15 * 60 * 1000; // 15 Menit

export async function POST(request: Request) {
  try {
    // 1. Ambil IP Client untuk Anti Brute-Force Rate Limiting (Maks 5x Percobaan)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const status = getRateLimitStatus(ip, MAX_LOGIN_ATTEMPTS, BLOCK_WINDOW_MS);
    if (!status.allowed) {
      const minutesLeft = Math.ceil((status.remainingMs || 0) / 60000);
      return NextResponse.json(
        {
          success: false,
          blocked: true,
          remainingAttempts: 0,
          maxAttempts: MAX_LOGIN_ATTEMPTS,
          message: `Akses diblokir sementara karena 5x salah memasukkan password. Silakan tunggu ${minutesLeft} menit sebelum mencoba lagi.`,
        },
        { status: 429 }
      );
    }

    const { password } = await request.json();
    if (typeof password !== "string") {
      return NextResponse.json({ success: false, message: "Format password tidak valid" }, { status: 400 });
    }

    const expectedPassword = process.env.ADMIN_PASSWORD || "slbtunasharapan";

    // 2. Timing-Safe Comparison untuk Mencegah Timing Attacks
    const isValid = timingSafeCompare(password, expectedPassword);

    if (isValid) {
      // Password Benar -> Reset jumlah percobaan gagal IP ini
      resetLoginAttempts(ip);
      return NextResponse.json({ success: true, message: "Login berhasil" });
    } else {
      // Password Salah -> Catat percobaan gagal & hitung sisa kesempatan
      const failedResult = recordFailedLoginAttempt(ip, MAX_LOGIN_ATTEMPTS, BLOCK_WINDOW_MS);
      const sisa = failedResult.remainingAttempts;

      let msg = "";
      if (sisa > 0) {
        msg = `Password admin salah. Sisa kesempatan mencoba: ${sisa} kali lagi. (Jika gagal ${MAX_LOGIN_ATTEMPTS}x berturut-turut, IP Anda akan diblokir sementara selama 15 menit).`;
      } else {
        msg = `Password admin salah. Anda telah mencapai batas maksimal 5x percobaan. Akses Anda diblokir sementara selama 15 menit demi keamanan.`;
      }

      return NextResponse.json(
        {
          success: false,
          remainingAttempts: sisa,
          maxAttempts: MAX_LOGIN_ATTEMPTS,
          message: msg,
        },
        { status: 401 }
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
