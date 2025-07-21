"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useWilayahStore } from "@/app/store/WilayahStore";
import { villageLocations } from "@/app/data/villages";
import WilayahFilter from "@/components/WilayahFilter";
import Navbar from "@/components/Navbar";
import Image from "next/image";

// Dynamic import peta
const MapWilayah = dynamic(() => import("@/components/MapWilayah"), {
  ssr: false,
});

export default function ProdukUnggulanPage() {
  const { wilayahData, setWilayahData, selectedWilayah } = useWilayahStore();
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const [umkmList, setUmkmList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [nama, setNama] = useState("");
  const [wilayah, setWilayah] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    const loginStatus = localStorage.getItem("isUserLoggedIn") === "true";
    const email = localStorage.getItem("userEmail");
    setIsLoggedIn(loginStatus);
    setUserEmail(email);
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.warn("Gagal ambil lokasi:", err)
      );
    }
  }, []);

  useEffect(() => {
    setWilayahData(villageLocations);
  }, [setWilayahData]);

  useEffect(() => {
    const fetchUMKM = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/auth/umkm");
        if (!res.ok) throw new Error("Failed to fetch UMKM");
        const data = await res.json();
        setUmkmList(data);
      } catch (err) {
        console.error("Gagal ambil UMKM:", err);
      }
      setIsLoading(false);
    };
    fetchUMKM();
  }, []);

  const filtered = useMemo(() => {
    const combined = [...villageLocations, ...umkmList];
    if (!selectedWilayah) return combined;
    return combined.filter((d) => d.wilayah === selectedWilayah);
  }, [selectedWilayah, umkmList]);

  const scrollToMap = () => {
    mapContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coords || !imageFile)
      return alert("Lengkapi semua data dan aktifkan lokasi");

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("wilayah", wilayah);
    formData.append("deskripsi", deskripsi);
    formData.append("lat", String(coords.lat));
    formData.append("lng", String(coords.lng));
    formData.append("image", imageFile);

    const res = await fetch("/api/auth/umkm", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const newItem = await res.json();
      setUmkmList((prev) => [...prev, newItem]);
      setNama("");
      setWilayah("");
      setDeskripsi("");
      setImageFile(null);
      alert("UMKM berhasil ditambahkan!");
    } else {
      alert("Gagal menambahkan UMKM.");
    }
  };

  return (
    <>
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight">
            Produk Unggulan <span className="text-green-600">UMKM</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Eksplorasi produk lokal terbaik dari berbagai wilayah.
          </p>
          {isLoggedIn && userEmail && (
            <p className="mt-4 text-sm text-gray-600">
              Selamat datang, <span className="font-semibold">{userEmail}</span>
              !
            </p>
          )}
          {isLoggedIn && (
            <button
              onClick={() => {
                localStorage.removeItem("isUserLoggedIn");
                localStorage.removeItem("userEmail");
                window.location.href = "/login";
              }}
              className="mt-3 text-sm text-red-500 underline"
            >
              Logout
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <div className="flex space-x-6">
            {filtered.map((item) => (
              <div
                key={`${item.id}-${item.nama}`}
                className="min-w-[300px] bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={scrollToMap}
              >
                <Image
                  src={item.imageUrl || "/produk/default.jpg"}
                  alt={item.nama || "Produk"}
                  width={300}
                  height={200}
                  className="object-cover w-full h-48 rounded-t-xl"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.nama}
                  </h2>
                  <p className="text-sm text-gray-500">{item.wilayah}</p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                    {item.deskripsi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-3">Filter Wilayah</h2>
        <WilayahFilter />
      </section>

      <section ref={mapContainerRef} className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-3">Peta Wilayah</h2>
        <MapWilayah reports={filtered} mapRef={mapRef} />
      </section>

      {isLoggedIn ? (
        <section className="max-w-5xl mx-auto px-6 py-10">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="bg-green-600 text-white text-xl font-semibold px-6 py-4 rounded-t-2xl">
              Tambah Produk UMKM
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-6 px-6 py-6"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                    placeholder="Contoh: Kopi Gayo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wilayah
                  </label>
                  <input
                    type="text"
                    value={wilayah}
                    onChange={(e) => setWilayah(e.target.value)}
                    required
                    placeholder="Contoh: Desa Timbang Langkat"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    required
                    rows={5}
                    placeholder="Tuliskan deskripsi produk"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gambar Produk
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm"
                  />
                </div>

                <div className="text-right mt-auto">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-md transition"
                  >
                    Simpan UMKM
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      ) : (
        <div className="text-center my-10">
          <p className="text-gray-600 mb-4">
            Silakan login terlebih dahulu untuk menambahkan UMKM.
          </p>
          <a
            href="/login"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            Login Sekarang
          </a>
        </div>
      )}
    </>
  );
}
