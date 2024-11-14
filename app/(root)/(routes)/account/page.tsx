"use client";

import { useState } from "react";
import AccountForm from "./components/account-form";
import Modal from "@/components/ui/modal";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addAccount,
  deleteAccount,
  fetchAccountById,
  fetchAccounts,
} from "@/app/api/accountApi";
import AccountList from "./components/account-list";
import ExpenseList from "../expense/components/expense-list";
import Heading from "@/components/ui/heading";

const SettingPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );
  const queryClient = useQueryClient();

  const { data: accounts = [], isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
  });

  const addAccountMutation = useMutation({
    mutationFn: addAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error) => {
      console.log("Error adding account:", error);
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: (_, deleteAccountId) => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      if (selectedAccountId === deleteAccountId) {
        setSelectedAccountId(null);
      }
    },
    onError: (error) => {
      console.log("Error deleting account:", error);
    },
  });

  const { data: selectedAccount, isLoading: isLoadingAccount } = useQuery({
    queryKey: ["account", selectedAccountId],
    queryFn: () =>
      selectedAccountId ? fetchAccountById(selectedAccountId) : null,
    enabled: !!selectedAccountId,
  });

  const onCloseModal = () => setOpenModal(false);
  const onOpenModal = () => setOpenModal(true);
  const onSelectAccount = (accountId: string) =>
    setSelectedAccountId(accountId);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-semibold">Loading accounts...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-y-6">
        <Heading title="ACCOUNTS" description="Manage your accounts" />
        <div className="flex-1 space-y-4">
          <button
            className="mb-2 flex items-center gap-x-2 rounded-lg border bg-gray-700 px-4 py-2 font-medium text-white"
            onClick={onOpenModal}
          >
            Create Account
          </button>
          <AccountList
            onSelectAccount={onSelectAccount}
            accounts={accounts}
            onDeleteAccount={(accountId) =>
              deleteAccountMutation.mutate(accountId)
            }
          />
        </div>
        {isLoadingAccount ? (
          <div>
            <p>Loading expenses...</p>
          </div>
        ) : (
          <div className="">
            {selectedAccount ? (
              <ExpenseList expenses={selectedAccount.expenses} />
            ) : null}
          </div>
        )}
      </div>
      <div>
        <Modal isOpen={openModal} onClose={onCloseModal}>
          <AccountForm
            onClose={onCloseModal}
            onAccountAdd={(data) => addAccountMutation.mutate(data)}
          />
        </Modal>
      </div>
    </>
  );
};

export default SettingPage;
