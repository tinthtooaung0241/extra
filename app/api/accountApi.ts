import axios from "axios";
import { Account } from "../types/interfaces";

const API_URL = "/api/accounts";

export const fetchAccounts = async (): Promise<Account[]> => {
  const response = await axios.get<Account[]>(API_URL);
  return response.data;
};

export const fetchAccountById = async (accountId: string): Promise<Account> => {
  const response = await axios.get<Account>(`${API_URL}/${accountId}`);
  return response.data;
};

export const addAccount = async (accountData: {
  name: string;
}): Promise<Account> => {
  const response = await axios.post(API_URL, accountData);
  return response.data;
};

export const deleteAccount = async (accountId: string): Promise<void> => {
  await axios.delete(`${API_URL}/${accountId}`);
};

export const updateAccount = async (accountId: string): Promise<Account> => {
  const response = await axios.patch(`${API_URL}/${accountId}`);
  return response.data;
};
