import { Report } from "../store/reportStore";

export const reportData: Report[] = [
  // Traffic Data
  {
    id: 1,
    lat: 3.6206,
    lng: 98.4895,
    description: "Lubang besar di tengah jalan",
    issues: ["Jalan Rusak"],
    imageUrl: "/images/jalan_rusak.png",
  },
  {
    id: 2,
    lat: 3.6506,
    lng: 98.4901,
    description: "Longsor menutup jalan",
    issues: ["Longsor"],
    imageUrl: "/images/longsor.png",
  },

  // Tourism Data
  {
    id: 101,
    lat: 3.7051,
    lng: 98.4653,
    description: "Pantai Silinka - pasir putih",
    issues: ["Pariwisata"],
    imageUrl: "/images/pantai_silinka.jpg",
  },

  // Public Service Data
  {
    id: 102,
    lat: 3.7,
    lng: 98.52,
    description: "Puskesmas tidak aktif",
    issues: ["Layanan Publik"],
    imageUrl: "/images/puskesmas.png",
  },

  // Disaster Data
  {
    id: 103,
    lat: 3.6601,
    lng: 98.4971,
    description: "Banjir di Desa Timbang Lawan",
    issues: ["Banjir"],
    imageUrl: "/images/banjir.png",
  },
];
