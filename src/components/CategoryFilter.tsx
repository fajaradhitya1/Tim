"use client";

import { useEffect } from "react";
import { useReportStore } from "@/app/store/reportStore";

const categoryOptions = ["Semua", "Layanan Publik", "Wisata"];

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useReportStore();

  useEffect(() => {
    if (!selectedCategory) {
      setSelectedCategory("Semua");
    }
  }, [selectedCategory, setSelectedCategory]);

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center mt-4">
      {categoryOptions.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{ borderRadius: "9999px", width: "auto" }}
            className={`inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-full border transition-all duration-200
    ${
      isActive
        ? "bg-blue-600 text-white border-blue-600 shadow-md"
        : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-100"
    }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
