"use client";

import { useEffect } from "react";
import { useReportStore } from "@/app/store/reportStore";

// Kategori laporan
const categoryOptions = [
  "Semua",
  "Layanan Publik",
  "Wisata",
];

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useReportStore();

  useEffect(() => {
    if (!selectedCategory) {
      setSelectedCategory("Semua");
    }
  }, [selectedCategory, setSelectedCategory]);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {categoryOptions.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-200
              ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"
              }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
