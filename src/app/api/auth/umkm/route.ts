import { writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Ambil semua data UMKM
export async function GET() {
  try {
    const data = await prisma.umkm.findMany();
    const withOffset = data.map((d) => ({ ...d, id: d.id + 1000 }));
    return NextResponse.json(withOffset);
  } catch (error) {
    console.error("❌ UMKM GET ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// POST: Simpan data UMKM + upload gambar
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const nama = formData.get("nama") as string;
    const wilayah = formData.get("wilayah") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const lat = parseFloat(formData.get("lat") as string);
    const lng = parseFloat(formData.get("lng") as string);
    const userId = formData.get("userId") as string;
    const image = formData.get("image") as File;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID wajib ada" },
        { status: 400 }
      );
    }

    if (!image || !image.name) {
      return NextResponse.json(
        { message: "No image uploaded" },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${image.name.replace(/\s+/g, "_")}`;
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);

    await writeFile(filePath, buffer);

    const newUMKM = await prisma.umkm.create({
      data: {
        nama,
        wilayah,
        deskripsi,
        lat,
        lng,
        imageUrl: `/uploads/${fileName}`,
        userId, // ✅ penting
      },
    });

    return NextResponse.json({ ...newUMKM, id: newUMKM.id + 1000 });
  } catch (error) {
    console.error("❌ UMKM POST ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// DELETE: Nonaktifkan karena DELETE pakai [id]/route.ts
export async function DELETE() {
  return NextResponse.json(
    { message: "Gunakan endpoint /api/auth/umkm/[id] untuk menghapus" },
    { status: 405 }
  );
}
