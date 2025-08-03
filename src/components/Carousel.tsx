"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Data UMKM per desa/kelurahan
const umkmItems = [
  {
    id: 1,
    title: "Desa Mangga",
    product: "Pembuatan Gula Aren",
    image: "/images/gulaaren.jpg",
  },
  {
    id: 2,
    title: "Desa Banyumas",
    product: "Pembuatan Jamu",
    image: "/images/jamu.jpg",
  },
  {
    id: 3,
    title: "Desa Kwala Begumit",
    product: "Pembuatan Basreng",
    image: "/images/basreng.webp",
  },
  {
    id: 4,
    title: "Desa Ara Condong",
    product: "Pembuatan Keripik Pisang Sale",
    image: "/images/pisangsale.jpg",
  },
  {
    id: 5,
    title: "Desa Pantai Gemi",
    product: "Pembuatan Manisan Kelapa",
    image: "/images/manisankelapa.webp",
  },
  {
    id: 6,
    title: "Kelurahan Stabat Baru",
    product: "Pembuatan Haluwa",
    image: "/images/haluakenari.png",
  },
  {
    id: 7,
    title: "Kelurahan Kwala Bingai",
    product: "Pembuatan Keripik Kentang",
    image: "/images/keripik.JPG",
  },
  {
    id: 8,
    title: "Kelurahan Perdamaian",
    product: "Pembuatan Kentang Mustafa",
    image: "/images/kentangmustofa.jpg",
  },
  {
    id: 9,
    title: "Kelurahan Dendang",
    product: "Pembuatan Rengginang Ubi",
    image: "/images/rengginang.webp",
  },
  {
    id: 10,
    title: "Kelurahan Paya Mabar",
    product: "Pembuatan Susu Kedelai",
    image: "/images/susu.jpg",
  },
  {
    id: 11,
    title: "Kelurahan Sidomulyo",
    product: "Pembuatan Dodol Ubi",
    image: "/images/dodolubi.webp",
  },
  {
    id: 12,
    title: "Desa Karang Rejo",
    product: "Pembuatan Keripik Tempe",
    image: "/images/keripiktempe.jpg",
  },
];

const UMKMCarousel = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % umkmItems.length);
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  const handleDragEnd = (e: any, info: any) => {
    if (info.offset.x < -100) {
      setIndex((prev) => (prev + 1) % umkmItems.length);
    } else if (info.offset.x > 100) {
      setIndex((prev) => (prev - 1 + umkmItems.length) % umkmItems.length);
    }
  };

  return (
    <section className="w-full text-black max-w-4xl mx-auto px-4 py-6 sm:py-10 md:py-12">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Produk Unggulan UMKM Kecamatan Stabat
      </h2>

      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={umkmItems[index].id}
            className="flex flex-col md:flex-row items-center bg-white"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          >
            <div className="relative w-full md:w-1/2 aspect-[3/2]">
              <Image
                src={umkmItems[index].image}
                alt={umkmItems[index].title}
                fill
                className="object-cover rounded-l-xl"
              />
            </div>

            <div className="w-full md:w-1/2 p-6 space-y-4">
              <h3 className="text-xl font-semibold text-green-700">
                {umkmItems[index].title}
              </h3>
              <p className="text-gray-700">{umkmItems[index].product}</p>
              <button
                onClick={() => (window.location.href = "/produk-unggulan")}
                className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
              >
                Lihat Detail
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tombol manual navigasi */}
        <button
          onClick={() =>
            setIndex((prev) => (prev - 1 + umkmItems.length) % umkmItems.length)
          }
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        >
          ‹
        </button>
        <button
          onClick={() => setIndex((prev) => (prev + 1) % umkmItems.length)}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default UMKMCarousel;
