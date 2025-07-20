"use client";

import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useReportStore } from "@/app/store/reportStore";

const TrafficMap = () => {
  const reports = useReportStore((s) => s.reports);
  const category = useReportStore((s) => s.selectedCategory); // Ganti categoryFilter jadi selectedCategory
  const map = useMap();

  const filteredReports = category
    ? reports.filter((r) => r.issues.includes(category))
    : reports;

  useEffect(() => {
    if (filteredReports.length > 0) {
      const bounds = L.latLngBounds(
        filteredReports.map((r) => [r.lat, r.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [filteredReports, map]);

  return (
    <>
      {filteredReports.map((r) => (
        <Marker
          key={r.id}
          position={[r.lat, r.lng]}
          icon={L.icon({
            iconUrl: "/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        >
          <Popup>
            <strong>{r.description}</strong>
          </Popup>
        </Marker>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[1000] flex gap-4 overflow-x-auto p-4 bg-white bg-opacity-80 rounded-lg shadow max-w-[90vw]">
        {filteredReports.map((r) => (
          <div key={r.id} className="min-w-[200px]">
            <img
              src={r.imageUrl}
              alt={r.description}
              className="w-full h-32 object-cover rounded"
            />
            <p className="text-sm mt-1 text-center">{r.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TrafficMap;
