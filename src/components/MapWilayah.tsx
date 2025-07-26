"use client";

import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Village {
  id: number;
  name?: string;
  wilayah: string;
  lat: number;
  lng: number;
  description?: string;
  deskripsi?: string;
  imageUrl: string;
  polygon?: [number, number][];
  nama?: string;
  userId?: string;
}

interface MapWilayahProps {
  reports: Village[];
  mapRef?: React.MutableRefObject<{
    flyToMarker: (id: number) => void;
    fitBounds: (bounds: L.LatLngBoundsExpression) => void;
  } | null>;
}

// ✅ Marker dengan gambar berbentuk lingkaran
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

// ✅ Offset marker jika ada yang berada di koordinat sama
function offsetMarkers(locations: Village[]) {
  const grouped: Record<string, Village[]> = {};
  const OFFSET_STEP = 0.0001;

  // Group berdasarkan posisi lat-lng (dibulatkan)
  locations.forEach((item) => {
    const key = `${item.lat.toFixed(6)}-${item.lng.toFixed(6)}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });

  const adjusted: Village[] = [];

  Object.values(grouped).forEach((group) => {
    group.forEach((item, i) => {
      if (group.length === 1) {
        adjusted.push(item);
      } else {
        const angle = (i / group.length) * 2 * Math.PI;
        const offsetLat = Math.sin(angle) * OFFSET_STEP;
        const offsetLng = Math.cos(angle) * OFFSET_STEP;

        adjusted.push({
          ...item,
          lat: item.lat + offsetLat,
          lng: item.lng + offsetLng,
        });
      }
    });
  });

  return adjusted;
}

const MapWilayah: React.FC<MapWilayahProps> = ({ reports, mapRef }) => {
  const internalRef = useRef<L.Map | null>(null);
  const markerRefs = useRef<Record<number, L.Marker>>(Object.create(null));

  const adjustedReports = offsetMarkers(reports);

  const center = adjustedReports.length
    ? { lat: adjustedReports[0].lat, lng: adjustedReports[0].lng }
    : { lat: 3.6054, lng: 98.6794 };

  const handleWhenReady = () => {
    const map = internalRef.current;
    if (!map) return;

    if (mapRef) {
      mapRef.current = {
        fitBounds: (bounds) => map.fitBounds(bounds),
        flyToMarker: (id) => {
          const marker = markerRefs.current[id];
          if (marker) {
            const latlng = marker.getLatLng();
            map.flyTo(latlng, 16, { duration: 1 });
            marker.openPopup();
          }
        },
      };
    }

    // ⛳ Tambahkan logika zoom out di sini
    const bounds = L.latLngBounds(
      reports.map((v) => [v.lat, v.lng] as [number, number])
    );
    const padded = bounds.pad(0.4);
    if (padded.isValid()) {
      map.fitBounds(padded, {
        padding: [40, 40],
        maxZoom: 11, // jangan terlalu dekat
      });
    }
  };



  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "350px", width: "100%" }}
      whenReady={handleWhenReady}
      ref={(mapInstance) => {
        if (mapInstance) internalRef.current = mapInstance;
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* ✅ Marker untuk desa & UMKM */}
      {adjustedReports.map((v) => {
        const keyPrefix = v.userId ? "umkm" : "lokal";
        const markerKey = `${keyPrefix}-${v.id}`;
        return (
          <Marker
            key={markerKey}
            position={[v.lat, v.lng]}
            icon={getVillageIcon(v.imageUrl)}
            ref={(ref) => {
              if (ref) markerRefs.current[v.id] = ref;
            }}
          >
            <Popup>
              <div className="text-sm min-w-[200px] space-y-1">
                <p className="font-semibold">{v.nama || v.name}</p>
                <p>{v.deskripsi || v.description}</p>
                <p className="italic text-xs">{v.wilayah}</p>
                <img
                  src={v.imageUrl}
                  alt={v.nama || v.name}
                  className="mt-2 rounded"
                  width={180}
                  height={100}
                />
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* ✅ Polygon batas wilayah */}
      {adjustedReports.map((v) => {
        if (!v.polygon) return null;
        const keyPrefix = v.userId ? "umkm" : "lokal";
        return (
          <Polygon
            key={`poly-${keyPrefix}-${v.id}`}
            positions={v.polygon}
            color="#2563eb"
          />
        );
      })}
    </MapContainer>
  );
};

export default MapWilayah;
