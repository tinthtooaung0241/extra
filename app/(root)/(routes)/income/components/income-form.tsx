"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Income } from "@/app/types/interfaces";
import toast from "react-hot-toast";

interface IncomeFormProps {
  onIncomeAdded: (income: Omit<Income, "id">) => void;
  onClose: () => void;
}

const incomeFormSchema = z.object({
  name: z
    .string()
    .min(1, "Income name is required.")
    .max(255, "Income name must be 255 characters or less"),
  amount: z.coerce.number().positive(),
  note: z.string().max(255, "Note must be 255 characters or less").optional(),
});

type IncomeFormType = z.infer<typeof incomeFormSchema>;

const IncomeForm = ({ onIncomeAdded, onClose }: IncomeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IncomeFormType>({ resolver: zodResolver(incomeFormSchema) });

  const onSubmit = (data: IncomeFormType) => {
    onIncomeAdded(data);
    onClose();
    toast.success("Income created.");
  };

  return (
    <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow">
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">Create income</h1>
          <p className="text-gray-500">Create your new income.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="m-0 flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
              <label htmlFor="name">Name</label>
              <input
                className="h-10 w-full rounded-md border border-gray-300 px-4 py-2"
                id="name"
                type="text"
                placeholder="Name of income"
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
                placeholder="Amount of income"
                {...register("amount")}
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="note">Note</label>
              <input
                className="h-10 w-full rounded-md border border-gray-300 px-4 py-2"
                id="note"
                type="text"
                placeholder="Note for income"
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

export default IncomeForm;
