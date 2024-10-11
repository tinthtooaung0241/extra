import axios from "axios";
import { create } from "zustand";
import { Expense } from "../types/interfaces";

interface ExpenseStore {
  expenses: Expense[];
  totalExpense: number;
  fetchExpenses: () => Promise<void>;
  addExpense: (expenseData: Omit<Expense, "id">) => void;
  deleteExpense: (expenseId: string) => void;
}

export const useExpenseStore = create<ExpenseStore>((set, get) => ({
  expenses: [],
  totalExpense: 0,

  fetchExpenses: async () => {
    try {
      const response = await axios.get<Expense[]>("/api/expenses");
      const expenses = response.data;
      const totalExpense = expenses.reduce(
        (total, expense) => total + expense.amount,
        0,
      );
      set({ expenses, totalExpense });
    } catch (error) {
      console.log("fetching expenses error:", error);
    }
  },

  addExpense: async (expenseData: Omit<Expense, "id">) => {
    try {
      await axios.post("/api/expenses", expenseData);
      await get().fetchExpenses();
    } catch (error) {
      console.log("expense adding error", error);
    }
  },

  deleteExpense: async (expenseId: string) => {
    try {
      await axios.delete(`/api/expenses/${expenseId}`);
      await get().fetchExpenses();
    } catch (error) {
      console.error("expense deleting income:", error);
    }
  },
}));
