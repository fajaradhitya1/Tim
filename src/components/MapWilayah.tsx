"use client";

import { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { villageLocations } from "@/app/data/villages";

interface Village {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description: string;
  imageUrl: string;
  polygon?: [number, number][]; // Optional polygon data
}

interface MapWilayahProps {
  reports: Village[];
  mapRef?: React.MutableRefObject<{
    flyToMarker: (id: number | string) => void;
    fitBounds: (bounds: L.LatLngBoundsExpression) => void;
  } | null>;
}

// Marker icon generator
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
  const markerRefs = useRef<Record<number | string, L.Marker>>(
    Object.create(null)
  );

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

      {/* Markers */}
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

      {/* Polygons */}
      {reports.map(
        (v, index) =>
          v.polygon && (
            <Polygon
              key={`polygon-${index}`}
              positions={v.polygon}
              pathOptions={{ color: "#3b82f6", fillOpacity: 0.2 }}
            />
          )
      )}
    </MapContainer>
  );
};

export default MapWilayah;
