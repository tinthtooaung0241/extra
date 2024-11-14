"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Expense } from "@/app/types/interfaces";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";
import { fetchAccounts } from "@/app/api/accountApi";
import { useQuery } from "@tanstack/react-query";

interface ExpenseFormProps {
  onExpenseAdded: (income: Omit<Expense, "id">) => void;
  onClose: () => void;
}

const expenseFormSchema = z.object({
  name: z
    .string()
    .min(1, "Income name is required.")
    .max(255, "Income name must be 255 characters or less"),
  amount: z.coerce.number().positive(),
  note: z.string().max(255, "Note must be 255 characters or less").optional(),
  accountId: z.string(),
});

type ExpenseFormType = z.infer<typeof expenseFormSchema>;

const ExpenseForm = ({ onExpenseAdded, onClose }: ExpenseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormType>({ resolver: zodResolver(expenseFormSchema) });
  const { data: accounts = [], isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });

  const onSubmit = (data: ExpenseFormType) => {
    onExpenseAdded(data);
    onClose();
    toast.success("Expense created.");
  };

  return (
    <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow">
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Create Expense</h1>
          <p className="text-gray-500">Create your new expense.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="m-0 flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="name">Name</label>
              <input
                className="h-10 w-full rounded-md border border-gray-300 px-4 py-2"
                id="name"
                type="text"
                placeholder="Name of expense"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="amount">Amount</label>
              <input
                className="h-10 w-full rounded-md border border-gray-300 px-4 py-2"
                id="amount"
                type="number"
                step="0.01"
                placeholder="Amount of expense"
                {...register("amount")}
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="account">Account</label>
              <div className="relative">
                <select
                  id="account"
                  className="h-10 w-full cursor-pointer appearance-none rounded-md border border-gray-300 px-4 py-2 shadow-sm"
                  {...register("accountId")}
                >
                  <option value={""} disabled hidden>
                    Choose your account
                  </option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2" />
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="note">Note</label>
              <input
                className="h-10 w-full rounded-md border border-gray-300 px-4 py-2"
                id="note"
                type="text"
                placeholder="Note for expense"
                {...register("note")}
              />
              {errors.note && (
                <p className="text-sm text-red-500">{errors.note.message}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={onClose}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-red-700 px-4 py-2 text-base font-medium text-white hover:bg-red-800 focus:outline-none"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
