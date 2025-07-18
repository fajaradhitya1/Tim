import React, { useState } from "react";
import PublicServiceGallery from './PublicServiceGallery';
import MapWrapper from './MapWrapper';
import { publicServicesData } from '../app/data/PublicService'; // ✅ Removed `.ts` extension

interface DashboardProps {
  selectedService?: string; // ID layanan publik yang dipilih
}

const Dashboard: React.FC<DashboardProps> = ({ selectedService }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // State untuk menyimpan foto-foto layanan publik
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null); // State untuk lokasi marker

  const handleServiceClick = (service: any) => {
    setSelectedImages(service.images); // Update state dengan foto-foto layanan publik
    setSelectedLocation(service.location); // Update state dengan lokasi layanan publik
  };

  return (
    <div className="dashboard">
      <h1>Layanan Publik</h1>
      <div className="services-list">
        {publicServicesData.map((service) => (
          <div
            key={service.id}
            className={`service-item ${
              selectedService === service.id ? "active" : ""
            }`}
            onClick={() => handleServiceClick(service)}
          >
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
      {/* Galeri Foto */}
      <PublicServiceGallery images={selectedImages} />

      {/* Peta */}
      <MapWrapper
        center={selectedLocation || { lat: 3.5997, lng: 98.674 }} // Default center Sumatera Utara
        markers={[selectedLocation]}
      />
    </div>
  );
};

export default Dashboard;
