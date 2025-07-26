"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Image from "next/image";

interface SdmData {
  id: number;
  nama: string;
  telepon: string;
  produk: string;
  lainnya: string | null;
  alamat: string;
  kelurahan: string;
  jenis: string;
  keterangan: string;
  imageUrl?: string; // ✅ Tambahkan ini
}

const ProdukDitawarkanPage = () => {
  const [data, setData] = useState<SdmData[]>([]);
  const [selected, setSelected] = useState<SdmData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/auth/sumber-daya");

        const isJson = res.headers
          .get("content-type")
          ?.includes("application/json");

        if (!res.ok) {
          const errorMessage = isJson
            ? (await res.json()).message
            : await res.text();
          throw new Error(errorMessage || "Gagal memuat data.");
        }

        const json = await res.json();
        setData(Array.isArray(json) ? json : []);
      } catch (err: any) {
        console.error("❌ Gagal ambil data:", err);
        Swal.fire(
          "Gagal",
          err.message || "Terjadi kesalahan saat memuat data.",
          "error"
        );
      }
    };

    fetchData();
  }, []);

  const getImage = (
    produk: string,
    lainnya: string | null,
    imageUrl?: string | null
  ) => {
    // Gunakan gambar upload jika ada dan tidak kosong
    if (imageUrl && imageUrl.trim() !== "") return imageUrl;

    const raw = produk.toLowerCase() === "lainnya" ? lainnya || "" : produk;
    const key = raw.trim().toLowerCase();

    if (key.includes("buah")) return "/images/sdmas/belimbing.jpeg";
    if (key.includes("bambu") || key.includes("bata"))
      return "/images/sdmas/bata.jpeg";
    if (key.includes("pesta") || key.includes("rewang"))
      return "/images/sdmas/rewang.PNG";

    return "/images/sdmas/tanya.png";
  };



  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-success fw-bold">
        Produk yang Ditawarkan
      </h1>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
        {data.length === 0 && (
          <div className="text-center text-muted col-12">
            Belum ada produk yang ditampilkan.
          </div>
        )}

        {data.map((item, index) => (
          <div className="col" key={index}>
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden fancy-card hover-card">
              <Image
                src={getImage(item.produk, item.lainnya, item.imageUrl)} // tambahkan imageUrl
                alt={item.produk}
                width={400}
                height={200}
                priority
                className="card-img-top"
                style={{
                  objectFit: "cover",
                  height: "200px",
                  width: "100%",
                  objectPosition: "center",
                }}
              />

              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">
                  {item.produk.toLowerCase() === "lainnya"
                    ? item.lainnya || "Produk Lainnya"
                    : item.produk}
                </h5>
                <p className="card-text mb-1">
                  <i className="fas fa-money-bill-wave text-success me-2" />
                  <strong>{item.jenis.toUpperCase()}</strong>
                </p>
                <p className="card-text mb-2">
                  <i className="fas fa-map-marker-alt me-2" />
                  {item.alamat}
                </p>
                <button
                  className="btn btn-success w-100 mt-auto"
                  onClick={() => setSelected(item)}
                >
                  <i className="fas fa-info-circle me-1" /> Lihat Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5 mb-5">
        <button
          className="btn btn-outline-success"
          onClick={() => window.history.back()}
        >
          ← Kembali
        </button>
      </div>

      {/* Modal Detail */}
      {selected && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Detail Produk</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelected(null)}
                />
              </div>
              <div className="modal-body">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Produk</th>
                      <td>
                        {selected.produk.toLowerCase() === "lainnya"
                          ? selected.lainnya || "Produk Lainnya"
                          : selected.produk}
                      </td>
                    </tr>
                    <tr>
                      <th>Alamat</th>
                      <td>{selected.alamat}</td>
                    </tr>
                    <tr>
                      <th>Kelurahan</th>
                      <td>{selected.kelurahan}</td>
                    </tr>
                    <tr>
                      <th>Jenis</th>
                      <td>{selected.jenis.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <th>Keterangan</th>
                      <td>{selected.keterangan}</td>
                    </tr>
                    <tr>
                      <th>Nama Pengirim</th>
                      <td>{selected.nama}</td>
                    </tr>
                    <tr>
                      <th>No. Telepon</th>
                      <td>{selected.telepon}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className="modal-footer d-flex justify-content-end p-3 border-top"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setSelected(null)}
                >
                  ← Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(0, 128, 0, 0.2);
        }

        .fancy-card {
          background: linear-gradient(to bottom right, #f9fff9, #ebfbee);
          border: 1px solid #e0f2e9;
        }

        .card-title {
          font-weight: 600;
          color: #2e7d32;
        }

        .card-text {
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
};

export default ProdukDitawarkanPage;
