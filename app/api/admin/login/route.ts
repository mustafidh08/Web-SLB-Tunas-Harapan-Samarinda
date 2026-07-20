import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.ADMIN_PASSWORD || "slbtunasharapan";

    if (password === expectedPassword) {
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
