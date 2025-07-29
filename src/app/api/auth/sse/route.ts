import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      async function pushData() {
        const data = await prisma.sumberDayaManusia.groupBy({
          by: ["kelurahan"],
          _count: {
            kelurahan: true,
          },
        });

        // ⬇️ Tambahkan tipe eksplisit di sini
        const result: Record<string, { jumlah: number }> = {};
        data.forEach(
          (d: { kelurahan: string; _count: { kelurahan: number } }) => {
            result[d.kelurahan] = { jumlah: d._count.kelurahan };
          }
        );

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(result)}\n\n`)
        );

        setTimeout(pushData, 3000); // kirim ulang setiap 3 detik
      }

      pushData();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
