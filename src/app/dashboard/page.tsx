"use client";

import { useRef } from "react";
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
import {
  School,
  Landmark,
  Leaf,
  Home,
  MapPin,
  BarChart3,
  Activity,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { villageLocations } from "@/app/data/villages";
import CarouselSection from "@/components/Carousel";
import Image from "next/image";
import { motion } from "framer-motion";

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

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-gray-100">
        <div className="relative h-[70vh] w-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src="/video/hero-desa.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Selamat Datang di <span className="text-red-500">Stabat</span>
            </motion.h1>
            <p className="text-lg md:text-xl mb-6 max-w-2xl">
              Desa yang indah dengan kearifan lokal dan potensi alam yang
              melimpah, menuju masa depan yang berkelanjutan
            </p>
            <div className="flex gap-4">
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow">
                Tentang Desa
              </button>
              <button className="border border-white px-6 py-2 rounded-lg text-white hover:bg-white hover:text-black">
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>

        {/* STATISTIK */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-8 max-w-6xl mx-auto">
          {[
            { label: "Jiwa Penduduk", value: "2.750" },
            { label: "Rumah Tangga", value: "700" },
            { label: "Dusun", value: "5" },
            { label: "Program Unggulan", value: "12" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center"
            >
              <p className="text-3xl font-bold text-red-600">{stat.value}</p>
              <p className="text-sm text-gray-700 mt-2 text-center">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PENGENALAN */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <Image
            src="/images/sawah.png"
            alt="Sawah"
            width={600}
            height={400}
            className="rounded-xl shadow-md object-cover w-full h-auto"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Mengenal Kecamatan Stabat</h2>
          <p className="text-gray-700 leading-relaxed">
            Kecamatan Stabat adalah wilayah dengan potensi alam dan budaya yang
            luar biasa. Dengan dukungan masyarakat yang aktif, pembangunan desa
            terus ditingkatkan untuk kesejahteraan bersama.
          </p>
        </div>
      </section>

      {/* DASHBOARD */}
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10 px-4">
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
              icon={<BarChart3 className="w-5 h-5" />}
              title="Pertumbuhan Penduduk"
            >
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
      </section>

      {/* VISI MISI */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
          Arah Pembangunan Desa
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-600 mb-3">Visi</h3>
            <p className="text-gray-700 leading-relaxed">
              Terwujudnya Desa yang Mandiri, Sejahtera, dan Berdaya Saing
              melalui pembangunan yang partisipatif dan berkelanjutan.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 border hover:shadow-xl hover:border-blue-500 transition-all duration-300">
            <h3 className="text-xl font-semibold text-red-600 mb-3">Misi</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Meningkatkan kualitas sumber daya manusia desa.</li>
              <li>Mendorong pertumbuhan ekonomi melalui UMKM dan pertanian.</li>
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

      <div>
        <CarouselSection />
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
