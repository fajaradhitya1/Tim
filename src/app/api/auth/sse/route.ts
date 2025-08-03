import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const encoder = new TextEncoder();
  let closed = false; // status koneksi
  let timeoutId: NodeJS.Timeout; // timeout global

  const stream = new ReadableStream({
    async start(controller) {
      async function pushData() {
        if (closed) return; // jangan kirim jika koneksi sudah ditutup

        try {
          const data = await prisma.sumberDayaManusia.groupBy({
            by: ["kelurahan"],
            _count: {
              kelurahan: true,
            },
          });

          const result: Record<string, { jumlah: number }> = {};
          data.forEach(
            (d: { kelurahan: string; _count: { kelurahan: number } }) => {
              result[d.kelurahan] = { jumlah: d._count.kelurahan };
            }
          );

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(result)}\n\n`)
          );
        } catch (err) {
          console.error("Gagal push data SSE:", err);
          controller.error(err);
        }

        timeoutId = setTimeout(pushData, 3000); // ulang tiap 3 detik
      }

      pushData();
    },
    cancel() {
      closed = true;
      clearTimeout(timeoutId); // hentikan timeout jika stream ditutup
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
