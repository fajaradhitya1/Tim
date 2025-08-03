"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
} from "recharts";
import Navbar from "../../../components/Navbar";
import clsx from "clsx";
import { villageLocations } from "@/app/data/villages";
import { div } from "framer-motion/client";
import Monitoring from "@/app/monitoring/page";

export default function AdminDashboard() {
  const router = useRouter();
  const [umkmData, setUmkmData] = useState<any[]>([]);
  const [wilayahStats, setWilayahStats] = useState<any[]>([]);
  const [statsBulan, setStatsBulan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [latestId, setLatestId] = useState<number | null>(null);
  const [selectedWilayah, setSelectedWilayah] = useState<string>("Semua");
  const [selectedChart, setSelectedChart] = useState<string>("Wilayah");
  const [collapsed, setCollapsed] = useState(false);

  const wilayahList = villageLocations.map((v) => v.wilayah);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        if (data.role !== "ADMIN") {
          router.push("/login");
        }
      } catch {
        router.push("/login");
      }
    };
    checkSession();
  }, [router]);


  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/umkm");
      if (!res.ok) throw new Error("Gagal ambil data UMKM");
      const data = await res.json();
      setUmkmData(data);
      if (data.length > 0) {
        setLatestId(data[data.length - 1].id);
      }
    } catch (error) {
      console.error(error);
      setUmkmData([]);
    }
    setLoading(false);
  };

  const fetchStatsByWilayah = () => {
    const stats = umkmData
      .filter(
        (item) =>
          item.status === "Disetujui" && wilayahList.includes(item.wilayah)
      )
      .reduce((acc, curr) => {
        acc[curr.wilayah] = (acc[curr.wilayah] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const formatted = Object.entries(stats).map(([wilayah, jumlah]) => ({
      wilayah,
      jumlah,
    }));

    formatted.sort(
      (a, b) => wilayahList.indexOf(a.wilayah) - wilayahList.indexOf(b.wilayah)
    );

    setWilayahStats(formatted);
  };

  const fetchStatsByBulan = () => {
    const stats = umkmData
      .filter(
        (item) =>
          item.status === "Disetujui" && wilayahList.includes(item.wilayah)
      )
      .reduce((acc, curr) => {
        const bulan = new Date(curr.createdAt).getMonth() + 1;
        acc[bulan] = (acc[bulan] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);

    const formatted = Object.entries(stats).map(([bulan, jumlah]) => ({
      bulan,
      jumlah,
    }));
    setStatsBulan(formatted);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchStatsByWilayah();
    fetchStatsByBulan();
  }, [umkmData]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/auth/umkm/latest-id");
        if (!res.ok) return;
        const { latestId: serverId } = await res.json();
        if (serverId !== latestId) {
          fetchData();
        }
      } catch (error) {
        console.error("Gagal cek data terbaru:", error);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [latestId]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;
    try {
      const res = await fetch(`/api/auth/umkm/${id}`, { method: "DELETE" });
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

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Yakin ingin logout?");
    if (!confirmLogout) return;

    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout gagal:", error);
      alert("Terjadi kesalahan saat logout.");
    }
  };

  const handleVerifikasi = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/auth/umkm/verifikasi/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchData();
      } else {
        alert("Gagal memperbarui status.");
      }
    } catch (error) {
      console.error("Verifikasi gagal:", error);
      alert("Terjadi kesalahan.");
    }
  };

  return (
    <>
      <div>
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main
          className={clsx(
            "transition-all duration-300 px-6 sm:px-10 pt-10",
            collapsed ? "md:ml-20" : "md:ml-64"
          )}
        >
          <header className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Dashboard Admin
              </h1>
              <p className="text-gray-500 mt-1">
                Selamat datang di panel admin
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md transition"
            >
              Logout
            </button>
          </header>

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
            <div className="bg-white rounded-xl shadow-md p-6 col-span-full">
              <h2 className="text-xl font-medium text-gray-700 mb-4">
                Statistik UMKM (Gabungan)
              </h2>
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                  <label
                    htmlFor="chartType"
                    className="block text-gray-700 mb-1"
                  >
                    Lihat berdasarkan:
                  </label>
                  <select
                    id="chartType"
                    value={selectedChart}
                    onChange={(e) => setSelectedChart(e.target.value)}
                    className="p-2 border rounded-md"
                  >
                    <option value="Wilayah">Wilayah</option>
                    <option value="Bulan">Bulan</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="wilayahFilter"
                    className="block text-gray-700 mb-1"
                  >
                    Filter Wilayah:
                  </label>
                  <select
                    id="wilayahFilter"
                    value={selectedWilayah}
                    onChange={(e) => setSelectedWilayah(e.target.value)}
                    className="p-2 border rounded-md"
                  >
                    <option value="Semua">Semua Wilayah</option>
                    {wilayahList.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {selectedChart === "Wilayah" ? (
                wilayahStats.length === 0 ? (
                  <p>Belum ada data</p>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={
                        selectedWilayah === "Semua"
                          ? wilayahStats
                          : wilayahStats.filter(
                              (item) => item.wilayah === selectedWilayah
                            )
                      }
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="wilayah" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="jumlah" fill="#3B82F6">
                        <LabelList dataKey="jumlah" position="top" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )
              ) : statsBulan.length === 0 ? (
                <p>Belum ada data</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={
                      selectedWilayah === "Semua"
                        ? statsBulan
                        : statsBulan.map((bulanStat) => {
                            const filtered = umkmData.filter(
                              (item) =>
                                item.status === "Disetujui" &&
                                wilayahList.includes(item.wilayah) &&
                                item.wilayah === selectedWilayah &&
                                new Date(item.createdAt).getMonth() + 1 ===
                                  parseInt(bulanStat.bulan)
                            );
                            return {
                              bulan: bulanStat.bulan,
                              jumlah: filtered.length,
                            };
                          })
                    }
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bulan" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="jumlah" fill="#10B981">
                      <LabelList dataKey="jumlah" position="top" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>

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
                  <thead className="sticky top-0 bg-gray-200 z-10">
                    <tr>
                      <th className="p-2 border">No</th>
                      <th className="p-2 border">Nama</th>
                      <th className="p-2 border">Wilayah</th>
                      <th className="p-2 border">Deskripsi</th>
                      <th className="p-2 border">Gambar</th>
                      <th className="p-2 border">Status</th>
                      <th className="p-2 border">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {umkmData.map((item, i) => (
                      <tr key={item.id}>
                        <td className="p-2 border">{i + 1}</td>
                        <td className="p-2 border whitespace-nowrap">
                          {item.nama}
                        </td>
                        <td className="p-2 border whitespace-nowrap">
                          {item.wilayah}
                        </td>
                        <td className="p-2 border max-w-[200px] break-words text-sm">
                          {item.deskripsi}
                        </td>
                        <td className="p-2 border">
                          <img
                            src={item.imageUrl}
                            alt={item.nama}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="p-2 border">
                          <span
                            className={clsx(
                              "px-2 py-1 text-sm rounded",
                              item.status === "Disetujui" &&
                                "bg-green-100 text-green-700",
                              item.status === "Ditolak" &&
                                "bg-red-100 text-red-700",
                              item.status === "Menunggu" &&
                                "bg-yellow-100 text-yellow-800"
                            )}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-2 border space-x-2 whitespace-nowrap">
                          {item.status === "Menunggu" ? (
                            <>
                              <button
                                onClick={() =>
                                  handleVerifikasi(item.id, "Disetujui")
                                }
                                className="text-green-600 hover:underline"
                              >
                                Setujui
                              </button>
                              <button
                                onClick={() =>
                                  handleVerifikasi(item.id, "Ditolak")
                                }
                                className="text-red-600 hover:underline"
                              >
                                Tolak
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:underline"
                            >
                              Hapus
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Monitoring
            </h2>
            <div className="bg-white rounded-xl shadow p-6 w-full overflow-x-auto">
              <Monitoring />
            </div>
          </section>
        </main>
        <footer className="footer mt-5 py-3 bg-light border-top">
          <div className="container text-center">
            <span className="text-muted">
              &copy; {new Date().getFullYear()} Kerjasama Kecamatan Stabat -
              Universitas Satya Terra Bhinneka
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

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
