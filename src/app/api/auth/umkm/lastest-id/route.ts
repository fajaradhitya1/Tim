// app/api/auth/umkm/verifikasi/[id]/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();

    // ❌ JANGAN kurangi ID
    const id = parseInt(params.id); // FIXED ✅

    const updated = await prisma.umkm.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      message: "Status berhasil diperbarui",
      updated,
    });
  } catch (err) {
    console.error("Gagal update status:", err);
    return NextResponse.json({ error: "Gagal update status" }, { status: 500 });
  }
}
