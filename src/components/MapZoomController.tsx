"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapZoomControllerProps {
  markers: {
    lat: number;
    lng: number;
    status?: string;
  }[];
  selectedStatus?: string;
}

const MapZoomController = ({
  markers,
  selectedStatus,
}: MapZoomControllerProps) => {
  const map = useMap();

  useEffect(() => {
    if (selectedStatus) {
      const filtered = markers.filter(
        (m) => m.status?.toLowerCase() === selectedStatus.toLowerCase()
      );

      if (filtered.length > 0) {
        const bounds = filtered.map((m) => [m.lat, m.lng]) as [
          number,
          number
        ][];
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [selectedStatus, markers, map]);

  return null;
};

export default MapZoomController;
