"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Legend,
} from "recharts";
import { School, Landmark, Leaf, Home, MapPin, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { villageLocations } from "@/app/data/villages";
import CarouselSection from "@/components/Carousel";
import clsx from "clsx";
import SmartCityPage from "../sdman/page";
import DashboardSDMAS from "../sdmas/dashboard/page";
import JualIkanPage from "@/components/jualikan";

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

const pendudukData = [
  { name: "2020", Penduduk: 2300 },
  { name: "2021", Penduduk: 2450 },
  { name: "2022", Penduduk: 2600 },
  { name: "2023", Penduduk: 2750 },
];

export default function DashboardPage() {
  const mapRef = useRef<any>(null);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main
        className={clsx(
          "transition-all duration-300 px-4 sm:px-6 lg:px-8",
          collapsed ? "md:ml-20" : "md:ml-64"
        )}
      >
        {/* SECTION: SDM Dashboard */}
        <section className="w-full container p-1">
          <DashboardSDMAS />
        </section>

        {/* SECTION: SmartCity */}
        <section className="w-full">
          <SmartCityPage />
        </section>
        <section>
          <JualIkanPage />
        </section>

        {/* SECTION: Dashboard Utama */}
        <section className="w-full text-black bg-gradient-to-br from-blue-100 via-white to-blue-200 py-5">
          <div className="w-full max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-10 text-center">
              📍 Dashboard Kecamatan Stabat
            </h1>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-5 rounded-xl border border-blue-100 shadow hover:shadow-md transition">
              <div className="w-full">
                <WilayahMapCard />
              </div>

              <InfoCard icon={<Landmark />} title="Wilayah Batas">
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>Utara: Wampu & Secanggang</li>
                  <li>Selatan: Binjai & Selesai</li>
                  <li>Timur: Hamparan Perak</li>
                  <li>Barat: Wampu & Hinai</li>
                </ul>
              </InfoCard>

              <InfoCard icon={<School />} title="Sarana Pendidikan">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pendidikanData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {pendidikanData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </InfoCard>

              <InfoCard icon={<BarChart3 />} title="Pertumbuhan Penduduk">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={pendudukData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Penduduk" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </InfoCard>

              <InfoCard icon={<Home />} title="Desa & Kelurahan">
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

              <InfoCard icon={<Leaf />} title="Produk Unggulan">
                <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 px-2 py-1 bg-green-50 rounded-md border border-green-200 text-sm text-green-800">
                  {villageLocations.map((v) => (
                    <ProductItem
                      key={v.id}
                      name={v.name}
                      value={v.description.replace("UMKM: ", "")}
                    />
                  ))}
                </div>
              </InfoCard>

              <div className="col-span-1 md:col-span-2 w-full">
                <InfoCard icon={<MapPin />} title="🗺️ Peta Kecamatan">
                  <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-inner">
                    <MapWilayah reports={villageLocations} mapRef={mapRef} />
                  </div>
                </InfoCard>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Visi Misi */}
        <section className="w-full max-w-7xl mx-auto py-10">
          <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
              Arah Pembangunan Desa
            </h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full bg-white shadow-md rounded-xl p-6 border hover:shadow-xl hover:border-blue-500 transition-all duration-300">
                <h3 className="text-xl font-semibold text-red-600 mb-3">
                  Visi
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Terwujudnya Desa yang Mandiri, Sejahtera, dan Berdaya Saing
                  melalui pembangunan yang partisipatif dan berkelanjutan.
                </p>
              </div>
              <div className="w-full bg-white shadow-md rounded-xl p-6 border hover:shadow-xl hover:border-blue-500 transition-all duration-300">
                <h3 className="text-xl font-semibold text-black-600 mb-3">
                  Misi
                </h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Meningkatkan kualitas sumber daya manusia desa.</li>
                  <li>
                    Mendorong pertumbuhan ekonomi melalui UMKM dan pertanian.
                  </li>
                  <li>
                    Meningkatkan infrastruktur dasar desa secara berkelanjutan.
                  </li>
                  <li>
                    Mewujudkan tata kelola pemerintahan desa yang transparan dan
                    akuntabel.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </section>

        {/* SECTION: Carousel */}
        <section className="w-full max-w-7xl mx-auto py-10">
          <CarouselSection />
        </section>

        {/* Footer */}
        <footer className="w-full mt-5 py-4 border-t bg-white text-center text-sm text-gray-600">
          <span>
            &copy; {new Date().getFullYear()} Kerjasama Kecamatan Stabat -
            Universitas Satya Terra Bhinneka
          </span>
        </footer>
      </main>
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
    <div className="w-full bg-green-50 px-4 py-3 rounded-md border border-green-200 text-xs text-green-800">
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
    <div className="w-full bg-green-50 px-2 py-1 rounded-md border border-green-200 text-sm text-green-800">
      <strong>{name}:</strong> {value}
    </div>
  );
}
