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
}

interface MapWilayahProps {
  reports: Village[];
  mapRef?: React.MutableRefObject<{
    flyToMarker: (id: number) => void;
    fitBounds: (bounds: L.LatLngBoundsExpression) => void;
  } | null>;
}

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

const MapWilayah: React.FC<MapWilayahProps> = ({ reports, mapRef }) => {
  const internalRef = useRef<L.Map | null>(null);
  const markerRefs = useRef<Record<number, L.Marker>>(Object.create(null));

  const allLocations = reports;
  const center = allLocations.length
    ? { lat: allLocations[0].lat, lng: allLocations[0].lng }
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

    if (allLocations.length > 0) {
      const bounds = L.latLngBounds(allLocations.map((v) => [v.lat, v.lng]));
      map.fitBounds(bounds, { padding: [30, 30] });
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

      {reports.map((v) => (
        <Marker
          key={v.id}
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
      ))}

      {/* Jika ada polygon (bisa ditambahkan) */}
      {reports.map(
        (v) =>
          v.polygon && (
            <Polygon
              key={`poly-${v.id}`}
              positions={v.polygon}
              color="#2563eb"
            />
          )
      )}
    </MapContainer>
  );
};

export default MapWilayah;
