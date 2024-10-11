import React from "react";
import IncomeCard from "./income-card";
import { Income } from "@/app/types/interfaces";

interface IncomeListProps {
  incomes: Income[];
}

const IncomeList = ({ incomes }: IncomeListProps) => {
  return (
    <div className="space-y-4">
      {incomes.map((income) => (
        <IncomeCard income={income} key={income.id} />
      ))}
    </div>
  );
};

export default IncomeList;
