"use client";

import useModalStore from "@/store/modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TransactionContent from "./transaction-content";
import { useToast } from "../ui/use-toast";
import useTransaction from "@/hooks/api/useTransaction";
import { Transaction } from "@/lib/services/transaction";

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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { data, isLoading, refetch } = useTransaction();
  const [currentAccountType, setAccountType] = useState<string | null>(null);
  const { addTransactionModal, setAddTransactionModal } = useModalStore(
    (state) => state
  );
  const { show } = addTransactionModal;

  const onSubmit = async (values: any) => {
    setLoading(true);
    const payload = {
      balance: values?.amount,
      type: values?.type,
      date: new Date(values.date).toISOString(),
      tags: values?.tags || [],
      description: values?.description || "",
      category: values?.category ? Number(values?.category) : undefined,
      account: values?.account ? Number(values?.account) : undefined,
      from: values?.from ? Number(values?.from) : undefined,
      to: values?.to ? Number(values?.to) : undefined,
      subType: values?.people_type ? values?.people_type : undefined,
    };
    console.log("sdf");
    if (false) {
      // const response = await Transaction.update(payload, data.id);
      // if (response?.status) {
      //   toast({
      //     title: "Transaction updated successfully",
      //   });
      //   setAddTransactionModal(false);
      //   refetch();
      // }
    } else {
      const response = await Transaction.add(payload);
      if (response.status) {
        toast({
          title: "Transaction added successfully",
        });
        setAddTransactionModal(false);
        refetch();
      }
    }
    // if (data) {
    // const response = await Category.update(values, data.id);
    // if (response.status) {
    //   toast({
    //     title: "Category added successfully",
    //   });
    //   setAddCategoryModal(false);
    //   refetch();
    // }
    setType(null);
    setLoading(false);
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
