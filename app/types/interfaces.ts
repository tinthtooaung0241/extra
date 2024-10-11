export interface Income {
  id: string;
  name: string;
  amount: number;
  note?: string;
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  note?: string;
  accountId: string;
}

export interface Account {
  id: string;
  name: string;
}
