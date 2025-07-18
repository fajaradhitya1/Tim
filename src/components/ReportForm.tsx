"use client";

import React, { useEffect, useState } from "react";
import { useReportStore } from "@/app/store/reportStore"; // store global

type Location = {
  lat: number;
  lng: number;
};

const issueTypes = [
  "Jalan Rusak",
  "Longsor",
  "Jembatan Retak",
  "Pohon Tumbang",
  "Banjir",
];

const ReportForm = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [description, setDescription] = useState("");
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addReport = useReportStore((state) => state.addReport);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation tidak didukung.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        setError("Gagal mengambil lokasi: " + err.message);
      }
    );
  }, []);

  const toggleIssue = (issue: string) => {
    setSelectedIssues((prev) =>
      prev.includes(issue) ? prev.filter((i) => i !== issue) : [...prev, issue]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !image || selectedIssues.length === 0) {
      alert("Lengkapi semua data laporan.");
      return;
    }

    const newReport = {
      id: Date.now(),
      description,
      issues: selectedIssues,
      imageUrl: URL.createObjectURL(image),
      ...location,
    };

    addReport(newReport);
    alert("Laporan terkirim!");
    setDescription("");
    setImage(null);
    setSelectedIssues([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded bg-white shadow"
    >
      <h2 className="text-xl font-bold mb-4">Formulir Laporan Infrastruktur</h2>

      <div className="mb-4">
        <label className="block mb-1">Jenis Laporan:</label>
        <div className="space-y-1">
          {issueTypes.map((issue) => (
            <label key={issue} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={issue}
                checked={selectedIssues.includes(issue)}
                onChange={() => toggleIssue(issue)}
              />
              <span>{issue}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Keterangan Tambahan:</label>
        <textarea
          className="w-full border rounded p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Foto:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Lokasi Terkini:</label>
        {location ? (
          <p className="text-sm text-green-600">
            Lat: {location.lat}, Lng: {location.lng}
          </p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <p className="text-sm text-gray-500">Mengambil lokasi...</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Kirim Laporan
      </button>
    </form>
  );
};

export default ReportForm;
