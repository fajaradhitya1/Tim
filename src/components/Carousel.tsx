"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const carouselItems = [
  {
    id: 1,
    title: "Pengembangan Infrastruktur Desa",
    image: "/images/infrastruktur.jpg",
    description:
      "Pembangunan jalan, jembatan, dan fasilitas umum untuk mempercepat akses masyarakat.",
  },
  {
    id: 2,
    title: "Pemberdayaan Ekonomi Masyarakat",
    image: "/images/umkm.jpg",
    description:
      "Meningkatkan UMKM dan pertanian melalui pelatihan dan dukungan modal.",
  },
  {
    id: 3,
    title: "Digitalisasi Pelayanan Publik",
    image: "/images/digitalisasi.jpg",
    description:
      "Pemanfaatan teknologi untuk pelayanan desa yang cepat dan transparan.",
  },
];

const CarouselSection = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto slide tiap 5 detik
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -100) {
      // Geser ke kanan
      setIndex((prev) => (prev + 1) % carouselItems.length);
    } else if (info.offset.x > 100) {
      // Geser ke kiri
      setIndex(
        (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
      );
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Program Unggulan Desa
      </h2>

      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={carouselItems[index].id}
            className="flex flex-col md:flex-row items-center bg-white"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          >
            <div className="w-full md:w-1/2">
              <Image
                src={carouselItems[index].image}
                alt={carouselItems[index].title}
                width={600}
                height={400}
                className="w-full h-full object-cover rounded-l-xl"
              />
            </div>
            <div className="w-full md:w-1/2 p-6 space-y-4">
              <h3 className="text-xl font-semibold text-red-600">
                {carouselItems[index].title}
              </h3>
              <p className="text-gray-700">
                {carouselItems[index].description}
              </p>
              <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                Info Lebih Lanjut
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tombol manual */}
        <button
          onClick={() =>
            setIndex(
              (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
            )
          }
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        >
          ‹
        </button>
        <button
          onClick={() => setIndex((prev) => (prev + 1) % carouselItems.length)}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default CarouselSection;

