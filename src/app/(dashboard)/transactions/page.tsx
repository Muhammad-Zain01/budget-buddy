"use client";

import { useState } from "react";
import { PrimaryCategories } from "@/constants/categories";
import AddButton from "@/components/add-button";
import TransactionCard from "@/components/transaction/transaction-card";
import useModalStore from "@/store/modal";
import TransactionModal from "@/components/transaction/transaction-modal";
import useTransaction from "@/hooks/api/useTransaction";
import { Transaction } from "@/models";
import Loading from "@/components/loader";
import { Transaction as TransactionService } from "@/lib/services/transaction";
import { useToast } from "@/components/ui/use-toast";
import EmptyRecord from "@/components/empty-record";
import PaginationComponent from "@/components/pagination";

export default function TransactionPage() {
  const { data, isLoading, setPage, refetch } = useTransaction();
  const { toast } = useToast();
  const setAddTransactionModal = useModalStore(
    (state) => state.setAddTransactionModal
  );

  const transactionData = data?.data || {};

  const transactions = transactionData?.transactions || [];
  const pagination = transactionData?.pagination || {};
  const { currentPage, totalPages } = pagination;

  const onDelete = async (id: number) => {
    const response = await TransactionService.remove(id);
    if (response.status) {
      toast({
        title: "Transaction Deleted",
        description: "Transaction has been deleted successfully",
      });
      refetch();
    }
    close();
  };

  const onEdit = (id: number) => {
    const transaction = transactions?.find(
      (transaction: Transaction) => transaction.id === id
    );
    if (transaction) {
      setAddTransactionModal(true, transaction);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 gap-6">
        <div className="bg-background rounded-lg flex justify-end">
          <AddButton
            label="Add Transactions"
            onClick={() => {
              setAddTransactionModal(true);
            }}
          />
        </div>
        {!isLoading ? (
          <>
            {transactions?.length > 0 ? (
              <div className="mt-4 grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-4">
                {transactions.map((transaction: Transaction, index: number) => (
                  <TransactionCard
                    key={index}
                    transaction={transaction}
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />
                ))}
              </div>
            ) : (
              <EmptyRecord title="No Transactions Available" />
            )}
            <>
              {totalPages > 1 && (
                <div className="mt-6">
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page: number) => {
                      if (page) {
                        setPage(page);
                      }
                    }}
                  />
                </div>
              )}
            </>
          </>
        ) : (
          <Loading size="sm" fullPage />
        )}
      </main>
      <TransactionModal />
    </div>
  );
}
