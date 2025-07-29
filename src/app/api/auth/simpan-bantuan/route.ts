import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nama, hp, kelurahan, alamat, kategori, keterangan } = body;

    const result = await prisma.sumberDayaManusia.create({
      data: {
        nama,
        hp,
        kelurahan,
        alamat,
        kategori,
        keterangan,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan data" },
      { status: 500 }
    );
  }
}
