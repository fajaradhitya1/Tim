// store/WilayahStore.ts
"use client";

import { create } from "zustand";

interface WilayahState {
  wilayahData: any[];
  selectedWilayah: string | null;
  setWilayahData: (data: any[]) => void;
  setSelectedWilayah: (wilayah: string | null) => void;
}

export const useWilayahStore = create<WilayahState>((set) => ({
  wilayahData: [],
  selectedWilayah: null,
  setWilayahData: (data) => set({ wilayahData: data }),
  setSelectedWilayah: (wilayah) => set({ selectedWilayah: wilayah }),
}));
