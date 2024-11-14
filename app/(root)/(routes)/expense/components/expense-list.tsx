import React from "react";
import ExpenseCard from "./expense-card";
import { Expense } from "@/app/types/interfaces";

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList = ({ expenses }: ExpenseListProps) => {
  if (expenses.length === 0)
    return (
      <div className="flex items-center justify-center">
        <p>No expense found.</p>
      </div>
    );
  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <ExpenseCard expense={expense} key={expense.id} />
      ))}
    </div>
  );
};

export default ExpenseList;
