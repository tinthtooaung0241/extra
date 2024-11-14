"use client";

import { addExpense, fetchExpenses } from "@/app/api/expenseApi";
import Heading from "@/components/ui/heading";
import Modal from "@/components/ui/modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import ExpenseForm from "./components/expense-form";
import ExpenseList from "./components/expense-list";
import { useTotal } from "@/app/hooks/useTotal";

const ExpensePage = () => {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);

  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  const addExpenseMutation = useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      setOpenModal(false);
    },
    onError: (error) => {
      console.error("Error creating expense:", error);
    },
  });

  const totalExpense = expenses.reduce(
    (total, expense) => expense.amount + total,
    0,
  );

  const onCloseModal = () => setOpenModal(false);
  const onOpenModal = () => setOpenModal(true);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-semibold">Loading expenses...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full space-y-4 px-2 pb-2 sm:px-0">
      <Heading title="EXPENSE" description="Manage your expense" />
      <div className="flex flex-col gap-2 border-b-2 border-gray-600 pb-4 sm:flex-row md:gap-x-4">
        <div className="justify-cente flex items-center">
          <button
            className="flex items-center gap-x-2 whitespace-nowrap rounded-lg border bg-gray-700 px-4 py-2 font-medium text-white"
            onClick={onOpenModal}
          >
            <CirclePlus size={20} />
            Create Expense
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center rounded-lg border bg-gray-50 px-4 py-2 shadow-sm sm:px-6 sm:py-4">
          <p className="text-xl font-semibold tracking-wide sm:text-2xl">
            Total:
            <span className="ml-2 text-xl font-bold text-red-500 sm:text-2xl">
              {totalExpense.toFixed(2)}
            </span>
          </p>
        </div>
      </div>
      <ExpenseList expenses={expenses} />

      <Modal isOpen={openModal} onClose={onCloseModal}>
        <ExpenseForm
          onClose={onCloseModal}
          onExpenseAdded={(data) => addExpenseMutation.mutate(data)}
        />
      </Modal>
    </div>
  );
};

export default ExpensePage;
