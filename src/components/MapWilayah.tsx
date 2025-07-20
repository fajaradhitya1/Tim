"use client";

import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Warna per wilayah
const wilayahColors: Record<string, string> = {
  "Desa Mangga": "#f87171",
  "Desa Banyumas": "#fb923c",
  "Desa Kwala Begumit": "#facc15",
  "Desa Ara Condong": "#4ade80",
  "Desa Pantai Gemi": "#60a5fa",
  "Desa Karang Rejo": "#fdba74",
  "Kelurahan Stabat Baru": "#c084fc",
  "Kelurahan Kwala Bingai": "#f472b6",
  "Kelurahan Perdamaian": "#34d399",
  "Kelurahan Dendang": "#fcd34d",
  "Kelurahan Paya Mabar": "#a78bfa",
  "Kelurahan Sidomulyo": "#f87171",
};

// Fungsi custom icon per wilayah
function getCustomIcon(location: any) {
  const color = wilayahColors[location.wilayah] || "#ccc";
  return L.divIcon({
    className: "",
    iconAnchor: [25, 50],
    popupAnchor: [0, -40],
    html: `
      <div style="
        border: 3px solid white;
        border-radius: 50%;
        background: ${color};
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 8px rgba(0,0,0,0.3);
      ">
        <img src="${location.imageUrl}" style="width: 45px; height: 45px; border-radius: 50%;" />
      </div>
    `,
  });
}

export default function MapWilayah({ reports, mapRef }: any) {
  if (!reports || reports.length === 0) {
    return (
      <div className="text-center text-gray-500">Tidak ada data wilayah.</div>
    );
  }

  // Hitung pusat awal peta berdasarkan rata-rata lat lng
  const avgLat =
    reports.reduce((sum: number, r: any) => sum + r.lat, 0) / reports.length;
  const avgLng =
    reports.reduce((sum: number, r: any) => sum + r.lng, 0) / reports.length;

  useEffect(() => {
    if (mapRef.current && reports.length > 0) {
      const bounds = L.latLngBounds(reports.map((r: any) => [r.lat, r.lng]));
      mapRef.current.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [reports]);

  return (
    <MapContainer
      center={[avgLat, avgLng]}
      zoom={13}
      style={{ height: "350px", width: "100%" }}
      scrollWheelZoom={true}
      whenCreated={(map) => {
        mapRef.current = {
          fitBounds: (bounds: any) => map.fitBounds(bounds),
          flyToMarker: (id: number) => {
            const report = reports.find((r: any) => r.id === id);
            if (report) {
              map.flyTo([report.lat, report.lng], 16, { duration: 1.5 });
              setTimeout(() => {
                const popup = L.popup()
                  .setLatLng([report.lat, report.lng])
                  .setContent(
                    `<strong>${report.wilayah}</strong><br>${report.description}`
                  );
                map.openPopup(popup);
              }, 800);
            }
          },
        };
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {reports.map((r: any) => (
        <Marker key={r.id} position={[r.lat, r.lng]} icon={getCustomIcon(r)}>
          <Popup>
            <strong>{r.wilayah}</strong>
            <br />
            {r.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
