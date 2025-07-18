"use client";

import { useReportStore } from "@/app/store/reportStore";

const categories = [
  "Semua",
  "Lalu Lintas",
  "Wisata",
  "Infrastruktur",
  "Layanan Publik",
];

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useReportStore();

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive =
          (category === "Semua" && !selectedCategory) ||
          selectedCategory === category;

        return (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category === "Semua" ? "" : category)
            }
            className={`px-3 py-1 rounded-full text-sm border font-medium transition ${
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
