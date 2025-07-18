"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon.src || icon,
  shadowUrl: shadow.src || shadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Report {
  id: number;
  lat: number;
  lng: number;
  description: string;
}

interface MapWrapperProps {
  reports: Report[];
  onReady?: (actions: { flyToMarker: (id: number) => void }) => void;
}

const MapWrapper: React.FC<MapWrapperProps> = ({ reports, onReady }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRefs = useRef<Record<number, L.Marker>>({});
  const [ready, setReady] = useState(false);

  // Tandai semua marker sudah siap
  useEffect(() => {
    const timeout = setTimeout(() => setReady(true), 300); // waktu render marker
    return () => clearTimeout(timeout);
  }, [reports]);

  useEffect(() => {
    if (!onReady || !ready || !mapRef.current) return;

    const flyToMarker = (id: number) => {
      const marker = markerRefs.current[id];
      if (marker) {
        const latlng = marker.getLatLng();
        mapRef.current?.flyTo(latlng, 16, { duration: 1.5 });

        setTimeout(() => {
          marker.openPopup();
        }, 1500);
      } else {
        console.warn("❌ Marker belum siap:", id);
      }
    };

    onReady({ flyToMarker });
  }, [onReady, ready, reports]);

  const center = reports.length
    ? { lat: reports[0].lat, lng: reports[0].lng }
    : { lat: 3.6054, lng: 98.6794 };

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={11}
      style={{ height: "500px", width: "100%" }}
      whenCreated={(map) => (mapRef.current = map)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {reports.map((r) => (
        <Marker
          key={r.id}
          position={[r.lat, r.lng]}
          ref={(ref) => {
            if (ref && ref.getElement()) {
              markerRefs.current[r.id] = ref;
            }
          }}
        >
          <Popup closeOnClick={false} autoClose={false}>
            {r.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapWrapper;
