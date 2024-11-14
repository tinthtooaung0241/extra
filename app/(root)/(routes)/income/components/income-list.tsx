import React from "react";
import IncomeCard from "./income-card";
import { Income } from "@/app/types/interfaces";

interface IncomeListProps {
  incomes: Income[];
}

const IncomeList = ({ incomes }: IncomeListProps) => {
  if (incomes.length === 0)
    return (
      <div className="flex items-center justify-center">
        <p>No income found.</p>
      </div>
    );
  return (
    <div className="space-y-4">
      {incomes.map((income) => (
        <IncomeCard income={income} key={income.id} />
      ))}
    </div>
  );
};

export default IncomeList;
