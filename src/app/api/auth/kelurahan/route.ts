import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const kelurahan = searchParams.get("kelurahan");

  if (!kelurahan) {
    return NextResponse.json([], { status: 400 });
  }

  try {
    const data = await prisma.sumberDayaManusia.findMany({
      where: {
        kelurahan: {
          contains: kelurahan, // gunakan contains agar fleksibel
           // hapus jika masih error
        },
      },
      select: {
        nama: true,
        hp: true, // ✅ ini yang benar, bukan 'telepon'
        alamat: true,
        kategori: true,
        keterangan: true,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Gagal fetch data:", error);
    return NextResponse.json([], { status: 500 });
  }
}
