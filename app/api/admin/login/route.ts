import { NextResponse } from "next/server";
import { timingSafeCompare, checkRateLimit } from "@/lib/security";

export async function POST(request: Request) {
  try {
    // 1. Ambil IP Client untuk Anti Brute-Force Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const rateCheck = checkRateLimit(ip, 10, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      const minutesLeft = Math.ceil((rateCheck.remainingMs || 0) / 60000);
      return NextResponse.json(
        {
          success: false,
          message: `Terlalu banyak percobaan login gagal dari IP Anda. Silakan coba lagi dalam ${minutesLeft} menit.`,
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
      return NextResponse.json({ success: true, message: "Login berhasil" });
    } else {
      return NextResponse.json(
        { success: false, message: "Password admin tidak sesuai" },
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
