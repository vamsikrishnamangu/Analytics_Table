import { create } from "zustand";

export interface Iresults {
  date: string | undefined;
  app_id: string | undefined;
  requests: number | undefined;
  responses: number | undefined;
  impressions: number | undefined;
  clicks: number | undefined;
  revenue: number | undefined;
}
export interface ImergedData {
  app_name: string | undefined;
  date: string | undefined;
  app_id: string | undefined;
  requests: number | undefined;
  responses: number | undefined;
  impressions: number | undefined;
  clicks: number | undefined;
  revenue: number | undefined;
}
export interface IuseStore {
  startDate: string | undefined;
  setStartDate: (startDate: any) => void;
  endDate: string | undefined;
  setEndDate: (endDate: any) => void;
  results: Iresults[];
  setResults: (results: Iresults[]) => void;
  mergedData: ImergedData[];
  setMergedData: (data: ImergedData[]) => void;
}

const useAnalyticsStore = create<IuseStore>((set) => ({
  startDate: "",
  setStartDate: (startDate) => set((state) => ({ ...state, startDate })),
  endDate: "",
  setEndDate: (endDate: any) => set((state) => ({ ...state, endDate })),
  results: [],
  setResults: (results: Iresults[]) => set((state) => ({ ...state, results })),
  mergedData: [],
  setMergedData: (mergedData: ImergedData[]) =>
    set((state) => ({ ...state, mergedData })),
}));

export { useAnalyticsStore };
