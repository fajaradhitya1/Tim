"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function HomePage() {
  const router = useRouter();

  const cards = [
    {
      title: "Dashboard Pemerintahan",
      description:
        "Statistik, informasi desa, pendidikan, kependudukan dan program unggulan di Kecamatan Stabat.",
      image: "/images/statis.png",
      link: "/dashboard",
    },
    {
      title: "Peta Wilayah",
      description:
        "Eksplorasi peta interaktif yang menampilkan desa, kelurahan, dan lokasi produk unggulan di Stabat.",
      image: "/images/peta.jpg",
      link: "/peta",
    },
    {
      title: "Produk Unggulan UMKM",
      description:
        "Lihat dan tambahkan produk unggulan dari UMKM masyarakat Stabat yang kreatif dan inovatif.",
      image: "/images/grid.png",
      link: "/produk-unggulan",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <Navbar />
      {/* 🔁 Carousel Section */}
      <section className="mb-12 max-w-6xl mx-auto px-4">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={4500}
          swipeable
          emulateTouch
          dynamicHeight={false}
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            const baseClasses =
              "w-3 h-3 rounded-full mx-1 cursor-pointer transition-colors duration-300";
            return (
              <span
                aria-label={`${label} ${index + 1}`}
                className={
                  isSelected
                    ? `${baseClasses} bg-blue-600 shadow-lg`
                    : `${baseClasses} bg-gray-400 hover:bg-blue-500`
                }
                onClick={onClickHandler}
                key={index}
              />
            );
          }}
        >
          {[
            {
              img: "/images/kantorcamat.jpg",
              caption: "Pelayanan publik yang transparan dan efisien",
            },
            {
              img: "/images/polsek.jpeg",
              caption: "Sinergi masyarakat dan pemerintahan",
            },
            {
              img: "/images/informasi.jpg",
              caption: "Informasi desa & potensi unggulan di Stabat",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden shadow-lg group"
              style={{ maxHeight: 400 }}
            >
              <Image
                src={item.img}
                alt={item.caption}
                width={1000}
                height={400}
                className="object-cover w-full h-[400px] transition-transform duration-700 ease-in-out group-hover:scale-105 group-hover:shadow-xl"
                priority={i === 0}
              />
              {/* Caption overlay: blur, transparan, subtle */}
              <div
                className="
    absolute bottom-8 left-1/2 -translate-x-1/2
    bg-gradient-to-r from-white/20 via-white/10 to-white/20
    backdrop-blur-lg border border-white/30
    rounded-lg px-8 py-4 max-w-[90%]
    transition-opacity duration-700 ease-in-out
    group-hover:opacity-100 opacity-90
    "
              >
                <p className="text-white text-center text-xl sm:text-3xl font-extrabold tracking-wide drop-shadow-lg">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Selamat Datang di Sistem Informasi Stabat
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Platform digital untuk mendukung transparansi, pelayanan publik, dan
          pemberdayaan UMKM di Kecamatan Stabat.
        </p>
      </section>

      {/* Card Section */}
      <section className="grid gap-8 md:grid-cols-3 mb-16">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
          >
            <Image
              src={card.image}
              alt={card.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-green-700">
                  {card.title}
                </h2>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </div>
              <button
                onClick={() => router.push(card.link)}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm self-start"
              >
                Lihat Selengkapnya
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* 🧠 Smart City Section */}
      <section className="mb-16 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Konsep Smart City Kecamatan Stabat
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Container gambar dengan max tinggi dan background abu-abu */}
          <div className="rounded-xl shadow w-full max-h-[300px] md:max-h-[400px] bg-gray-100 flex items-center justify-center overflow-hidden">
            <Image
              src="/images/digital.png"
              alt="Smart City"
              width={600}
              height={400}
              className="object-contain"
              style={{ maxHeight: "100%", width: "auto" }}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-800">
              Menuju Stabat Digital & Cerdas
            </h3>
            <p className="text-gray-700 leading-relaxed text-xl">
              Kecamatan Stabat mengembangkan sistem informasi terintegrasi untuk
              meningkatkan efisiensi layanan publik, transparansi data, dan
              pemberdayaan masyarakat. Inisiatif ini mencakup digitalisasi UMKM,
              pelayanan berbasis peta, dan pelibatan warga secara aktif.
            </p>
          </div>
        </div>
      </section>

      {/* Keunggulan Section */}
      <section className="text-center mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Mengapa Menggunakan Platform Ini?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-600">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            ✅ Akses data desa dan kelurahan secara real-time.
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            🗺️ Jelajahi potensi wilayah lewat peta interaktif.
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            💡 Promosikan produk unggulan UMKM secara digital.
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-green-50 rounded-xl py-10 px-6">
        <h2 className="text-2xl font-bold text-green-700 mb-2">
          Bergabung dan Berkontribusi untuk Stabat!
        </h2>
        <p className="text-gray-600 mb-4">
          Anda dapat menambahkan produk unggulan UMKM atau mengeksplorasi
          potensi desa langsung dari sistem ini.
        </p>
        <button
          onClick={() => router.push("/register")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-sm"
        >
          Daftar Sekarang
        </button>
      </section>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Kecamatan Stabat - SmartCity. All rights
        reserved.
      </footer>
    </main>
  );
}
