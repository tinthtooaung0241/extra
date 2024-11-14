"use client";

import { Account } from "@/app/types/interfaces";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

interface AccountCardProps {
  account: Account;
  onDeleteAccount: (accountId: string) => void;
  onSelectAccount: (accountId: string) => void;
}

const AccountCard = ({
  account,
  onDeleteAccount,
  onSelectAccount,
}: AccountCardProps) => {
  return (
    <div
      className="flex max-w-md cursor-pointer items-center justify-between rounded-lg border px-4 py-2 text-lg font-semibold transition-colors hover:bg-gray-100"
      onClick={() => onSelectAccount(account.id)}
    >
      <p>{account.name}</p>
      <div className="flex items-center justify-between gap-x-4">
        <button
          onClick={(event) => {
            event.stopPropagation();
            onDeleteAccount(account.id);
            toast.success(`${account.name} has been deleted.`);
          }}
        >
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
};

export default AccountCard;
