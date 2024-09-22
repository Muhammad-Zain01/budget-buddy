import { create } from "zustand";

type DateFilterState = {
  selectedMonth: number;
  selectedYear: number;
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
};

const useDateFilterStore = create<DateFilterState>((set) => ({
  selectedMonth: new Date().getMonth(),
  selectedYear: new Date().getFullYear(),
  setSelectedMonth: (month: number) => set({ selectedMonth: month }),
  setSelectedYear: (year: number) => set({ selectedYear: year }),
}));

export default useDateFilterStore;
