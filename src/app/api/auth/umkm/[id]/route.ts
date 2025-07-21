import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import { unlink } from "fs/promises";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const idParam = params.id;
  if (!idParam) {
    return NextResponse.json(
      { message: "ID tidak ditemukan" },
      { status: 400 }
    );
  }

  const realId = parseInt(idParam) - 1000;

  try {
    // Cek apakah data UMKM ada
    const existing = await prisma.umkm.findUnique({
      where: { id: realId },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "Data UMKM tidak ditemukan" },
        { status: 404 }
      );
    }

    // Hapus file gambar jika ada
    if (existing.imageUrl) {
      const imagePath = path.join(process.cwd(), "public", existing.imageUrl);
      try {
        await unlink(imagePath);
      } catch (err) {
        console.warn("Gagal menghapus file gambar:", err);
        // Tidak fatal kalau file tidak ditemukan
      }
    }

    // Hapus data dari database
    await prisma.umkm.delete({
      where: { id: realId },
    });

    return NextResponse.json({ message: "UMKM berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus UMKM:", error);
    return NextResponse.json(
      { message: "Gagal menghapus data" },
      { status: 500 }
    );
  }
}
