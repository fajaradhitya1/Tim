import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
  }

  try {
    await prisma.umkm.delete({ where: { id } });
    return NextResponse.json({ message: "UMKM berhasil dihapus" });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menghapus", error },
      { status: 500 }
    );
  }
}
