"use client";
import Card from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchExpenses } from "../api/expenseApi";
import { fetchIncomes } from "../api/incomeApi";
import { Expense, Income } from "../types/interfaces";
import ExpenseList from "./(routes)/expense/components/expense-list";
import IncomeList from "./(routes)/income/components/income-list";

const HomePage = () => {
  const { data: expenses = [], isLoading: isLoadingExpense } = useQuery<
    Expense[]
  >({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  const totalExpense = expenses.reduce(
    (total, expense) => expense.amount + total,
    0,
  );

  const { data: incomes = [], isLoading: isLoadingIncome } = useQuery<Income[]>(
    {
      queryKey: ["incomes"],
      queryFn: fetchIncomes,
    },
  );

  const lastExpenses = expenses.slice(-5);

  const lastIncomes = incomes.slice(-5);

  const totalIncome = incomes.reduce(
    (total, income) => total + income.amount,
    0,
  );

  const remainingBalance = totalIncome - totalExpense;

  return (
    <div className="mx-auto w-full space-y-4 px-2 pb-2 sm:px-0">
      <Heading title="Debt Tracker" description="Manage your debt with DTRA" />
      <div className="flex w-full flex-col gap-4 sm:flex-row">
        <div className="w-60 space-y-4">
          <Card title="Total Expense">
            {isLoadingExpense ? <p>Loading...</p> : <p>{totalExpense}</p>}
          </Card>
          <Card title="Total Income">
            {isLoadingIncome ? <p>Loading...</p> : <p>{totalIncome}</p>}
          </Card>
          <Card title="Balance">
            <p>{remainingBalance}</p>
          </Card>
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <div className="h-30 flex w-full flex-col items-center justify-center gap-y-2 pb-4">
              <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                Last Expenses
              </h1>
            </div>
            <ExpenseList expenses={lastExpenses} />
          </div>
          <div className="h-1 border bg-black" />
          <div>
            <div className="h-30 flex w-full flex-col items-center justify-center gap-y-2 pb-4">
              <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                Last Incomes
              </h1>
            </div>
            <IncomeList incomes={lastIncomes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
