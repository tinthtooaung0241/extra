"use client";

import { useState } from "react";
import AccountForm from "./components/account-form";
import Modal from "@/components/ui/modal";
import AccountCard from "./components/account-card";
import { useAccountStore } from "@/app/hooks/use-account";

const SettingPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const { addAccount, accounts } = useAccountStore();

  const onCloseModal = () => setOpenModal(false);
  const onOpenModal = () => setOpenModal(true);

  return (
    <>
      {accounts.map((account) => (
        <AccountCard account={account} key={account.id} />
      ))}
      <div>
        <button onClick={onOpenModal}>oopen</button>
        <Modal isOpen={openModal} onClose={onCloseModal}>
          <AccountForm onClose={onCloseModal} onAccountAdd={addAccount} />
        </Modal>
      </div>
    </>
  );
};

export default SettingPage;
