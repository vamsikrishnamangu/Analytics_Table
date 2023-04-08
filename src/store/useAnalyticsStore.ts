import { create } from "zustand";

interface Iresults {
  date: string | undefined;
  app_id: string | undefined;
  requests: number | undefined;
  responses: number | undefined;
  impressions: number | undefined;
  clicks: number | undefined;
  revenue: number | undefined;
}

interface IuseStore {
  startDate: string | undefined;
  setStartDate: (startDate: any) => void;
  endDate: string | undefined;
  setEndDate: (endDate: any) => void;
  results: Iresults[];
  setResults: (results: Iresults[]) => void;
}

const useAnalyticsStore = create<IuseStore>((set) => ({
  startDate: "",
  setStartDate: (startDate) => set((state) => ({ ...state, startDate })),
  endDate: "",
  setEndDate: (endDate: any) => set((state) => ({ ...state, endDate })),
  results: [],
  setResults: (results: Iresults[]) => set((state) => ({ ...state, results })),
}));

export { useAnalyticsStore };
