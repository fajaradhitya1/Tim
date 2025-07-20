"use client";

import React, { useState } from "react";
import PublicServiceGallery from "./PublicServiceGallery";
import MapWrapper from "./MapWrapper";
import { publicServicesData } from "../app/data/PublicService";

const Dashboard: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
    description: string;
    imageUrl: string;
  } | null>(null);

  const handleServiceClick = (service: any) => {
    setSelectedImages(service.images);
    setSelectedLocation({
      lat: service.location.lat,
      lng: service.location.lng,
      name: service.name,
      description: service.description,
      imageUrl: service.images[0] || "/images/fallback.jpg",
    });
  };

  // Buat satu report agar MapWrapper bisa menampilkan marker tunggal
  const reports = selectedLocation
    ? [
        {
          id: 1,
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
          description: selectedLocation.description,
          issues: ["Layanan Publik"],
          imageUrl: selectedLocation.imageUrl,
        },
      ]
    : [];

  return (
    <div className="dashboard px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Layanan Publik</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {publicServicesData.map((service) => (
          <div
            key={service.id}
            className={`p-4 border rounded-lg cursor-pointer transition hover:shadow ${
              selectedLocation?.name === service.name
                ? "bg-blue-50 border-blue-500"
                : "bg-white"
            }`}
            onClick={() => handleServiceClick(service)}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {service.name}
            </h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Galeri Foto */}
      <PublicServiceGallery images={selectedImages} />

      {/* Peta */}
      <div className="mt-6">
        <MapWrapper
          reports={reports}
          center={
            selectedLocation || { lat: 3.5997, lng: 98.674 } // fallback Sumatera Utara
          }
        />
      </div>
    </div>
  );
};

export default Dashboard;
