"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/modal";
import { CirclePlus } from "lucide-react";
import Heading from "@/components/ui/heading";
import ExpenseForm from "./components/expense-form";
import ExpenseList from "./components/expense-list";
import { useExpenseStore } from "@/app/hooks/use-expenses";

const ExpensePage = () => {
  const { expenses, totalExpense, addExpense, fetchExpenses } =
    useExpenseStore();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onCloseModal = () => setOpenModal(false);
  const onOpenModal = () => setOpenModal(true);

  useEffect(() => {
    const loadExpense = async () => {
      await fetchExpenses();
      setIsLoading(false);
    };
    loadExpense();
  }, [fetchExpenses]);

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
      <div className="flex gap-x-2 border-b-2 border-gray-600 pb-4 md:gap-x-4">
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
              {totalExpense}
            </span>
          </p>
        </div>
      </div>
      <ExpenseList expenses={expenses} />

      <Modal isOpen={openModal} onClose={onCloseModal}>
        <ExpenseForm onClose={onCloseModal} onExpenseAdded={addExpense} />
      </Modal>
    </div>
  );
};

export default ExpensePage;
