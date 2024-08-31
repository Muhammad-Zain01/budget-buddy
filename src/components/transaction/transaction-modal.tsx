"use client";

import useModalStore from "@/store/modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
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
  const [selectedTab, setSelectedTab] = useState<TransactionType>("expense");
  const { toast } = useToast();
  const { refetch } = useTransaction();
  const { addTransactionModal, setAddTransactionModal } = useModalStore(
    (state) => state
  );
  const { show, data } = addTransactionModal;
  const defaultTabValue = data?.type?.toLowerCase() || "expense";

  useEffect(() => {
    if (defaultTabValue) {
      setSelectedTab(defaultTabValue);
    }
  }, [defaultTabValue]);

  const onSubmit = async (values: any) => {
    setLoading(true);
    const payload = {
      balance: values?.amount,
      type: selectedTab,
      date: new Date(values.date).toISOString(),
      tags: values?.tags || [],
      description: values?.description || "",
      category: values?.category ? Number(values?.category) : undefined,
      account: values?.account ? Number(values?.account) : undefined,
      from: values?.from ? Number(values?.from) : undefined,
      to: values?.to ? Number(values?.to) : undefined,
      subType: values?.people_type ? values?.people_type : undefined,
    };

    if (data && data?.id) {
      const response = await Transaction.update(payload, data.id);
      if (response?.status) {
        toast({
          title: "Transaction updated successfully",
        });
      }
    } else {
      const response = await Transaction.add(payload);
      if (response.status) {
        toast({
          title: "Transaction added successfully",
        });
      }
    }
    refetch();
    setAddTransactionModal(false);
    setLoading(false);
  };

  return (
    <Dialog
      open={show}
      onOpenChange={(e) => {
        setAddTransactionModal(e);
      }}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{data ? "Update" : "Add"} Transaction</DialogTitle>
        </DialogHeader>
        <div>
          <Tabs
            defaultValue={defaultTabValue}
            className="w-full"
            onValueChange={(value) => setSelectedTab(value as TransactionType)}
          >
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
                  <TransactionContent
                    data={data}
                    loading={loading}
                    value={item.value}
                    onSubmit={onSubmit}
                  />
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
