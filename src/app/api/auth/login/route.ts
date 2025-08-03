import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { identifier, password } = await req.json();
  const cookieStore = await cookies(); // ✅ fix

  // Cek login sebagai admin
  const admin = await prisma.admin.findUnique({
    where: { adminId: identifier },
  });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    // Simpan sesi admin di cookie
    const session = { role: "ADMIN", id: admin.adminId }; // ✅ fix
    cookieStore.set("session", JSON.stringify(session), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 2, // 2 jam
    });

    return NextResponse.json({
      role: "admin",
      redirectTo: "/admin/dashboard",
    });
  }

  // Cek login sebagai user
  const user = await prisma.user.findUnique({
    where: { email: identifier },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const session = { role: "USER", id: user.id, email: user.email };
    cookieStore.set("session", JSON.stringify(session), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 2, // 2 jam
    });

    return NextResponse.json({
      role: "user",
      redirectTo: "/produk-unggulan",
      email: user.email,
      id: user.id,
    });
  }

  return NextResponse.json(
    { error: "ID atau password salah" },
    { status: 401 }
  );
}
