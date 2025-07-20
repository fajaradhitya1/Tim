"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReportStore } from "@/app/store/reportStore";
import { reportData } from "../data/reports";
import { villageLocations } from "@/app/data/villages";
import CategoryFilter from "@/components/CategoryFilter";
import Navbar from "@/components/Navbar";

// Dynamic import agar Leaflet tidak di-SSR
const MapWrapper = dynamic(() => import("@/components/MapWrapper"), {
  ssr: false,
});

export default function HomePage() {
  const { reports, setReports, selectedCategory } = useReportStore();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapActionsRef = useRef<{
    flyToMarker: (id: number | string) => void;
  } | null>(null);

  const [selectedVillage, setSelectedVillage] = useState<string>("");

  // Load data ke store saat halaman pertama dibuka
  useEffect(() => {
    setReports(reportData);
  }, [setReports]);

  // Filter laporan berdasarkan kategori yang dipilih
  const filteredReports = useMemo(() => {
    if (!selectedCategory || selectedCategory === "Semua") return reports;
    return reports.filter((r) =>
      r.issues?.some(
        (issue) => issue.toLowerCase() === selectedCategory.toLowerCase()
      )
    );
  }, [reports, selectedCategory]);

  // Scroll ke peta & flyTo marker laporan
  const handleImageClick = (id: number) => {
    mapContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      mapActionsRef.current?.flyToMarker(id);
    }, 600);
  };

  // Scroll ke peta & flyTo marker produk unggulan
  const handleVillageSelect = (villageId: string) => {
    setSelectedVillage(villageId);
    mapContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      mapActionsRef.current?.flyToMarker(`village-${villageId}`);
    }, 600);
  };

  return (
    <>
      <Navbar />

      <main className="px-4 py-6 max-w-6xl mx-auto space-y-8">
        {/* Filter Kategori dan Dropdown Wilayah */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <CategoryFilter />

          {/* Dropdown Produk Unggulan */}
          <select
            value={selectedVillage}
            onChange={(e) => handleVillageSelect(e.target.value)}
            className="px-4 py-2 border rounded-md text-sm"
          >
            <option value="">Pilih Produk Unggulan Desa/Kelurahan</option>
            {villageLocations.map((village) => (
              <option key={village.id} value={village.id.toString()}>
                {village.name}
              </option>
            ))}
          </select>
        </div>

        {/* Galeri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredReports.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer group border"
              onClick={() => handleImageClick(r.id)}
            >
              <div className="h-32 overflow-hidden rounded-t-lg">
                <img
                  src={r.imageUrl}
                  alt={r.description}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) =>
                    (e.currentTarget.src = "/images/fallback.jpg")
                  }
                />
              </div>
              <div className="p-3 space-y-1">
                <p className="font-medium text-sm text-gray-800 line-clamp-2">
                  {r.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {r.issues?.map((issue, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
                    >
                      {issue}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Peta */}
        <div ref={mapContainerRef}>
          <MapWrapper
            reports={filteredReports}
            selectedVillageId={selectedVillage} // ⬅️ PENTING: kirim selectedVillage ke MapWrapper
            onReady={(actions) => {
              mapActionsRef.current = actions;
            }}
          />
        </div>
      </main>
    </>
  );
}
