import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// ✅ Ambil detail UMKM berdasarkan ID (GET)
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const umkm = await prisma.umkm.findUnique({
      where: { id },
    });

    if (!umkm) {
      return NextResponse.json(
        { error: "Data tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(umkm);
  } catch (err) {
    console.error("Gagal ambil data UMKM:", err);
    return NextResponse.json({ error: "Gagal ambil data" }, { status: 500 });
  }
}

// ✅ Perbarui status verifikasi UMKM (PATCH)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();
    const id = parseInt(params.id);

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
