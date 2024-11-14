import { create } from "zustand";

interface TotalStore {
  totalIncome: number;
  totalExpense: number;
  setTotalIncome: (totalIncome: number) => void;
  setTotalExpense: (totalExpense: number) => void;
}

export const useTotal = create<TotalStore>((set) => ({
  totalIncome: 0,
  totalExpense: 0,
  setTotalIncome: (totalIncome: number) => {
    set(() => ({ totalIncome: totalIncome }));
  },
  setTotalExpense: (totalExpense: number) => {
    set(() => ({ totalExpense: totalExpense }));
  },
}));
