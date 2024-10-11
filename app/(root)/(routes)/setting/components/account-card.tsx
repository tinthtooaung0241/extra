import { Account } from "@/app/types/interfaces";
import { Trash, UserPen } from "lucide-react";

interface AccountCardProps {
  account: Account;
}

const AccountCard = ({ account }: AccountCardProps) => {
  return (
    <div className="flex max-w-lg items-center justify-between rounded-xl border px-4 py-2 text-lg font-semibold shadow-md transition-colors">
      <p>{account.name}</p>
      <div className="flex items-center justify-between gap-x-4">
        <button>
          <UserPen size={20} />
        </button>
        <button>
          <Trash size={20} />
        </button>
      </div>
    </div>
  );
};

export default AccountCard;
