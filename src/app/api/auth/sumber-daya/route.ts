import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

// GET: Ambil data
export async function GET() {
  try {
    const data = await prisma.sumberDayaMasyarakat.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      { message: "Gagal memuat data." },
      { status: 500 }
    );
  }
}

// POST: Simpan data
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const getValue = (key: string): string => {
      const value = formData.get(key);
      return typeof value === "string" ? value.trim() : "";
    };

    const nama = getValue("nama");
    const telepon = getValue("telepon");
    const produk = getValue("produk");
    const lainnyaRaw = formData.get("lainnya");
    const lainnya =
      produk === "Lainnya" && typeof lainnyaRaw === "string"
        ? lainnyaRaw.trim()
        : null;
    const alamat = getValue("alamat");
    const kelurahan = getValue("kelurahan");
    const jenis = getValue("jenis");
    const keterangan = getValue("keterangan");

    const requiredFields: Record<string, string> = {
      nama,
      telepon,
      produk,
      alamat,
      kelurahan,
      jenis,
      keterangan,
    };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        return NextResponse.json(
          { status: "error", message: `${key} wajib diisi.` },
          { status: 400 }
        );
      }
    }

    let imageUrl: string | null = null;
    if (produk === "Lainnya") {
      const file = formData.get("foto") as File;
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), "public", "uploads");
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        const filePath = path.join(uploadDir, filename);

        await writeFile(filePath, buffer);
        imageUrl = `/uploads/${filename}`;
      }
    }

    const data = await prisma.sumberDayaMasyarakat.create({
      data: {
        nama,
        telepon,
        produk: produk === "Lainnya" && lainnya ? lainnya : produk,
        lainnya: produk === "Lainnya" ? lainnya : null,
        alamat,
        kelurahan,
        jenis,
        keterangan,
        imageUrl,
      },
    });

    return NextResponse.json({ status: "success", data }, { status: 201 });
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json(
      { status: "error", message: "Gagal menambah data." },
      { status: 500 }
    );
  }
}
