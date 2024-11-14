import axios from "axios";
import { Expense } from "../types/interfaces";

const API_URL = "/api/expenses";

export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get<Expense[]>(API_URL);
  return response.data;
};

export const addExpense = async (
  expenseData: Omit<Expense, "id">,
): Promise<Expense> => {
  const response = await axios.post(API_URL, expenseData);
  return response.data;
};

export const deleteExpense = async (expenseId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${expenseId}`);
};
