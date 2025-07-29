"use client";

import { useWilayahStore } from "../app/store/WilayahStore";



const options = ["Semua", "Desa", "Kelurahan"];

const WilayahDashboard = () => {
  const { filter, setFilter } = useWilayahStore();

  return (
    <div className="flex gap-2 mb-4">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setFilter(option as any)}
          className={`px-4 py-2 rounded border ${
            filter === option
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default WilayahDashboard;
