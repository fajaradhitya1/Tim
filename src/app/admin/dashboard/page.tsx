"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [umkmData, setUmkmData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Dummy validasi admin (ganti dengan session asli jika ada)
  useEffect(() => {
    const isAdmin = true;
    if (!isAdmin) {
      router.push("/login");
    }
  }, [router]);

  // Fetch data UMKM
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/umkm");
      if (!res.ok) throw new Error("Gagal ambil data UMKM");
      const data = await res.json();
      setUmkmData(data);
    } catch (error) {
      console.error(error);
      setUmkmData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // polling tiap 5 detik
    return () => clearInterval(interval);
  }, []);

  // Hapus data UMKM (dengan id offset)
  const handleDelete = async (idOffset: number) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/auth/umkm/${idOffset}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (res.ok) {
        alert("Data berhasil dihapus.");
        fetchData();
      } else {
        alert("Gagal menghapus: " + result.message);
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard Admin</h1>
        <p className="text-gray-500 mt-1">Selamat datang di panel admin</p>
      </header>

      {/* Statistik Ringkas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Pengguna"
          value="123"
          color="text-blue-600"
        />
        <DashboardCard
          title="Laporan Masuk"
          value={String(umkmData.length)}
          color="text-green-600"
        />
        <DashboardCard
          title="Status Sistem"
          value="Aktif"
          color="text-gray-700"
          isText
        />
      </section>

      {/* Tabel Data UMKM */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Data UMKM yang Diunggah
        </h2>
        <div className="bg-white rounded-xl shadow p-6 overflow-auto max-h-[600px]">
          {loading ? (
            <p>Loading...</p>
          ) : umkmData.length === 0 ? (
            <p>Tidak ada data UMKM.</p>
          ) : (
            <table className="min-w-full table-auto text-left border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">No</th>
                  <th className="p-2 border">Nama</th>
                  <th className="p-2 border">Wilayah</th>
                  <th className="p-2 border">Deskripsi</th>
                  <th className="p-2 border">Gambar</th>
                  <th className="p-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {umkmData.map((item, i) => (
                  <tr key={item.id}>
                    <td className="p-2 border">{i + 1}</td>
                    <td className="p-2 border">{item.nama}</td>
                    <td className="p-2 border">{item.wilayah}</td>
                    <td className="p-2 border">{item.deskripsi}</td>
                    <td className="p-2 border">
                      <img
                        src={item.imageUrl}
                        alt={item.nama}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}

// Komponen kartu statistik
function DashboardCard({
  title,
  value,
  color,
  isText = false,
}: {
  title: string;
  value: string;
  color: string;
  isText?: boolean;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-medium text-gray-700 mb-2">{title}</h2>
      <p className={`text-2xl font-bold ${isText ? "text-lg" : ""} ${color}`}>
        {value}
      </p>
    </div>
  );
}
