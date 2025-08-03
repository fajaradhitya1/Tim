"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PenangkapanIkan {
  id: string;
  nama: string;
  hp: string;
  kelurahan: string;
  alamat: string;
  jenisIkan: string;
  hargaPerKg: string;
  stokKg: string;
  catatan: string;
  imageUrl: string;
  lokasi: string;
  deskripsi: string;
}

export default function HasilIkanPage() {
  const [data, setData] = useState<PenangkapanIkan[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/ikan")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatHarga = (harga: string) => {
    const parsed = parseInt(harga);
    return new Intl.NumberFormat("id-ID").format(parsed);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Daftar Penangkapan Ikan</h1>

      {loading ? (
        <p>Memuat data...</p>
      ) : data.length === 0 ? (
        <p>Belum ada data.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-md shadow hover:shadow-lg transition"
            >
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.nama || "Gambar Ikan"}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48 rounded"
                />
              )}
              <h2 className="text-xl font-semibold mt-2">{item.nama}</h2>
              <p className="text-gray-700 text-sm">
                📍 {item.alamat}, {item.kelurahan} {item.lokasi}
              </p>

              {item.deskripsi && (
                <p className="mt-2 text-sm text-gray-600">{item.deskripsi}</p>
              )}

              <p className="mt-2 text-sm text-gray-800">
                Jenis Ikan: {item.jenisIkan} | Harga: Rp{" "}
                {formatHarga(item.hargaPerKg)}/kg
              </p>
              <p className="text-sm text-gray-800">Stok: {item.stokKg} kg</p>

              {item.catatan && (
                <p className="text-sm italic text-gray-600 mt-1">
                  Catatan: {item.catatan}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center mb-10">
        <button
          onClick={() => router.back()}
          className="inline-block bg-blue-600 text-white text-lg font-semibold px-10 py-3 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          ← Kembali ke Halaman Sebelumnya
        </button>
      </div>
    </div>
  );
}
