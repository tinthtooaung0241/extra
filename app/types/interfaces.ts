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
  expenses: Expense[]; // Add expenses field
  createdAt: Date;
  updatedAt: Date;
}
