import { writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 🔄 Reverse geocoding
async function reverseGeocode(lat: number, lng: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
  const res = await fetch(url, {
    headers: { "User-Agent": "umkm-app" },
  });

  if (!res.ok) {
    console.error("Gagal reverse geocoding:", res.status);
    return null;
  }

  const data = await res.json();
  return data.address?.road || "Jalan tidak diketahui";
}

// 📝 POST: Tambah UMKM
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

    if (!userId || !image || !image.name) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const roadName = await reverseGeocode(lat, lng);

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
        jalan: roadName,
        lat,
        lng,
        imageUrl: `/uploads/${fileName}`,
        userId,
        status: "Menunggu",
      },
    });

    return NextResponse.json({ ...newUMKM, id: newUMKM.id + 1000 });
  } catch (error) {
    console.error("❌ UMKM POST ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// 📥 GET: Ambil semua data UMKM
export async function GET() {
  try {
    const umkm = await prisma.umkm.findMany();
    return NextResponse.json(umkm);
  } catch (error) {
    console.error("❌ UMKM GET ERROR:", error);
    return NextResponse.json(
      { message: "Gagal ambil data UMKM" },
      { status: 500 }
    );
  }
}
