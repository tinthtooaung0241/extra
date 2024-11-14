"use client";

import { deleteIncome } from "@/app/api/incomeApi";
import { Income } from "@/app/types/interfaces";
import Tooltip from "@/components/ui/tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar, DollarSign, MessageCircle, Trash } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface IncomeProps {
  income: Income;
}

const IncomeCard = ({ income }: IncomeProps) => {
  const queryClient = useQueryClient();
  const deleteIncomeMutation = useMutation({
    mutationFn: deleteIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
    onError: (error) => {
      console.error("Error deleting income:", error);
    },
  });
  return (
    <div className="flex items-center justify-between rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 shadow-md sm:px-6 sm:py-4">
      <div className="flex items-center gap-x-5">
        <Image
          src={"/icons/IncomeIcon.png"}
          alt="Income icon"
          width={55}
          height={55}
          className={`size-10`}
        />
        <div className="flex flex-col gap-y-2">
          <h1 className="text-lg font-medium sm:text-xl">{income.name}</h1>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-1">
              <DollarSign size={15} />
              <p>{income.amount.toString()}</p>
            </div>
            <div className="hidden items-center gap-x-1 sm:flex">
              <Calendar size={15} />
              <p>1/12/2222</p>
            </div>
            <div>
              {typeof income.note !== "undefined" && income.note !== "" && (
                <Tooltip text={income.note}>
                  <MessageCircle size={15} />
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          className="p-3"
          onClick={() => {
            deleteIncomeMutation.mutate(income.id);
            toast.success(`${income.name} has been deleted.`);
          }}
        >
          <Trash size={25} />
        </button>
      </div>
    </div>
  );
};

export default IncomeCard;
