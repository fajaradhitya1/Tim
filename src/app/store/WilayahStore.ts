// store/WilayahStore.ts
"use client";

import { create } from "zustand";

interface WilayahState {
  wilayahData: any[];
  selectedWilayah: string | null;
  filter: string | null; // Tambahkan filter
  setWilayahData: (data: any[]) => void;
  setSelectedWilayah: (wilayah: string | null) => void;
  setFilter: (filter: string | null) => void; // Tambahkan setter filter
}

export const useWilayahStore = create<WilayahState>((set) => ({
  wilayahData: [],
  selectedWilayah: null,
  filter: null, // Inisialisasi filter
  setWilayahData: (data) => set({ wilayahData: data }),
  setSelectedWilayah: (wilayah) => set({ selectedWilayah: wilayah }),
  setFilter: (filter) => set({ filter }), // Implementasi setter filter
}));
