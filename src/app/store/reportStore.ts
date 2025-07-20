import { create } from "zustand";

export interface Report {
  id: number;
  lat: number;
  lng: number;
  description: string;
  issues: string[];
  imageUrl: string;
}

interface ReportStore {
  reports: Report[];
  setReports: (reports: Report[]) => void;
  addReport: (report: Report) => void; // sudah ada tipe-nya
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  filter: string | null;
  setFilter: (filter: string | null) => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  reports: [],
  setReports: (reports) => set({ reports }),
  addReport: (report) =>
    set((state) => ({ reports: [...state.reports, report] })), // implementasi addReport
  selectedCategory: "",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  filter: null,
  setFilter: (filter) => set({ filter }),
}));
