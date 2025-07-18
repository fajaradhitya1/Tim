import { create } from "zustand";

interface Report {
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
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  reports: [],
  setReports: (reports) => set({ reports }),
  selectedCategory: "",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
