// src/components/TourismGallery.tsx
"use client";

import { tourismData } from "@/app/data/tourism";

const TourismGallery = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 mt-10">
      {tourismData.map((place) => (
        <div
          key={place.id}
          className="bg-white shadow-md rounded-xl overflow-hidden"
        >
          <img
            src={place.imageUrl}
            alt={place.name}
            className="h-48 w-full object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{place.name}</h3>
            <p className="text-sm text-gray-600">{place.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TourismGallery;
