import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result: { wilayah: string; jumlah: number }[] =
      await prisma.$queryRawUnsafe(`
        SELECT wilayah, COUNT(*) AS jumlah
        FROM Umkm
        WHERE status = 'Disetujui'
        GROUP BY wilayah
        ORDER BY wilayah ASC
      `);

    // Konversi jumlah ke number jika masih BigInt
    const parsed = result.map((r) => ({
      wilayah: r.wilayah,
      jumlah: typeof r.jumlah === "bigint" ? Number(r.jumlah) : r.jumlah,
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("❌ Gagal ambil data per wilayah:", error);
    return NextResponse.json([], { status: 200 });
  }
}
