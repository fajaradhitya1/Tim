"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useWilayahStore } from "@/app/store/WilayahStore";
import { villageLocations } from "@/app/data/villages";
import WilayahFilter from "@/components/WilayahFilter";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import clsx from "clsx";

const MapWilayah = dynamic(() => import("@/components/MapWilayah"), {
  ssr: false,
});
const MiniMap = dynamic(() => import("@/components/MiniMap"), {
  ssr: false,
});

async function getRoadName(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      {
        headers: {
          "User-Agent": "umkm-app",
        },
      }
    );
    if (!res.ok) throw new Error("Reverse geocoding failed");
    const data = await res.json();
    return data?.address?.road || "Jalan tidak diketahui";
  } catch (err) {
    console.error("Gagal mendapatkan nama jalan:", err);
    return "Jalan tidak diketahui";
  }
}

function getNearestWilayah(
  coords: { lat: number; lng: number },
  list: typeof villageLocations
) {
  let minDistance = Infinity;
  let nearest = list[0];
  for (const loc of list) {
    const dist = Math.sqrt(
      Math.pow(loc.lat - coords.lat, 2) + Math.pow(loc.lng - coords.lng, 2)
    );
    if (dist < minDistance) {
      minDistance = dist;
      nearest = loc;
    }
  }
  return nearest;
}

export default function ProdukUnggulanPage() {
  const { wilayahData, setWilayahData, selectedWilayah } = useWilayahStore();
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const [collapsed, setCollapsed] = useState(false);
  const [umkmList, setUmkmList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [nama, setNama] = useState("");
  const [wilayah, setWilayah] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [enableGeo, setEnableGeo] = useState(true);
  const [isOutside, setIsOutside] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isUserLoggedIn") === "true";
    const email = localStorage.getItem("userEmail");
    const id = localStorage.getItem("userId");
    setIsLoggedIn(loginStatus);
    setUserEmail(email);
    setUserId(id);
  }, []);

  useEffect(() => {
    if (!enableGeo) return;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const posCoords = { lat: latitude, lng: longitude };
          setCoords(posCoords);

          const isStabat =
            latitude >= 3.68 &&
            latitude <= 3.79 &&
            longitude >= 98.41 &&
            longitude <= 98.51;

          setIsOutside(!isStabat);

          if (isStabat) {
            const nearest = getNearestWilayah(posCoords, villageLocations);
            setWilayah(nearest.wilayah);
          } else {
            setEnableGeo(false);
          }
        },
        (err) => {
          console.warn("Gagal ambil lokasi:", err);
          setCoords(null);
          setIsOutside(true);
          setEnableGeo(false);
        }
      );
    }
  }, [enableGeo]);

  useEffect(() => {
    setWilayahData(villageLocations);
  }, [setWilayahData]);

  useEffect(() => {
    const fetchUMKM = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/auth/umkm");
        const data = await res.json();
        setUmkmList(data);
      } catch (err) {
        console.error("Gagal ambil data:", err);
      }
      setIsLoading(false);
    };
    fetchUMKM();
  }, []);

  useEffect(() => {
    if (!enableGeo && wilayah) {
      const selected = villageLocations.find((v) => v.wilayah === wilayah);
      if (selected) {
        setMapCenter({ lat: selected.lat, lng: selected.lng });
      }
    } else if (wilayah === "") {
      setMapCenter(null);
    }
  }, [enableGeo, wilayah]);

  const filtered = useMemo(() => {
    const approvedUmkm = umkmList.filter((u) => u.status === "Disetujui");
    const combined = [...villageLocations, ...approvedUmkm];
    if (!selectedWilayah) return combined;
    return combined.filter((d) => d.wilayah === selectedWilayah);
  }, [selectedWilayah, umkmList]);

  const scrollToMap = () => {
    mapContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!coords || !imageFile || !wilayah) {
      alert("Lengkapi data dan lokasi.");
      setIsSubmitting(false);
      return;
    }

    if (!userId) {
      alert("User belum ditemukan. Silakan login ulang.");
      setIsSubmitting(false);
      return;
    }

    const roadName = await getRoadName(coords.lat, coords.lng);

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("wilayah", wilayah);
    formData.append("deskripsi", deskripsi);
    formData.append("jalan", roadName);
    formData.append("lat", String(coords.lat));
    formData.append("lng", String(coords.lng));
    formData.append("image", imageFile);
    formData.append("userId", userId);

    const res = await fetch("/api/auth/umkm", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("UMKM berhasil ditambahkan dan menunggu verifikasi admin.");
      setNama("");
      setWilayah("");
      setDeskripsi("");
      setImageFile(null);
    } else {
      alert("Gagal menambahkan UMKM.");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className={clsx(
          "transition-all",
          collapsed ? "md:pl-20" : "md:pl-64", // hanya aktif di md ke atas
          "pl-0"
        )}
      >
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Produk Unggulan <span className="text-green-600">UMKM</span>
            </h1>
            <p className="text-sm text-gray-500">
              Eksplorasi produk lokal terbaik dari berbagai wilayah.
            </p>
            {isLoggedIn && userEmail && (
              <p className="mt-3 text-gray-600 text-sm">
                Selamat datang,{" "}
                <span className="font-semibold">{userEmail}</span>
              </p>
            )}
            {isLoggedIn && (
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
                className="mt-2 text-sm text-red-500 underline"
              >
                Logout
              </button>
            )}
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-4 sm:space-x-6">
              {filtered.map((item) => (
                <div
                  key={`${item.id}-${item.nama}`}
                  className="w-[260px] sm:w-[300px] flex-shrink-0 bg-white rounded-xl shadow hover:shadow-lg transition"
                  onClick={scrollToMap}
                >
                  <Image
                    src={item.imageUrl || "/produk/default.jpg"}
                    alt={item.nama || "Produk UMKM"}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{item.nama}</h2>
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

        <section className="max-w-6xl mx-auto px-4 py-6">
          <h2 className="text-xl font-semibold mb-3">Filter Wilayah</h2>
          <WilayahFilter />
        </section>

        <section ref={mapContainerRef} className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-xl font-semibold mb-3">Peta Wilayah</h2>
          <div className="min-h-[300px]">
            <MapWilayah reports={filtered} mapRef={mapRef} />
          </div>
        </section>

        {isLoggedIn ? (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
            <div className="bg-white border shadow rounded-2xl">
              <div className="bg-green-600 text-white px-6 py-4 rounded-t-2xl font-semibold text-lg">
                Tambah Produk UMKM
              </div>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nama Produk
                    </label>
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      required
                      className="w-full border px-4 py-2 rounded shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    {!enableGeo && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Pilih Wilayah
                          </label>
                          <select
                            value={wilayah}
                            onChange={(e) => setWilayah(e.target.value)}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                          >
                            <option value="">Semua Wilayah</option>
                            {villageLocations.map((v) => (
                              <option key={v.id} value={v.wilayah}>
                                {v.wilayah}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Pilih Lokasi di Peta
                          </label>
                          <div className="border rounded shadow-sm h-60 overflow-hidden">
                            <MiniMap
                              coords={coords}
                              setCoords={setCoords}
                              center={
                                enableGeo
                                  ? coords
                                  : villageLocations.find(
                                      (v) => v.wilayah === wilayah
                                    ) || undefined
                              }
                              allReports={filtered}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Klik pada peta untuk memilih lokasi UMKM Anda
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Deskripsi
                    </label>
                    <textarea
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                      required
                      className="w-full border px-4 py-2 rounded shadow-sm"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Gambar Produk
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setImageFile(e.target.files?.[0] || null)
                      }
                      required
                      className="w-full max-w-full px-4 py-2 border rounded bg-white shadow-sm"
                    />
                  </div>

                  <div className="text-right mt-auto">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-md disabled:opacity-50 w-full sm:w-auto"
                    >
                      {isSubmitting ? "Menyimpan..." : "Simpan UMKM"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        ) : (
          <div className="text-center my-10 px-4">
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
      </main>
      <footer className="footer mt-5 py-3 bg-light border-top">
        <div className="container text-center">
          <span className="text-muted">
            &copy; {new Date().getFullYear()} Kerjasama Kecamatan Stabat -
            Universitas Satya Terra Bhinneka
          </span>
        </div>
      </footer>
    </>
  );
}
