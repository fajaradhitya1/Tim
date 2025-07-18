"use client";

import { useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import CategoryFilter from "@/components/CategoryFilter";
import { useReportStore } from "@/app/store/reportStore";

// Dynamic import agar MapWrapper hanya dirender di client
const MapWrapper = dynamic(() => import("@/components/MapWrapper"), {
  ssr: false,
});

const dummyData = [
  {
    id: 1,
    lat: 3.6123,
    lng: 98.6661,
    description: "Kemacetan parah di Jalan Jenderal Sudirman",
    issues: ["Lalu Lintas"],
    imageUrl: "/images/macetsumut.jpg",
  },
  {
    id: 2,
    lat: 3.5515,
    lng: 98.6417,
    description: "Pemandangan indah Bukit Lawang",
    issues: ["Wisata"],
    imageUrl: "/images/bukitlawang.jpg",
  },
  {
    id: 3,
    lat: 3.6049,
    lng: 98.6844,
    description: "Jalan rusak berlubang di Binjai",
    issues: ["Infrastruktur"],
    imageUrl: "/images/jalanrusakbinjai.jpg",
  },
  {
    id: 4,
    lat: 3.6072,
    lng: 98.6826,
    description: "Puskesmas Binjai Barat",
    issues: ["Layanan Publik"],
    imageUrl: "/images/puskesmas.jpg",
  },
];

export default function Home() {
  const { reports, setReports, selectedCategory } = useReportStore();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapActionsRef = useRef<{ flyToMarker: (id: number) => void } | null>(
    null
  );

  // Set dummy data saat halaman pertama kali render
  useEffect(() => {
    setReports(dummyData);
  }, [setReports]);

  // Filter laporan berdasarkan kategori yang dipilih
  const filteredReports = useMemo(() => {
    if (!selectedCategory || selectedCategory === "Semua") return reports;
    return reports.filter((r) =>
      r.issues.some(
        (issue) => issue.toLowerCase() === selectedCategory.toLowerCase()
      )
    );
  }, [reports, selectedCategory]);

  // Scroll dan zoom ke marker saat gambar diklik
  const handleImageClick = (id: number) => {
    mapContainerRef.current?.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      mapActionsRef.current?.flyToMarker(id);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <CategoryFilter />

      {/* Galeri */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredReports.map((r) => (
          <div
            key={r.id}
            className="border rounded-lg shadow p-2 cursor-pointer hover:shadow-md transition"
            onClick={() => handleImageClick(r.id)}
          >
            <img
              src={r.imageUrl}
              alt={r.description}
              className="w-full h-40 object-cover rounded"
              onError={(e) => (e.currentTarget.src = "/images/fallback.jpg")}
            />
            <p className="text-sm mt-2">{r.description}</p>
            <span className="text-xs text-gray-500">{r.issues.join(", ")}</span>
          </div>
        ))}
      </div>

      {/* MAP */}
      <div ref={mapContainerRef}>
        <MapWrapper
          reports={filteredReports}
          onReady={(actions) => {
            mapActionsRef.current = actions;
          }}
        />
      </div>
    </div>
  );
}
