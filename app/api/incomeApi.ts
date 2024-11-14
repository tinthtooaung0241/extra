import axios from "axios";
import { Income } from "../types/interfaces";

const API_URL = "/api/incomes";

export const fetchIncomes = async (): Promise<Income[]> => {
  const response = await axios.get<Income[]>(API_URL);
  return response.data;
};

export const addIncome = async (
  incomeData: Omit<Income, "id">,
): Promise<Income> => {
  const response = await axios.post(API_URL, incomeData);
  return response.data;
};

export const deleteIncome = async (incomeId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${incomeId}`);
};
