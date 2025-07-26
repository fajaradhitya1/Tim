"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [selectedProduk, setSelectedProduk] = useState("");

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  useEffect(() => {
    const inputGroup = document.getElementById("lainnyaInputGroup");
    const uploadGroup = document.getElementById("uploadFotoGroup");
    if (inputGroup) {
      inputGroup.style.display =
        selectedProduk === "Lainnya" ? "block" : "none";
    }
    if (uploadGroup) {
      uploadGroup.style.display =
        selectedProduk === "Lainnya" ? "block" : "none";
    }
  }, [selectedProduk]);

  const openModal = (produk: string) => {
    setSelectedProduk(produk);
    const modalEl = modalRef.current;
    if (modalEl && typeof window !== "undefined") {
      const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (
      formData.get("produk") === "Lainnya" &&
      !(formData.get("foto") as File)?.name
    ) {
      alert("Silakan unggah foto untuk produk lainnya.");
      return;
    }

    try {
      const res = await fetch("/api/auth/sumber-daya", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.status === "success") {
        alert("Tawaran berhasil dikirim!");
        form.reset();
        setSelectedProduk("");

        const modalEl = modalRef.current;
        if (modalEl) {
          const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
          const modalInstance = bootstrap.Modal.getInstance(modalEl);
          if (modalInstance) modalInstance.hide();
        }

        router.push("/produkditawarkan");
      } else {
        alert("Gagal mengirim tawaran.");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat mengirim.");
    }
  };

  const slides = [
    {
      filename: "carikerja.png",
      title: "Keterampilan",
      desc: "Daftarkan diri anda dan skill yang anda miliki",
    },
    {
      filename: "rewang.PNG",
      title: "Rewang",
      desc: "Punya makanan bersisa hasil rewang, share ke orang yang juga membutuhkan",
    },
    {
      filename: "sisa_bangunan.png",
      title: "Sisa Bangunan",
      desc: "Bingung buang kemana? Share, mungkin orang lain butuh",
    },
    {
      filename: "buah_jatuh.png",
      title: "Buah tidak termanfaatkan",
      desc: "Share, siapa tahu ada pembelinya",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="container p-0">
      {/* Carousel */}
      <div
        id="carouselExampleCaptions"
        className="carousel slide rounded-0 overflow-hidden shadow"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        {/* INDICATORS */}
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={i}
              className={i === 0 ? "active" : ""}
              aria-current={i === 0}
              aria-label={`Slide ${i + 1}`}
            ></button>
          ))}
        </div>

        {/* SLIDES */}
        <div className="carousel-inner">
          {slides.map((item, i) => (
            <div
              key={item.filename}
              className={`carousel-item ${i === 0 ? "active" : ""}`}
            >
              <div
                style={{
                  width: "100%",
                  height: "450px",
                  position: "relative",
                }}
              >
                <Image
                  src={`/images/carousel/${item.filename}`}
                  alt={item.title}
                  fill
                  className="d-block w-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="carousel-caption d-none d-md-block">
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CONTROLS */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Camat & Sambutan */}
      <div className="row mt-5 g-4 align-items-start">
        {/* Foto Camat */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0">
            <Image
              src="/images/camat.png"
              width={300}
              height={300}
              alt="Camat"
              className="card-img-top object-fit-cover"
            />
            <div className="card-body text-center">
              <h5 className="fw-bold mb-1">Bambang Eko Winarno, S.STP</h5>
              <p className="text-muted mb-0">Camat Stabat</p>
            </div>
          </div>
        </div>

        {/* Kata Sambutan */}
        <div className="col-md-8">
          <div className="card h-100 shadow-sm border-0 p-4">
            <h2 className="fw-bold mb-3 text-success">Kata Sambutan</h2>
            <div
              className="text-muted"
              style={{ textAlign: "justify", lineHeight: "1.8" }}
            >
              <p>Assalamu’alaikum warahmatullahi wabarakatuh,</p>
              <p>
                Puji syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa atas
                segala rahmat dan karunia-Nya, sehingga website{" "}
                <strong>Smart City Stabat</strong> ini dapat dibangun dan
                dikembangkan sebagai wujud komitmen kami dalam mewujudkan tata
                kelola pemerintahan yang transparan, partisipatif, dan berbasis
                teknologi informasi.
              </p>
              <p>
                Website ini hadir sebagai salah satu sarana untuk memperkuat
                pelayanan publik, mempercepat akses informasi, dan membuka ruang
                kolaborasi antara pemerintah, masyarakat, dan seluruh pemangku
                kepentingan dalam membangun Kecamatan Stabat yang lebih cerdas,
                tertata, dan berdaya saing tinggi.
              </p>
              <p>
                Kami percaya bahwa dengan semangat kebersamaan dan pemanfaatan
                teknologi digital secara bijak, kita mampu menciptakan inovasi
                yang membawa manfaat nyata bagi kehidupan masyarakat, baik dalam
                bidang pendidikan, ekonomi, kesehatan, maupun sosial
                kemasyarakatan.
              </p>
              <p>
                Akhir kata, kami mengajak seluruh warga Stabat untuk turut
                berperan aktif dalam mendukung dan memanfaatkan platform ini
                secara positif demi kemajuan daerah kita tercinta.
              </p>
              <p>Wassalamu’alaikum warahmatullahi wabarakatuh</p>
              <p className="mt-4 mb-0">
                <strong>Bambang Eko Winarno, S.STP</strong>
                <br />
                Camat Stabat
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SD Masyarakat */}
      <div className="row mt-4 align-items-center">
        <div className="col-md-4">
          <Image
            src="/images/SD_Manusia/SD_Manusia_Poster.png"
            width={500}
            height={400}
            alt="SD Masyarakat"
            className="img-fluid"
          />
        </div>
        <div className="col-md-8">
          <div className="px-2">
            <h2 className="fw-bold mb-3 text-success">
              Sumber Daya Tidak Terpakai di Masyarakat
            </h2>

            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item border-0 ps-0">
                🧱 <strong>Sisa Bangunan</strong> (Pecahan Batu Bata)
              </li>
              <li className="list-group-item border-0 ps-0">
                🍱 <strong>Makanan Berlebih</strong> (Hasil Rewang atau Pesta)
              </li>
              <li className="list-group-item border-0 ps-0">
                🍈 <strong>Buah yang Tidak Dipetik</strong> (Jambu, Belimbing)
              </li>
              <li className="list-group-item border-0 ps-0">
                🔄 <strong>Dan lain-lain</strong> yang masih bisa dimanfaatkan
              </li>
            </ul>

            <p className="text-muted fst-italic mb-4">
              Tambah nilai kebermanfaatannya dengan{" "}
              <strong>berbagi ke sesama</strong>.
            </p>

            <div>
              <Link
                href="/produkditawarkan"
                className="btn btn-success rounded-pill px-4 py-2 shadow-sm"
              >
                🌱 Lebih Lanjut
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Kartu Penawaran */}
      <div className="container py-5">
        <h1 className="text-center fw-bold mb-4 text-success">
          Sumber Daya Masyarakat Tidak Termanfaatkan
        </h1>

        <div className="row g-4">
          {[
            {
              title: "Buah Tidak Dimanfaatkan",
              desc: "🍈 Punya buah segar seperti belimbing, mangga, atau jambu yang jatuh sia-sia? Tawarkan untuk mengurangi limbah dan jadi pemasukan!",
              image: "/images/sdmas/belimbing.jpeg",
              value: "Buah",
            },
            {
              title: "Bambu / Sisa Bangunan",
              desc: "🧱 Sisa bangunan seperti genteng pecah, bambu, atau bata bisa berguna untuk timbunan atau proyek kecil.",
              image: "/images/sdmas/bata.jpeg",
              value: "Bambu / Bata",
            },
            {
              title: "Nasi Berlebih Rewang",
              desc: "🍱 Makanan sisa hajatan sering terbuang. Tawarkan secara gratis untuk yang membutuhkan. Berbagi itu berkah!",
              image: "/images/sdmas/rewang 2.PNG",
              value: "Makanan Pesta Bersisa",
            },
          ].map((item, i) => (
            <div key={i} className="col-md-4">
              <div className="card h-100 shadow-lg border-0 rounded-4 overflow-hidden hover-card transition">
                <div className="overflow-hidden" style={{ height: "230px" }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={230}
                    className="w-100 h-100 object-fit-cover"
                    style={{ objectPosition: "center" }}
                  />
                </div>
                <div className="card-body d-flex flex-column p-4">
                  <h5 className="card-title text-success fw-semibold">
                    {item.title}
                  </h5>
                  <p className="card-text text-muted flex-grow-1">
                    {item.desc}
                  </p>
                  <button
                    className="btn btn-success mt-3 w-100 rounded-pill d-flex align-items-center justify-content-center gap-2"
                    onClick={() => openModal(item.value)}
                  >
                    <i className="bi bi-send"></i> Tawarkan Sekarang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .hover-card {
            transition: all 0.3s ease;
          }

          .hover-card:hover {
            transform: translateY(-6px) scale(1.01);
            box-shadow: 0 10px 25px rgba(0, 128, 0, 0.15);
          }
        `}</style>

        {/* Tombol Tambahan */}
        <div className="text-center mt-5">
          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
            <button
              className="btn btn-outline-success px-4 py-2"
              onClick={() => openModal("Lainnya")}
            >
              Tawarkan Produk Lainnya
            </button>

            {/* "atau" versi mobile di tengah */}
            <span className="fw-semibold text-muted d-md-none">atau</span>

            {/* "atau" versi desktop di tengah horizontal */}
            <span className="fw-semibold text-muted d-none d-md-inline">
              atau
            </span>

            <Link
              href="/produkditawarkan/"
              className="btn btn-success px-4 py-2"
            >
              Lihat Produk yang Ditawarkan
            </Link>
          </div>
        </div>

        {/* Modal Form Penawaran */}
        <div
          className="modal fade"
          id="modalTawarkan"
          ref={modalRef}
          tabIndex={-1}
          aria-labelledby="modalTawarkanLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <form id="formTawaran" onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Form Penawaran</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nama</label>
                    <input
                      name="nama"
                      type="text"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">No Telepon</label>
                    <input
                      name="telepon"
                      type="tel"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Jenis Produk</label>
                    <select
                      name="produk"
                      className="form-select"
                      value={selectedProduk}
                      onChange={(e) => setSelectedProduk(e.target.value)}
                      required
                    >
                      <option value="">-- Pilih Produk --</option>
                      <option value="Buah">Buah</option>
                      <option value="Bambu / Bata">Bambu / Bata</option>
                      <option value="Makanan Pesta Bersisa">
                        Makanan Pesta Bersisa
                      </option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div
                    id="lainnyaInputGroup"
                    className="mb-3"
                    style={{ display: "none" }}
                  >
                    <div
                      id="uploadFotoGroup"
                      className="mb-3"
                      style={{ display: "none" }}
                    >
                      <label className="form-label">Upload Foto</label>
                      <input
                        name="foto"
                        type="file"
                        accept="image/*"
                        className="form-control"
                      />
                    </div>

                    <label className="form-label">Produk Lainnya</label>
                    <input
                      name="lainnya"
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Kelurahan</label>
                    <select name="kelurahan" className="form-select" required>
                      <option value="">-- Pilih Kelurahan --</option>
                      <option value="Stabat Baru">Stabat Baru</option>
                      <option value="Dendang">Dendang</option>
                      <option value="Karang Rejo">Karang Rejo</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Alamat</label>
                    <textarea
                      name="alamat"
                      className="form-control"
                      rows={2}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Jenis Penawaran</label>
                    <select name="jenis" className="form-select" required>
                      <option value="">-- Pilih Jenis --</option>
                      <option value="gratis">Gratis</option>
                      <option value="berbayar">Berbayar</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Keterangan</label>
                    <textarea
                      name="keterangan"
                      className="form-control"
                      rows={3}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-success" type="submit">
                    Kirim
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
