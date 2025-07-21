import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("✅ Body diterima:", body);

    const { email, password } = body;

    const existing = await prisma.user.findUnique({ where: { email } });
    console.log("✅ Cek existing user:", existing);

    if (existing) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password berhasil di-hash");

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "user",
      },
    });
    console.log("✅ User berhasil dibuat:", newUser);

    // ⛔ Jangan set cookie di sini, biar hanya login yang buat sesi
    return NextResponse.json({ redirectTo: "/login" });
  } catch (error) {
    console.error("❌ Register Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mendaftarkan akun." },
      { status: 500 }
    );
  }
}
