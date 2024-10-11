import axios from "axios";
import { create } from "zustand";
import { Income } from "../types/interfaces";

interface IncomeStore {
  incomes: Income[];
  totalIncome: number;
  fetchIncomes: () => Promise<void>;
  addIncome: (incomeData: Omit<Income, "id">) => void;
  deleteIncome: (incomeId: string) => void;
}

export const useIncomeStore = create<IncomeStore>((set, get) => ({
  incomes: [],
  totalIncome: 0,

  fetchIncomes: async () => {
    try {
      const response = await axios.get<Income[]>("/api/incomes");
      const incomes = response.data;
      const totalIncome = incomes.reduce(
        (total, income) => total + income.amount,
        0,
      );
      set({ incomes, totalIncome });
    } catch (error) {
      console.log("fetching incomes error:", error);
    }
  },

  addIncome: async (incomeData: Omit<Income, "id">) => {
    try {
      await axios.post("/api/incomes", incomeData);
      await get().fetchIncomes();
    } catch (error) {
      console.log("income adding error", error);
    }
  },

  deleteIncome: async (incomeId: string) => {
    try {
      await axios.delete(`/api/incomes/${incomeId}`);
      await get().fetchIncomes();
    } catch (error) {
      console.error("income deleting income:", error);
    }
  },
}));
