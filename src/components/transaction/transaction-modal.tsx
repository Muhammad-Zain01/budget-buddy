"use client";

import useModalStore from "@/store/modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TransactionContent from "./transaction-content";

export type TransactionType = "expense" | "income" | "transfer" | "people";

const Items: { title: string; value: TransactionType }[] = [
  {
    title: "Expense",
    value: "expense",
  },
  {
    title: "Income",
    value: "income",
  },
  {
    title: "Transfer",
    value: "transfer",
  },
  {
    title: "People",
    value: "people",
  },
];

const TransactionModal = () => {
  const [currentAccountType, setAccountType] = useState<string | null>(null);
  const { addTransactionModal, setAddTransactionModal } = useModalStore(
    (state) => state
  );
  const { show, data } = addTransactionModal;

  const onSubmit = (values: any) => {
    console.log("Submit >> ", values);
  };

  return (
    <Dialog
      open={show}
      onOpenChange={(e) => {
        if (currentAccountType && !data) {
          setAccountType(null);
        } else {
          setAddTransactionModal(e);
        }
      }}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {data ? "Update" : "Add"}{" "}
            {currentAccountType ? currentAccountType : ""} Transaction
          </DialogTitle>
        </DialogHeader>

        <div>
          <Tabs defaultValue="expense" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              {Items.map((item) => {
                return (
                  <TabsTrigger key={item.value} value={item.value}>
                    {item.title}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {Items.map((item) => {
              return (
                <TabsContent key={item.value} value={item.value}>
                  <TransactionContent value={item.value} onSubmit={onSubmit} />
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
