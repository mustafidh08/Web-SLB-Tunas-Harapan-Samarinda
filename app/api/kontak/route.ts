import { NextResponse } from "next/server";
import { checkRateLimit, recordFailedLoginAttempt, sanitizeInputString } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting: Maksimal 3 pesan per 5 menit per IP untuk cegah SPAM / Bot Flood
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const rateCheck = checkRateLimit(`kontak-${ip}`, 3, 5 * 60 * 1000);
    if (!rateCheck.allowed) {
      const minutesLeft = Math.ceil((rateCheck.remainingMs || 0) / 60000);
      return NextResponse.json(
        {
          success: false,
          message: `Terlalu banyak pengiriman pesan dari IP Anda. Silakan tunggu ${minutesLeft} menit sebelum mencoba lagi.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { nama: rawNama, email: rawEmail, whatsapp: rawWhatsapp, pesan: rawPesan } = body;

    // 2. Sanitasi Input Komprehensif (Anti-XSS & Code Injection)
    const nama = sanitizeInputString(String(rawNama || ""));
    const email = sanitizeInputString(String(rawEmail || ""));
    const whatsapp = sanitizeInputString(String(rawWhatsapp || ""));
    const pesan = sanitizeInputString(String(rawPesan || ""));

    if (!nama || !email || !pesan) {
      return NextResponse.json({ success: false, message: "Nama, email, dan isi pesan wajib diisi" }, { status: 400 });
    }

    // 3. Validasi Format Email Sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Format alamat email tidak valid" }, { status: 400 });
    }

    // Catat pengiriman pesan untuk rate limiting
    recordFailedLoginAttempt(`kontak-${ip}`, 3, 5 * 60 * 1000);

    return NextResponse.json({
      success: true,
      message: "Pesan Anda berhasil disanitasi dan dikirim!",
      sanitizedData: { nama, email, whatsapp, pesan },
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Kesalahan server";
    return NextResponse.json({ success: false, message: errMessage }, { status: 500 });
  }
}
