"use client";

import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import { stabatPolygon } from "@/app/data/kecamatanPolygon";
import { Ruler } from "lucide-react";
import "leaflet/dist/leaflet.css";

export default function WilayahMapCard() {
  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2 mb-3 text-blue-800 font-semibold">
        <Ruler className="w-5 h-5" />
        <h2 className="text-lg">Luas Wilayah</h2>
      </div>
      <div className="h-64 rounded-md overflow-hidden shadow-inner">
        <MapContainer
          center={[3.74, 98.45]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
          dragging={true}
          zoomControl={true}
          doubleClickZoom={true}
          attributionControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap"
          />
          <Polygon
            positions={stabatPolygon}
            pathOptions={{
              color: "#4f46e5",
              fillColor: "#93c5fd",
              fillOpacity: 0.5,
            }}
          />
        </MapContainer>
      </div>
      <p className="text-sm text-center text-gray-600 mt-2">Luas: 10.885 Ha</p>
    </div>
  );
}
