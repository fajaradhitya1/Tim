import { Report } from "../store/reportStore";

export const trafficData: Report[] = [
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
];

