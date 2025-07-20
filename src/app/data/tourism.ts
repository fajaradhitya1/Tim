export interface TourismPlace {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export const tourismData: TourismPlace[] = [
  {
    id: 1,
    name: "Pantai Cemara",
    description: "Pantai yang indah dengan pasir putih.",
    imageUrl: "/images/pantai-cemara.jpg",
  },
  {
    id: 2,
    name: "Air Terjun Sipiso-piso",
    description: "Air terjun yang menakjubkan di daerah Sumatera Utara.",
    imageUrl: "/images/air-terjun-sipiso-piso.jpg",
  },
  // dst...
];
