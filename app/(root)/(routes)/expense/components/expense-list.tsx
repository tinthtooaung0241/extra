import React from "react";
import ExpenseCard from "./expense-card";
import { Expense } from "@/app/types/interfaces";

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList = ({ expenses }: ExpenseListProps) => {
  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <ExpenseCard expense={expense} key={expense.id} />
      ))}
    </div>
  );
};

export default ExpenseList;
