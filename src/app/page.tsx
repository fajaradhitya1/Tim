"use client";

import { useEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { useWilayahStore } from "@/app/store/WilayahStore";
import { villageLocations } from "./data/villages";
import WilayahFilter from "@/components/WilayahFilter";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

const MapWilayah = dynamic(() => import("@/components/MapWilayah"), {
  ssr: false,
});

// Gunakan langsung data dari villages.ts
const dataWilayah = villageLocations;

export default function Home() {
  const { wilayahData, setWilayahData, selectedWilayah } = useWilayahStore();
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  // Set data ke Zustand saat mount
  useEffect(() => {
    setWilayahData(dataWilayah);
  }, [setWilayahData]);

  // Filter jika ada wilayah terpilih
  const filtered = useMemo(() => {
    if (!selectedWilayah) return wilayahData || [];
    return wilayahData.filter((d) => d.wilayah === selectedWilayah);
  }, [wilayahData, selectedWilayah]);

  return (
    <>
      <Navbar />
      <HeroSection />

      <section className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-3">Filter Wilayah</h2>
        <WilayahFilter />
      </section>

      <section ref={mapContainerRef} className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-3">Peta Wilayah</h2>
        <MapWilayah reports={filtered} mapRef={mapRef} />
      </section>
    </>
  );
}
