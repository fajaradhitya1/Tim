"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function SumberDayaMasyarakatPage() {
  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    produk: "",
    lainnya: "",
    alamat: "",
    kelurahan: "",
    jenis: "",
    keterangan: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/sumber-daya", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Berhasil", "Tawaran berhasil dikirim", "success").then(
          () => {
            // Redirect ke halaman produk setelah submit
            router.push("/produkditawarkan");
          }
        );
      } else {
        Swal.fire("Gagal", data.error || "Gagal mengirim data", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Terjadi kesalahan saat mengirim", "error");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
        Form Penawaran Produk Tidak Terpakai
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nama"
          value={form.nama}
          onChange={handleChange}
          required
          placeholder="Nama"
          className="w-full border p-2 rounded"
        />
        <input
          name="telepon"
          value={form.telepon}
          onChange={handleChange}
          required
          placeholder="No Telepon"
          className="w-full border p-2 rounded"
        />
        <select
          name="produk"
          value={form.produk}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">-- Pilih Produk --</option>
          <option value="Buah">Buah</option>
          <option value="Bambu / Bata">Bambu / Bata</option>
          <option value="Makanan Pesta Bersisa">Makanan Pesta Bersisa</option>
          <option value="Lainnya">Lainnya</option>
        </select>

        {form.produk === "Lainnya" && (
          <input
            name="lainnya"
            value={form.lainnya}
            onChange={handleChange}
            placeholder="Jenis Produk Lainnya"
            className="w-full border p-2 rounded"
          />
        )}

        <select
          name="kelurahan"
          value={form.kelurahan}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">-- Pilih Kelurahan --</option>
          <option value="Stabat Baru">Stabat Baru</option>
          <option value="Karang Rejo">Karang Rejo</option>
          <option value="Dewi Sartika">Dewi Sartika</option>
          {/* Tambahkan lainnya jika perlu */}
        </select>

        <textarea
          name="alamat"
          value={form.alamat}
          onChange={handleChange}
          required
          placeholder="Alamat Lengkap"
          className="w-full border p-2 rounded"
        />

        <select
          name="jenis"
          value={form.jenis}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">-- Pilih Jenis Penawaran --</option>
          <option value="gratis">Gratis</option>
          <option value="berbayar">Berbayar</option>
        </select>

        <textarea
          name="keterangan"
          value={form.keterangan}
          onChange={handleChange}
          required
          placeholder="Keterangan"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}
