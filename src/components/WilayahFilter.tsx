"use client";
import { useWilayahStore } from "@/app/store/WilayahStore";

const options = [
  "Semua",
  "Desa Mangga",
  "Desa Banyumas",
  "Desa Kwala Begumit",
  "Desa Ara Condong",
  "Desa Pantai Gemi",
  "Kelurahan Stabat Baru",
  "Kelurahan Kwala Bingai",
  "Kelurahan Perdamaian",
  "Kelurahan Dendang",
  "Kelurahan Paya Mabar",
  "Kelurahan Sidomulyo",
  "Desa Karang Rejo",
];

export default function WilayahFilter() {
  const { selectedWilayah, setSelectedWilayah } = useWilayahStore();

  return (
    <select
      value={selectedWilayah}
      onChange={(e) => setSelectedWilayah(e.target.value)}
      className="p-2 border rounded"
    >
      {options.map((wilayah) => (
        <option key={wilayah} value={wilayah}>
          {wilayah}
        </option>
      ))}
    </select>
  );
}
