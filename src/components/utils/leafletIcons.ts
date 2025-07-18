import L from "leaflet";

export const trafficIcon = L.icon({
  iconUrl: "/icons/traffic.png",
  iconSize: [32, 32],
});

export const tourismIcon = L.icon({
  iconUrl: "/icons/tourism.png",
  iconSize: [32, 32],
});

export const publicServiceIcon = L.icon({
  iconUrl: "/icons/public-service.png",
  iconSize: [32, 32],
});

export const issueIcons: { [key: string]: L.Icon } = {
  "Jalan Rusak": L.icon({
    iconUrl: "/icons/jalan-rusak.png",
    iconSize: [32, 32],
  }),
  Longsor: L.icon({
    iconUrl: "/icons/longsor.png",
    iconSize: [32, 32],
  }),
  Banjir: L.icon({
    iconUrl: "/icons/banjir.png",
    iconSize: [32, 32],
  }),
  "Lampu Mati": L.icon({
    iconUrl: "/icons/lampu.png",
    iconSize: [32, 32],
  }),
  "Pohon Tumbang": L.icon({
    iconUrl: "/icons/pohon.png",
    iconSize: [32, 32],
  }),
  Kecelakaan: L.icon({
    iconUrl: "/icons/kecelakaan.png",
    iconSize: [32, 32],
  }),
};
