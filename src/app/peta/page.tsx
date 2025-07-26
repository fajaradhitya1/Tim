"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";

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
  const [collapsed, setCollapsed] = useState(false);

  // Load data dummy ke store saat halaman pertama dibuka
  useEffect(() => {
    setReports(reportData);
  }, [setReports]);

  // Filter laporan berdasarkan kategori
  const filteredReports = useMemo(() => {
    if (!selectedCategory || selectedCategory === "Semua") return reports;
    return reports.filter((r) =>
      r.issues?.some(
        (issue) => issue.toLowerCase() === selectedCategory.toLowerCase()
      )
    );
  }, [reports, selectedCategory]);

  // Klik gambar laporan
  const handleImageClick = (id: number) => {
    mapContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      mapActionsRef.current?.flyToMarker(id);
    }, 600);
  };

  // Klik dropdown wilayah
  const handleVillageSelect = (villageId: string) => {
    setSelectedVillage(villageId);
    mapContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      mapActionsRef.current?.flyToMarker(`village-${villageId}`);
    }, 600);
  };

  return (
    <>
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className={clsx(
          "transition-all px-4 py-6",
          collapsed ? "pl-20" : "pl-64"
        )}
      >
        {/* Filter Kategori dan Dropdown Wilayah */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <CategoryFilter />

          <select
            value={selectedVillage}
            onChange={(e) => handleVillageSelect(e.target.value)}
            className="px-4 py-2 border rounded-md text-sm bg-white"
          >
            <option value="">Pilih Produk Unggulan Desa/Kelurahan</option>
            {villageLocations.map((village) => (
              <option key={village.id} value={village.id.toString()}>
                {village.name}
              </option>
            ))}
          </select>
        </div>

        {/* Galeri Laporan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
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
                  onError={(e) =>
                    (e.currentTarget.src = "/images/fallback.jpg")
                  }
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
            selectedVillageId={selectedVillage}
            onReady={(actions) => {
              mapActionsRef.current = actions;
            }}
          />
        </div>
      </main>
    </>
  );
}
