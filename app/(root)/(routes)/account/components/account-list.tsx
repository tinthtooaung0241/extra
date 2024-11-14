import { Account } from "@/app/types/interfaces";
import AccountCard from "./account-card";

interface AccoutListProps {
  accounts: Account[];
  onDeleteAccount: (accountId: string) => void;
  onSelectAccount: (accountId: string) => void;
}

const AccountList = ({
  accounts,
  onDeleteAccount,
  onSelectAccount,
}: AccoutListProps) => {
  if (accounts.length === 0)
    return (
      <div className="flex items-center justify-center">
        <p>No account found.</p>
      </div>
    );
  return (
    <div className="flex flex-col gap-y-2">
      {accounts.map((account) => (
        <AccountCard
          onSelectAccount={onSelectAccount}
          account={account}
          key={account.id}
          onDeleteAccount={onDeleteAccount}
        />
      ))}
    </div>
  );
};

export default AccountList;
