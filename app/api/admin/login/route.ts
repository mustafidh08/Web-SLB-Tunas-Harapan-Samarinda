import { NextResponse } from "next/server";
import { 
  timingSafeCompare, 
  getRateLimitStatus, 
  recordFailedLoginAttempt, 
  resetLoginAttempts, 
  generateSessionToken,
  verifySessionToken,
  logAuditEvent
} from "@/lib/security";

const MAX_LOGIN_ATTEMPTS = 3; // Maksimal 3x percobaan login salah
const BLOCK_WINDOW_MS = 15 * 60 * 1000; // 15 Menit

// GET: Cek apakah session cookie httpOnly masih valid
export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/slb_admin_session=([^;]+)/);
  const token = match ? match[1] : null;

  if (verifySessionToken(token)) {
    return NextResponse.json({ success: true, isLoggedIn: true });
  }

  return NextResponse.json({ success: false, isLoggedIn: false }, { status: 401 });
}

// POST: Login Admin & Set httpOnly Cookie
export async function POST(request: Request) {
  try {
    // 1. Ambil IP Client untuk Anti Brute-Force Rate Limiting (Maks 3x Percobaan)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const status = getRateLimitStatus(ip, MAX_LOGIN_ATTEMPTS, BLOCK_WINDOW_MS);
    if (!status.allowed) {
      const minutesLeft = Math.ceil((status.remainingMs || 0) / 60000);
      logAuditEvent("LOGIN_BLOCKED", { reason: "Too many failed attempts", minutesLeft }, ip);
      return NextResponse.json(
        {
          success: false,
          blocked: true,
          remainingAttempts: 0,
          maxAttempts: MAX_LOGIN_ATTEMPTS,
          message: `Akses diblokir sementara karena ${MAX_LOGIN_ATTEMPTS}x salah memasukkan password. Silakan tunggu ${minutesLeft} menit sebelum mencoba lagi.`,
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
      logAuditEvent("LOGIN_SUCCESS", { status: "Authenticated" }, ip);

      // Task 2 Security: Set HttpOnly, Secure, SameSite=Strict Cookie
      const sessionToken = generateSessionToken();
      const response = NextResponse.json({ success: true, message: "Login berhasil" });

      response.cookies.set({
        name: "slb_admin_session",
        value: sessionToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7200, // 2 Jam
      });

      return response;
    } else {
      // Password Salah -> Catat percobaan gagal & hitung sisa kesempatan (Maks 3x)
      const failedResult = recordFailedLoginAttempt(ip, MAX_LOGIN_ATTEMPTS, BLOCK_WINDOW_MS);
      const sisa = failedResult.remainingAttempts;
      logAuditEvent("LOGIN_FAILED", { sisaAttempts: sisa }, ip);

      let msg = "";
      if (sisa > 0) {
        msg = `Password admin salah. Sisa kesempatan mencoba: ${sisa} kali lagi. (Jika gagal ${MAX_LOGIN_ATTEMPTS}x berturut-turut, IP Anda akan diblokir sementara selama 15 menit).`;
      } else {
        msg = `Password admin salah. Anda telah mencapai batas maksimal ${MAX_LOGIN_ATTEMPTS}x percobaan. Akses Anda diblokir sementara selama 15 menit demi keamanan.`;
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

// DELETE: Logout Admin & Hapus httpOnly Cookie
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logout berhasil" });
  response.cookies.set({
    name: "slb_admin_session",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // Hapus cookie
  });
  return response;
}
