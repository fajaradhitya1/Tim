import { create } from "zustand";

type WilayahState = {
  selectedWilayah: string;
  setSelectedWilayah: (wilayah: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  wilayahData: any[]; // ✅ tambahkan ini
  setWilayahData: (data: any[]) => void; // ✅ tambahkan ini
};

export const useWilayahStore = create<WilayahState>((set) => ({
  selectedWilayah: "", // jadi string kosong
  setSelectedWilayah: (wilayah) => set({ selectedWilayah: wilayah }),
  filter: "Semua",
  setFilter: (filter) => set({ filter }),
  wilayahData: [], // ✅ inisialisasi state
  setWilayahData: (data) => set({ wilayahData: data }), // ✅ setter
}));

export type Bantuan = {
  nama: string;
  hp: string;
  kelurahan: string;
  alamat: string;
  kategori: string;
  kategoriLain?: string;
  keterangan?: string;
};

// Shared global data
const globalAny = globalThis as any;

if (!globalAny.bantuanData) globalAny.bantuanData = [] as Bantuan[];
if (!globalAny.clients) globalAny.clients = [] as ((data: string) => void)[];

export const bantuanData: Bantuan[] = globalAny.bantuanData;
export const clients: ((data: string) => void)[] = globalAny.clients;

export function hitungJumlahPerKelurahan() {
  const counts: Record<string, { jumlah: number }> = {};
  bantuanData.forEach(({ kelurahan }) => {
    if (!kelurahan) return;
    if (!counts[kelurahan]) counts[kelurahan] = { jumlah: 0 };
    counts[kelurahan].jumlah++;
  });
  return counts;
}

export function broadcast(data: any) {
  const jsonData = JSON.stringify(data);
  clients.forEach((send, index) => {
    try {
      send(jsonData);
    } catch (err) {
      clients.splice(index, 1);
    }
  });
}
