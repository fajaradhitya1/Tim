import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

export async function GET() {
  try {
    const result = await prisma.$queryRaw<{ bulan: string; jumlah: number }[]>`
      SELECT
        DATE_FORMAT(createdAt, '%Y-%m-01') AS bulan,
        COUNT(*) AS jumlah
      FROM Umkm
      WHERE status = 'Disetujui'
      GROUP BY bulan
      ORDER BY bulan ASC
    `;

    const cleanResult = result.map((item) => ({
      bulan: format(new Date(item.bulan), "MMMM yyyy", { locale: localeId }),
      jumlah: Number(item.jumlah),
    }));

    return NextResponse.json(cleanResult);
  } catch (error) {
    console.error("❌ Gagal ambil statistik per bulan:", error);
    return NextResponse.json([], { status: 200 });
  }
}
