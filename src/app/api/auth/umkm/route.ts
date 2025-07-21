import { writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Ambil semua data UMKM
export async function GET() {
  const data = await prisma.umkm.findMany();
  const withOffset = data.map((d) => ({ ...d, id: d.id + 1000 }));
  return NextResponse.json(withOffset);
}

// POST: Simpan data UMKM + gambar upload
export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const nama = formData.get("nama") as string;
  const wilayah = formData.get("wilayah") as string;
  const deskripsi = formData.get("deskripsi") as string;
  const lat = parseFloat(formData.get("lat") as string);
  const lng = parseFloat(formData.get("lng") as string);
  const image = formData.get("image") as File;

  if (!image || !image.name) {
    return NextResponse.json({ message: "No image uploaded" }, { status: 400 });
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
    },
  });

  return NextResponse.json({ ...newUMKM, id: newUMKM.id + 1000 });
}

// DELETE: Nonaktifkan, karena DELETE sekarang pakai [id]/route.ts
export async function DELETE() {
  return NextResponse.json(
    { message: "Gunakan endpoint /api/auth/umkm/[id] untuk menghapus" },
    { status: 405 }
  );
}
