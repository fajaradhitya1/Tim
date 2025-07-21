"use client";
import { useState, useEffect } from "react";

export default function UmkmForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    wilayah: "",
    lat: "",
    lng: "",
    imageUrl: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setForm((f) => ({
          ...f,
          lat: pos.coords.latitude.toString(),
          lng: pos.coords.longitude.toString(),
        })),
      () => alert("Tidak dapat mendeteksi lokasi.")
    );
  }, []);

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/umkm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        lat: parseFloat(form.lat),
        lng: parseFloat(form.lng),
      }),
    });

    if (res.ok) {
      setForm({
        nama: "",
        deskripsi: "",
        wilayah: "",
        lat: "",
        lng: "",
        imageUrl: "",
      });
      onSuccess();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 mb-6 bg-white p-4 rounded shadow"
    >
      <h2 className="text-lg font-bold mb-2">Tambah Produk UMKM</h2>
      <input
        name="nama"
        value={form.nama}
        onChange={handleChange}
        placeholder="Nama Produk"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="deskripsi"
        value={form.deskripsi}
        onChange={handleChange}
        placeholder="Deskripsi"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="wilayah"
        value={form.wilayah}
        onChange={handleChange}
        placeholder="Wilayah"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        placeholder="URL Gambar"
        className="w-full border p-2 rounded"
        required
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
        Tambah
      </button>
    </form>
  );
}
