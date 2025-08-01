import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.sumberDayaManusia.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}
