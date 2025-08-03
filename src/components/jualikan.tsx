"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { villageLocations } from "../app/data/villages";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function JualIkanPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    nama: "",
    hp: "",
    kelurahan: "",
    alamat: "",
    jenisIkan: "",
    hargaPerKg: "",
    stokKg: "",
    catatan: "",
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      Swal.fire("Gagal", "Harap unggah gambar ikan.", "error");
      return;
    }

    const form = new FormData();
    form.append("file", selectedFile);
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    try {
      const res = await fetch("/api/auth/ikan", {
        method: "POST",
        body: form,
      });

      const json = await res.json();

      if (res.ok && json.success) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data jual ikan berhasil dikirim.",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(async () => {
          const modalEl = document.getElementById("modalJualIkan");
          if (modalEl) {
            const bootstrap = await import("bootstrap");
            const modal =
              bootstrap.Modal.getInstance(modalEl) ??
              new bootstrap.Modal(modalEl);
            modal.hide();
          }

          setFormData({
            nama: "",
            hp: "",
            kelurahan: "",
            alamat: "",
            jenisIkan: "",
            hargaPerKg: "",
            stokKg: "",
            catatan: "",
          });
          setSelectedFile(null);
        }, 1600);
      } else {
        Swal.fire("Gagal", json.message || "Gagal mengirim data.", "error");
      }
    } catch (err) {
      Swal.fire("Kesalahan", "Terjadi kesalahan saat mengirim data.", "error");
    }
  };

  const accordionItems = [
    {
      icon: "fas fa-fish",
      title: "Kenapa Ikan Sungai Lebih Segar?",
      content:
        "Ikan hasil pancingan langsung dari sungai lokal lebih segar dan alami karena tanpa bahan pengawet.",
    },
    {
      icon: "fas fa-box",
      title: "Butuh Tips Pengemasan Ikan?",
      content:
        "Kami siap bantu edukasi tentang pengemasan ikan agar lebih tahan lama dan menarik saat dijual.",
    },
    {
      icon: "fas fa-store",
      title: "Bantu Jual Secara Online",
      content:
        "Ingin jual hasil pancingan secara online? Kami siap bantu promosi lewat kanal digital & sosial media!",
    },
  ];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <main className="container py-4">
        <div className="row align-items-center mb-4">
          <div className="col-md-5">
            <Image
              src="/images/SD_Manusia/mancing.png"
              alt="Ikan Segar"
              width={500}
              height={400}
              className="img-fluid"
            />
          </div>
          <div className="col-md-7">
            <h2 className="fw-bold text-success">
              Jual Ikan Sungai Segar dari Warga Sekitar
            </h2>
            <p className="text-muted">
              Bantu promosikan hasil pancingan warga sekitar! Kami menyediakan
              wadah agar ikan hasil tangkapan tidak hanya dinikmati sendiri,
              tapi juga bisa menjadi sumber penghasilan.
            </p>
            <button
              className="btn btn-success mt-3"
              data-bs-toggle="modal"
              data-bs-target="#modalJualIkan"
            >
              <i className="fas fa-fish me-2"></i> Tawarkan Ikan Sekarang
            </button>
          </div>
        </div>

        <h1 className="text-center mt-5 mb-4 fw-bold text-success">
          SDM Yang Mungkin Dibutuhkan
        </h1>

        {isClient && (
          <div className="container mb-5">
            <div className="accordion" id="faqAccordion">
              {accordionItems.map((item, idx) => (
                <div
                  className="accordion-item border border-success-subtle mb-3 rounded shadow-sm"
                  key={idx}
                >
                  <h2 className="accordion-header" id={`heading${idx}`}>
                    <button
                      className={`accordion-button ${
                        activeIndex === idx
                          ? "bg-success text-white"
                          : "collapsed bg-white text-dark"
                      }`}
                      type="button"
                      onClick={() =>
                        setActiveIndex((prev) => (prev === idx ? null : idx))
                      }
                    >
                      <i className={`${item.icon} me-2 text-success`}></i>
                      {item.title}
                    </button>
                  </h2>

                  {activeIndex === idx && (
                    <div className="accordion-collapse show">
                      <div className="accordion-body bg-success bg-opacity-10 rounded-bottom">
                        {item.content}
                        <hr className="my-4" />
                        <div className="text-center mb-3">
                          <p className="mb-3 fw-medium">
                            Masih bingung atau punya pertanyaan khusus? Klik
                            tombol di bawah ya.
                          </p>
                          <button
                            className="btn btn-success w-100"
                            data-bs-toggle="modal"
                            data-bs-target="#modalJualIkan"
                          >
                            Butuh Bantuan
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4 mb-5">
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 shadow px-4 py-2 rounded-pill "
            data-bs-toggle="modal"
            data-bs-target="#modalJualIkan"
          >
            <i className="fas fa-plus-circle me-2"></i> Tambah Penawaran Ikan
          </button>

          <button
            className="btn btn-outline-success px-4 py-2 rounded-pill shadow-sm"
            onClick={() => router.push("/hasil-ikan")}
          >
            <i className="fas fa-eye me-2"></i> Lihat Ikan yang Ditawarkan
          </button>
        </div>

        <div
          className="modal fade"
          id="modalJualIkan"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header bg-success text-white">
                  <h5 className="modal-title">Form Penawaran Jual Ikan</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-4 d-flex flex-column flex-md-row align-items-center gap-3">
                    <Image
                      src="/images/latolato.webp"
                      alt="Lato-Lato Memancing"
                      width={160}
                      height={120}
                      className="rounded shadow-sm border border-success"
                      style={{ objectFit: "cover" }}
                    />
                    <p
                      className="mb-0 text-muted"
                      style={{ fontSize: "0.95rem" }}
                    >
                      <strong>Lato-lato</strong> adalah metode memancing
                      tradisional khas warga Stabat. Istilah ini merujuk pada
                      cara unik menangkap ikan secara alami dan ramah
                      lingkungan.
                    </p>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nama Penjual</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">No. HP</label>
                      <input
                        type="text"
                        className="form-control"
                        name="hp"
                        value={formData.hp}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Kelurahan / Desa</label>
                    <select
                      className="form-select"
                      name="kelurahan"
                      value={formData.kelurahan}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Pilih Wilayah --</option>
                      {villageLocations.map((v) => (
                        <option key={v.id} value={v.name}>
                          {v.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Alamat Lengkap</label>
                    <textarea
                      className="form-control"
                      rows={2}
                      name="alamat"
                      value={formData.alamat}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Jenis Ikan</label>
                    <input
                      type="text"
                      className="form-control"
                      name="jenisIkan"
                      value={formData.jenisIkan}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Upload Gambar Ikan</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setSelectedFile(e.target.files[0]);
                        }
                      }}
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Harga per Kg (Rp)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="hargaPerKg"
                        value={formData.hargaPerKg}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Stok Tersedia (Kg)</label>
                      <input
                        type="number"
                        className="form-control"
                        name="stokKg"
                        value={formData.stokKg}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Catatan Tambahan</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      name="catatan"
                      value={formData.catatan}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn btn-success">
                    Kirim Penawaran
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
