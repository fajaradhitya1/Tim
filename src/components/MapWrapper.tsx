"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { villageLocations } from "@/app/data/villages";

export interface Report {
  id: number;
  lat: number;
  lng: number;
  description: string;
  issues?: string[];
  imageUrl: string;
}

interface MapWrapperProps {
  reports: Report[];
  onReady?: (actions: { flyToMarker: (id: number | string) => void }) => void;
  selectedVillageId?: string;
  selectedCategory?: string;
  center?: { lat: number; lng: number }; // support external center
}

// Icon marker laporan
const getReportIcon = (report: Report): L.DivIcon => {
  const kategori = report.issues?.[0] || "Lainnya";
  const colorMap: Record<string, string> = {
    "Layanan Publik": "#4ade80",
    Wisata: "#60a5fa",
    Infrastruktur: "#facc15",
    "Lalu Lintas": "#f87171",
    Lainnya: "#cbd5e1",
  };
  const bgColor = colorMap[kategori] || "#ddd";

  return L.divIcon({
    className: "",
    iconAnchor: [25, 50],
    popupAnchor: [0, -45],
    html: `
      <div style="
        border: 3px solid white;
        border-radius: 50%;
        background: ${bgColor};
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 8px rgba(0,0,0,0.3);
      ">
        <img src="${report.imageUrl}" style="width: 45px; height: 45px; border-radius: 50%;" />
      </div>
    `,
  });
};

// Icon marker desa
const getVillageIcon = (imageUrl: string): L.DivIcon => {
  return L.divIcon({
    className: "",
    iconAnchor: [25, 50],
    popupAnchor: [0, -45],
    html: `
      <div style="
        border: 3px solid white;
        border-radius: 50%;
        background: #2563eb;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        box-shadow: 0 0 8px rgba(0,0,0,0.3);
      ">
        <img src="${imageUrl}" style="width: 45px; height: 45px; border-radius: 50%;" />
      </div>
    `,
  });
};

const MapWrapper: React.FC<MapWrapperProps> = ({
  reports,
  onReady,
  selectedVillageId,
  selectedCategory,
  center: propCenter,
}) => {
  const [mounted, setMounted] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const markerRefs = useRef<Record<number | string, L.Marker>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (onReady && mapRef.current) {
      onReady({
        flyToMarker: (id: number | string) => {
          const marker = markerRefs.current[id];
          if (marker && mapRef.current) {
            const latlng = marker.getLatLng();
            mapRef.current.flyTo(latlng, 16, { duration: 1 });
            marker.openPopup();
          }
        },
      });
    }
  }, [onReady, reports]);

  useEffect(() => {
    if (!selectedVillageId) return;
    const marker = markerRefs.current[`village-${selectedVillageId}`];
    if (marker && mapRef.current) {
      const latlng = marker.getLatLng();
      mapRef.current.flyTo(latlng, 16, { duration: 1 });
      marker.openPopup();
    }
  }, [selectedVillageId]);

  if (!mounted) return null;

  // Filter reports
  const filteredReports =
    selectedCategory && selectedCategory.toLowerCase() !== "semua"
      ? reports.filter((r) =>
          r.issues?.some(
            (issue) => issue.toLowerCase() === selectedCategory.toLowerCase()
          )
        )
      : reports;

  // Filter villages
  const showVillages =
    !selectedCategory || selectedCategory.toLowerCase() === "semua"
      ? villageLocations
      : ["wisata", "layanan publik"].includes(selectedCategory.toLowerCase())
      ? []
      : villageLocations;

  const filteredVillages = selectedVillageId
    ? showVillages.filter((v) => v.id.toString() === selectedVillageId)
    : showVillages;

  const allLocations = [...filteredReports, ...filteredVillages];

  const center = propCenter
    ? propCenter
    : allLocations.length
    ? { lat: allLocations[0].lat, lng: allLocations[0].lng }
    : { lat: 3.6054, lng: 98.6794 };

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      scrollWheelZoom
      style={{ height: "500px", width: "100%", borderRadius: "12px" }}
      whenReady={() => {
        if (mapRef.current && allLocations.length > 0 && !propCenter) {
          const bounds = L.latLngBounds(
            allLocations.map((r) => [r.lat, r.lng])
          );
          mapRef.current.fitBounds(bounds, { padding: [30, 30] });
        }
      }}
      ref={(mapInstance) => {
        if (mapInstance) mapRef.current = mapInstance;
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {filteredReports.map((r) => (
        <Marker
          key={r.id}
          position={[r.lat, r.lng]}
          icon={getReportIcon(r)}
          ref={(ref) => {
            if (ref) markerRefs.current[r.id] = ref;
          }}
        >
          <Popup>
            <div className="text-sm space-y-2 min-w-[220px] max-w-[250px]">
              <img
                src={r.imageUrl}
                alt="foto laporan"
                className="w-full h-32 object-cover rounded"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/fallback.jpg";
                }}
              />
              <p className="font-bold text-blue-700">📍 Titik Laporan</p>
              <p>
                <span className="font-semibold">Deskripsi:</span>{" "}
                {r.description}
              </p>
              {r.issues?.length ? (
                <p>
                  <span className="font-semibold">Kategori:</span>{" "}
                  {r.issues.join(", ")}
                </p>
              ) : (
                <p className="text-gray-400 italic">Tidak ada kategori</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {filteredVillages.map((v) => (
        <Marker
          key={`village-${v.id}`}
          position={[v.lat, v.lng]}
          icon={getVillageIcon(v.imageUrl)}
          ref={(ref) => {
            if (ref) markerRefs.current[`village-${v.id}`] = ref;
          }}
        >
          <Popup>
            <div className="text-sm min-w-[200px] space-y-1">
              <p className="font-semibold">{v.name}</p>
              <p>{v.description}</p>
              <img
                src={v.imageUrl}
                alt={v.description}
                className="w-full h-28 object-cover rounded"
              />
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapWrapper;
