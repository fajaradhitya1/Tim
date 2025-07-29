"use client";

import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import { villageLocations } from "../data/villages";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";




export default function SmartCityPage() {
  const pathname = usePathname();
  

  const [kategori, setKategori] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    hp: "",
    kelurahan: "",
    alamat: "",
    kategori: "",
    kategoriLain: "",
    keterangan: "",
  });

  const carouselInnerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js").then(() => {
      setIsClient(true);
    });
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!carouselInnerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselInnerRef.current.offsetLeft);
    setScrollLeft(carouselInnerRef.current.scrollLeft);
  };
  const onMouseLeave = () => setIsDragging(false);
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselInnerRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselInnerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselInnerRef.current.scrollLeft = scrollLeft - walk;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (!carouselInnerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselInnerRef.current.offsetLeft);
    setScrollLeft(carouselInnerRef.current.scrollLeft);
  };
  const onTouchEnd = () => setIsDragging(false);
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselInnerRef.current) return;
    const x = e.touches[0].pageX - carouselInnerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselInnerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKategoriChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setKategori(e.target.value);
    setFormData({
      ...formData,
      kategori: e.target.value,
      kategoriLain: e.target.value === "Lainnya" ? "" : formData.kategoriLain,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      kategori: kategori === "Lainnya" ? formData.kategoriLain : kategori,
    };

    try {
      const res = await fetch("/api/auth/simpan-bantuan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const json = await res.json();
      console.log("STATUS:", res.status);
      console.log("RESPONSE:", json);

      if (res.ok && json.success) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Permintaan bantuan berhasil dikirim.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/sdman";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: json.message || "Gagal mengirim data.",
        });
      }
    } catch (err) {
      console.error("ERROR REQUEST:", err);
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: "Tidak dapat mengirim permintaan.",
      });
    }
  };

  const accordionData = [
    {
      icon: "fas fa-box-open",
      title: "Punya Produk Dagangan Tapi Bingung Pengemasannya?",
      content: (
        <>
          <p>
            <strong>Punya produk sendiri</strong> tapi bingung bagaimana cara{" "}
            <span className="text-success">mengemasnya</span> agar terlihat{" "}
            <em>menarik</em> dan profesional?
          </p>
          <p>Kami punya panduan praktis dan mudah diikuti untuk kamu.</p>
          <p>
            🎥{" "}
            <a
              href="https://www.youtube.com/watch?v=contoh_link_pengemasan"
              target="_blank"
              rel="noreferrer"
              className="text-success fw-semibold text-decoration-none"
            >
              Tonton Video Tutorial Pengemasan Produk
            </a>
          </p>
        </>
      ),
    },
    {
      icon: "fas fa-shopping-cart",
      title: "Bingung Cara Jualan Online?",
      content: (
        <>
          <p>
            Bingung cara memasarkan produkmu secara online? Tenang, kamu tidak
            sendiri!
          </p>
          <p>
            Kami siap bantu edukasi dan arahkan ke marketplace populer & media
            sosial.
          </p>
          <p>
            🎥{" "}
            <a
              href="https://www.youtube.com/watch?v=contoh_link_jualan_online"
              target="_blank"
              rel="noreferrer"
              className="text-success fw-semibold text-decoration-none"
            >
              Tonton Video Panduan Jualan Online
            </a>
          </p>
        </>
      ),
    },
    {
      icon: "fas fa-fish",
      title: "Mau Ikan Sungai Tapi Bingung Cari Orangnya?",
      content: (
        <>
          <p>
            Suka makan <strong>ikan sungai segar</strong> tapi bingung cari
            orang yang bisa menyediakannya?
          </p>
          <p>
            Kami bantu hubungkan kamu dengan <strong>pemancing lokal</strong>.
          </p>
        </>
      ),
    },
    {
      icon: "fas fa-user-tie",
      title: "Punya Skill Tapi Belum Ada Kerjaan?",
      content: (
        <>
          <p>Punya keahlian tapi belum dapat kerja tetap?</p>
          <p>
            Kami bantu salurkan ke pelatihan atau proyek harian yang sesuai!
          </p>
        </>
      ),
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const mapRef = useRef<any>(null);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <main
        className={clsx(
          "transition-all duration-300 px-4 sm:px-6",
          collapsed ? "md:ml-4" : "md:ml-0"
        )}
      >
        <div>
          <div className="row mt-4 align-items-center mb-10">
            <div className="col-md-4">
              <Image
                src="/images/SD_Manusia/SD_Manusia_Poster.png"
                width={500}
                height={400}
                alt="SD_Manusia"
                className="img-fluid"
              />
            </div>
            <div className="col-md-8">
              <div className="px-2">
                <h2 className="fw-bold mb-3 text-success">
                  Potensi Sumber Daya Manusia yang Belum Tergarap di Masyarakat
                </h2>

                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item border-0 ps-0">
                    👨‍🔧 <strong>Tenaga Terampil</strong> seperti tukang, montir,
                    atau pekerja bangunan yang sedang mencari peluang
                  </li>
                  <li className="list-group-item border-0 ps-0">
                    👩‍🍳 <strong>Ibu Rumah Tangga</strong> dengan keahlian
                    memasak, menjahit, atau keterampilan kreatif lainnya
                  </li>
                  <li className="list-group-item border-0 ps-0">
                    🎓 <strong>Lulusan Baru</strong> yang siap belajar dan
                    mengembangkan diri untuk memasuki dunia kerja
                  </li>
                  <li className="list-group-item border-0 ps-0">
                    🔄 <strong>Beragam Talenta Lainnya</strong> yang ingin
                    berkontribusi tapi belum menemukan wadah yang tepat
                  </li>
                </ul>

                <p className="text-muted fst-italic mb-4">
                  Mari bersama buka kesempatan dan dukung mereka melalui{" "}
                  <strong>pelatihan, pembinaan, dan proyek produktif</strong>{" "}
                  agar potensi dapat dimaksimalkan.
                </p>

                <div>
                  <button
                    className="btn btn-success w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#modalButuhBantuan"
                  >
                    Ayo memperluas peluang SDM
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div
            id="carouselExampleIndicators"
            className="carousel slide rounded shadow-sm"
            data-bs-ride="carousel"
            style={{
              border: "3px solid #198754",
              width: "100%",
              margin: "auto",
              touchAction: "pan-y", // supaya bisa swipe vertikal
            }}
          >
            <div className="carousel-indicators">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={i}
                  className={i === 0 ? "active" : ""}
                  aria-current={i === 0 ? "true" : undefined}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <div
              ref={carouselInnerRef}
              className="carousel-inner"
              style={{
                height: 350,
                overflow: "hidden",
                cursor: isDragging ? "grabbing" : "grab",
              }}
              onMouseDown={onMouseDown}
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onTouchMove={onTouchMove}
            >
              {["mancing", "keripik", "gula"].map((img, i) => (
                <div
                  key={img}
                  className={`carousel-item ${i === 0 ? "active" : ""}`}
                  style={{ height: "100%" }}
                >
                  <img
                    src={`/images/SD_Manusia/${img}.png`}
                    className="d-block w-100"
                    alt={img}
                    style={{
                      height: "350px",
                      objectFit: "cover",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {/* Accordion */}
          <h1 className="text-center mt-5 mb-4 fw-bold text-success">
            SDM Yang Mungkin Dibutuhkan
          </h1>

          {isClient && (
            <div className="container mb-5">
              <div className="accordion" id="faqAccordion">
                {accordionData.map((item, idx) => (
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

                          {/* Divider */}
                          <hr className="my-4" />

                          {/* Additional info & full-width button */}
                          <div className="text-center mb-3">
                            <p className="mb-3 fw-medium">
                              Masih bingung atau punya pertanyaan khusus? Klik
                              tombol di bawah ya.
                            </p>
                            <button
                              className="btn btn-success w-100"
                              data-bs-toggle="modal"
                              data-bs-target="#modalButuhBantuan"
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

          {/* Tombol utama di bawah */}
          <div className="container text-center mb-5">
            <button
              className="btn btn-success px-4 py-2"
              data-bs-toggle="modal"
              data-bs-target="#modalButuhBantuan"
            >
              <i className="fas fa-hands-helping me-2"></i> Ajukan Bantuan
            </button>
          </div>

          {/* Modal Butuh Bantuan */}
          <div
            className="modal fade"
            id="modalButuhBantuan"
            tabIndex={-1}
            aria-labelledby="modalButuhBantuanLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <form onSubmit={handleSubmit}>
                  <div className="modal-header bg-success text-white">
                    <h5 className="modal-title" id="modalButuhBantuanLabel">
                      Formulir Permintaan Bantuan
                    </h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {/* Form isi */}
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Nama</label>
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
                        <label className="form-label">No. Telepon</label>
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
                        <option value="">-- Pilih Kelurahan / Desa --</option>
                        {villageLocations.map((village) => (
                          <option key={village.id} value={village.name}>
                            {village.name}
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
                        required
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Kategori</label>
                      <select
                        className="form-select"
                        name="kategori"
                        onChange={handleKategoriChange}
                        value={kategori}
                        required
                      >
                        <option value="">-- Pilih Kategori --</option>
                        <option value="Punya Produk Dagangan">
                          Punya Produk Dagangan
                        </option>
                        <option value="Bingung Cara Jualan Online">
                          Bingung Cara Jualan Online
                        </option>
                        <option value="Mau Ikan Sungai">Mau Ikan Sungai</option>
                        <option value="Punya Skill Tapi Belum Ada Kerjaan">
                          Punya Skill Tapi Belum Ada Kerjaan
                        </option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                    {kategori === "Lainnya" && (
                      <div className="mb-3">
                        <label className="form-label">Kategori Lainnya</label>
                        <input
                          type="text"
                          className="form-control"
                          name="kategoriLain"
                          value={formData.kategoriLain}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    )}
                    <div className="mb-3">
                      <label className="form-label">Keterangan</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        name="keterangan"
                        value={formData.keterangan}
                        onChange={handleChange}
                        placeholder="Tulis keterangan tambahan jika perlu"
                      ></textarea>
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
                      Kirim
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bootstrap Bundle JS via CDN */}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}
