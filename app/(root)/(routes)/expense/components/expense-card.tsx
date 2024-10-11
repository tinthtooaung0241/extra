"use client";

import { useExpenseStore } from "@/app/hooks/use-expenses";
import { Expense } from "@/app/types/interfaces";
import Tooltip from "@/components/ui/tooltip";
import { Calendar, DollarSign, MessageCircle, Trash } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface ExpenseProps {
  expense: Expense;
}

const ExpenseCard = ({ expense }: ExpenseProps) => {
  const onDelete = useExpenseStore((state) => state.deleteExpense);
  return (
    <div className="flex items-center justify-between rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 shadow-md sm:px-6 sm:py-4">
      <div className="flex items-center gap-x-5">
        <Image
          src={"/icons/spending.png"}
          alt="Expense icon"
          width={55}
          height={55}
          className={`size-10`}
        />
        <div className="flex flex-col gap-y-2">
          <h1 className="text-lg font-medium sm:text-xl">{expense.name}</h1>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-1">
              <DollarSign size={15} />
              <p>{expense.amount.toString()}</p>
            </div>
            <div className="hidden items-center gap-x-1 sm:flex">
              <Calendar size={15} />
              <p>1/12/2222</p>
            </div>
            <div>
              {typeof expense.note !== "undefined" && expense.note !== "" && (
                <Tooltip text={expense.note}>
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
            onDelete(expense.id);
            toast.success("Expense deleted.");
          }}
        >
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
