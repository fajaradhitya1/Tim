import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { status } = await req.json();

  // 👉 Convert dan kurangi offset 1000
  const id = parseInt(params.id);


  try {
    await prisma.umkm.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ message: "Status berhasil diperbarui" });
  } catch (err) {
    console.error("Gagal update status:", err);
    return NextResponse.json({ error: "Gagal update status" }, { status: 500 });
  }
}
