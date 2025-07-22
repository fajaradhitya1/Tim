import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { identifier, password } = await req.json();

  // Cek login sebagai admin
  const admin = await prisma.admin.findUnique({
    where: { adminId: identifier },
  });

  if (admin && (await bcrypt.compare(password, admin.password))) {
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
    return NextResponse.json({
      role: "user",
      redirectTo: "/produk-unggulan",
      id: user.id, // ✅ penting untuk disimpan
      email: user.email, // ✅ bisa disimpan di localStorage
    });
  }

  // Jika login gagal
  return NextResponse.json(
    { error: "ID atau password salah" },
    { status: 401 }
  );
}
