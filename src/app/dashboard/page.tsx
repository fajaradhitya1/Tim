"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { School, Landmark, Leaf, Home, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import { villageLocations } from "@/app/data/villages";

// Dynamic import agar Leaflet hanya dirender di client
const WilayahMapCard = dynamic(() => import("@/components/WilayahMapCard"), {
  ssr: false,
});

const MapWilayah = dynamic(() => import("@/components/MapWilayah"), {
  ssr: false,
});

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE"];

const pendidikanData = [
  { name: "PAUD", value: 30 },
  { name: "SD", value: 42 },
  { name: "SLTP", value: 15 },
  { name: "SMA", value: 8 },
];

export default function DashboardPage() {
  const mapRef = useRef<any>(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-10 text-center">
            📍 Dashboard Kecamatan Stabat
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WilayahMapCard />

            <InfoCard
              icon={<Landmark className="w-5 h-5" />}
              title="Wilayah Batas"
            >
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Utara: Wampu & Secanggang</li>
                <li>Selatan: Binjai & Selesai</li>
                <li>Timur: Hamparan Perak</li>
                <li>Barat: Wampu & Hinai</li>
              </ul>
            </InfoCard>

            <InfoCard
              icon={<School className="w-5 h-5" />}
              title="Sarana Pendidikan"
            >
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pendidikanData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pendidikanData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </InfoCard>

            <InfoCard
              icon={<Home className="w-5 h-5" />}
              title="Desa & Kelurahan"
            >
              <p className="text-sm text-gray-700 mb-2">
                Total: 12 Desa & 6 Kelurahan
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                <li>
                  Kelurahan: Perdamaian, Paya Mabar, Dendang, Kwala Bingai,
                  Sidomulyo, Stabat Baru
                </li>
                <li>
                  Desa: Ara Condong, Kwala Begumit, Banyumas, Mangga, Karang
                  Rejo, Pantai Gemi
                </li>
              </ul>
            </InfoCard>

            <InfoCard
              icon={<Leaf className="w-5 h-5" />}
              title="Produk Unggulan"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700">
                {villageLocations.map((village) => (
                  <ProductItem
                    key={village.id}
                    name={village.name}
                    value={village.description.replace("UMKM: ", "")}
                  />
                ))}
              </div>
            </InfoCard>

            <InfoCard
              icon={<MapPin className="w-5 h-5" />}
              title="🗺️ Peta Kecamatan"
            >
              <div className="h-64 rounded-lg overflow-hidden shadow-inner">
                <MapWilayah reports={villageLocations} mapRef={mapRef} />
              </div>
            </InfoCard>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2 mb-3 text-blue-800 font-semibold">
        {icon}
        <h2 className="text-lg">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function ProductItem({ name, value }: { name: string; value: string }) {
  return (
    <div className="bg-blue-50 px-2 py-1 rounded-md border text-xs">
      <strong>{name}:</strong> {value}
    </div>
  );
}
