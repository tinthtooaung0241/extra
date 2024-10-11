import axios from "axios";
import { create } from "zustand";
import { Account } from "../types/interfaces";

interface AccountStore {
  accounts: Account[];
  addAccount: (accountData: Omit<Account, "id">) => void;
  fetchAccounts: () => Promise<void>;
}

export const useAccountStore = create<AccountStore>((set, get) => ({
  accounts: [],
  addAccount: async (accountData: Omit<Account, "id">) => {
    try {
      await axios.post("/api/accounts", accountData);
      await get().fetchAccounts();
    } catch (error) {
      console.log("adding account error", error);
    }
  },
  fetchAccounts: async () => {
    try {
      const response = await axios.get<Account[]>("/api/accounts");
      const accounts = response.data;
      set({ accounts });
    } catch (error) {
      console.log("fetching accounts error", error);
    }
  },
}));
