"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CarouselSection from "./Carousel";

const HeroSection = () => {
  return (
    <section className="bg-gray-100">
      {/* HERO BACKGROUND */}
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-8 max-w-6xl mx-auto">
        {[
          { label: "Jiwa Penduduk", value: "2.500" },
          { label: "Rumah Tangga", value: "650" },
          { label: "Dusun", value: "5" },
          { label: "Program Unggulan", value: "10+" },
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

      {/* PENGENALAN DESA */}
      <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-8 items-center">
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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
             Vel at obcaecati consequuntur expedita doloribus veritatis
              nam, culpa animi commodi tempora.
          </p>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, placeat nesciunt sunt incidunt,
             accusantium itaque magnam suscipit non magni assumenda voluptate distinctio molestiae similique rerum!
          </p>
        </div>
      </div>
      {/* ARAH PEMBANGUNAN DESA */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
          Arah Pembangunan Desa
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visi */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-red-600 mb-3">Visi</h3>
            <p className="text-gray-700 leading-relaxed">
              Terwujudnya Desa yang Mandiri, Sejahtera, dan Berdaya Saing
              melalui pembangunan yang partisipatif dan berkelanjutan.
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white shadow-md rounded-xl p-6 transition-all p-4 border border-gray-300 rounded hover:shadow-xl hover:border-blue-500 transition-all duration-300 ">
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
    </section>
  );
};

export default HeroSection;
