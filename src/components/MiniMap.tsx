"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MiniMapProps {
  coords: { lat: number; lng: number } | null;
  center?: { lat: number; lng: number } | null;
  setCoords: (coords: { lat: number; lng: number }) => void;
  allReports?: {
    lat: number;
    lng: number;
    nama?: string;
    deskripsi?: string;
    imageUrl?: string;
  }[];
}

function FlyToCenter({
  center,
}: {
  center: { lat: number; lng: number } | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lng], 15);
    }
  }, [center, map]);
  return null;
}

function LocationClickHandler({
  setCoords,
}: {
  setCoords: (coords: { lat: number; lng: number }) => void;
}) {
  useMapEvents({
    click(e) {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

const MiniMap = ({ coords, setCoords, center, allReports }: MiniMapProps) => {
  const defaultCenter = { lat: 3.74, lng: 98.48 };

  return (
    <div className="h-64 w-full rounded border overflow-hidden">
      <MapContainer
        center={coords || center || defaultCenter}
        zoom={15}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker dari semua UMKM dan lokasi desa berupa foto */}
        {allReports?.map((report, idx) => (
          <Marker
            key={idx}
            position={[report.lat, report.lng]}
            icon={L.divIcon({
              className: "custom-icon",
              html: `<img src="${
                report.imageUrl || "/produk/default.jpg"
              }" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; object-fit: cover;" />`,
              iconSize: [40, 40],
              iconAnchor: [20, 40],
            })}
          />
        ))}

        {/* Marker lokasi pilihan user */}
        {coords && (
          <Marker
            position={[coords.lat, coords.lng]}
            icon={L.icon({
              iconUrl: "/marker-icon.png",
              iconSize: [30, 45],
              iconAnchor: [15, 45],
            })}
          />
        )}

        <FlyToCenter center={center || defaultCenter} />

        <LocationClickHandler setCoords={setCoords} />
      </MapContainer>
    </div>
  );
};

export default MiniMap;
