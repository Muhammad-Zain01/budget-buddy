"use client";

import AccountCard from "@/components/accounts/account-card";
import AddButton from "@/components/add-button";
import useModalStore from "@/store/modal";
import AccountModal from "@/components/accounts/account-modal";
import useAccount from "@/hooks/api/useAccount";
import Loading from "@/components/loader";
import { useToast } from "@/components/ui/use-toast";
import { Account } from "@/lib/services/account";
import useAlertDialoag from "@/hooks/useAlertDialog";
import EmptyRecord from "@/components/empty-record";
import { useMemo } from "react";

export default function AccountPage() {
  const { data, isLoading, refetch } = useAccount();
  const setAccountModal = useModalStore((state) => state.setAccountModal);
  const { toast } = useToast();
  const { close } = useAlertDialoag();

  const onDelete = async (id: number) => {
    const response = await Account.remove(id);
    if (response.status) {
      toast({
        title: "Account Deleted",
        description: "Account has been deleted successfully",
      });
      refetch();
    }
    close();
  };

  const accountData = data?.data || [];

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 gap-6">
        <div className="bg-background rounded-lg flex justify-end">
          <AddButton
            label="Add Account"
            onClick={() => setAccountModal(true)}
          />
        </div>
        {isLoading ? (
          <Loading fullPage />
        ) : (
          <>
            {/* @ts-ignore */}
            {accountData?.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {accountData?.map((account, index) => (
                  <AccountCard
                    key={index}
                    account={account}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            ) : (
              <EmptyRecord title="No Accounts Available" />
            )}
          </>
        )}
      </main>
      <AccountModal />
    </div>
  );
}
