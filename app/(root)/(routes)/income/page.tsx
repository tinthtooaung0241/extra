"use client";

import { addIncome, deleteIncome, fetchIncomes } from "@/app/api/incomeApi";
import { Income } from "@/app/types/interfaces";
import Heading from "@/components/ui/heading";
import Modal from "@/components/ui/modal";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import IncomeForm from "./components/income-form";
import IncomeList from "./components/income-list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTotal } from "@/app/hooks/useTotal";

const IncomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: incomes = [], isLoading } = useQuery<Income[]>({
    queryKey: ["incomes"],
    queryFn: fetchIncomes,
  });

  const addIncomeMutation = useMutation({
    mutationFn: addIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      setOpenModal(false);
    },
    onError: (error) => {
      console.error("Error creating income:", error);
    },
  });

  const deleteIncomeMutation = useMutation({
    mutationFn: deleteIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
    onError: (error) => {
      console.error("Error deleting income:", error);
    },
  });

  const totalIncome = incomes.reduce(
    (total, income) => total + income.amount,
    0,
  );

  const onCloseModal = () => setOpenModal(false);
  const onOpenModal = () => setOpenModal(true);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-semibold">Loading incomes...</p>
      </div>
    );
  }
  return (
    <div className="mx-auto w-full space-y-4 px-2 pb-2 sm:px-0">
      <Heading title="INCOME" description="Manage your income" />
      <div className="flex flex-col gap-2 border-b-2 border-gray-600 pb-4 sm:flex-row md:gap-x-4">
        <div className="justify-cente flex items-center">
          <button
            className="flex items-center gap-x-2 rounded-lg border bg-gray-700 px-4 py-2 font-medium text-white"
            onClick={onOpenModal}
          >
            <CirclePlus size={20} />
            Create Income
          </button>
        </div>
        <div className="flex flex-1 items-center justify-center rounded-lg border bg-gray-50 px-4 py-2 shadow-sm sm:px-6 sm:py-4">
          <p className="text-xl font-semibold tracking-wide sm:text-2xl">
            Total:
            <span className="ml-2 text-xl font-bold text-green-500 sm:text-2xl">
              {totalIncome.toFixed(2)}
            </span>
          </p>
        </div>
      </div>
      <IncomeList incomes={incomes} />

      <Modal isOpen={openModal} onClose={onCloseModal}>
        <IncomeForm
          onClose={onCloseModal}
          onIncomeAdded={(data) => addIncomeMutation.mutate(data)}
        />
      </Modal>
    </div>
  );
};

export default IncomePage;
