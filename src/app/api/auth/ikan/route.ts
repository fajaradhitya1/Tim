import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const file = formData.get("file") as File;
  const nama = formData.get("nama") as string;
  const hp = formData.get("hp") as string;
  const kelurahan = formData.get("kelurahan") as string;
  const alamat = formData.get("alamat") as string;
  const jenisIkan = formData.get("jenisIkan") as string;
  const hargaPerKg = parseFloat(formData.get("hargaPerKg") as string);
  const stokKg = parseFloat(formData.get("stokKg") as string);
  const catatan = formData.get("catatan") as string;
  

  if (!file || !file.name) {
    return NextResponse.json({
      success: false,
      message: "File tidak ditemukan",
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}_${file.name}`;
  const filePath = path.join(process.cwd(), "public/uploads", fileName);

  await writeFile(filePath, buffer);

  const imageUrl = `/uploads/${fileName}`; // untuk digunakan di frontend

  const data = await prisma.penangkapanIkan.create({
    data: {
      nama,
      hp,
      kelurahan,
      alamat,
      jenisIkan,
      hargaPerKg,
      stokKg,
      catatan,
      imageUrl,
    },
  });

  return NextResponse.json({ success: true, data });
}

export async function GET() {
  const data = await prisma.penangkapanIkan.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, data });
}
