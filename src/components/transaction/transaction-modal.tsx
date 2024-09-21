"use client";

import useModalStore from "@/store/modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import TransactionContent from "./transaction-content";
import { useToast } from "../ui/use-toast";
import useTransaction from "@/hooks/api/useTransaction";
import { Transaction } from "@/lib/services/transaction";
import useAccount from "@/hooks/api/useAccount";
import { Transaction as TransactionDataType } from "@/models";
import useResponsive from "@/hooks/useResponsive";
import DrawerView from "../drawer-view";

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
  const { isMobile } = useResponsive();
  const { toast } = useToast();
  const { refetch } = useTransaction();
  const { data: accountData } = useAccount();
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

  const validation = (values: any) => {
    const amount = Number(values.amount);
    const accountId =
      selectedTab === "people" || selectedTab === "transfer"
        ? values?.from
        : values?.account;
    const account = accountData?.data.find(
      (a) => Number(a.id) === Number(accountId)
    );
    const currentBalance = Number(account?.balance);

    const insufficientBalanceCheck = (transactionType: string) => {
      if (currentBalance < amount) {
        toast({
          title: "Insufficient Balance",
          description: `The account does not have enough balance for this ${transactionType}.`,
          variant: "destructive",
        });
        return true;
      }
      return false;
    };

    switch (selectedTab) {
      case "expense":
        return !insufficientBalanceCheck("expense");
      case "transfer":
        return !insufficientBalanceCheck("transfer");
      case "people":
        const subType = values?.people_type;
        if (subType === "pay" || subType === "lend") {
          return !insufficientBalanceCheck(
            subType === "pay" ? "payment" : "lending transaction"
          );
        }
        break;
    }

    return true;
  };

  const onSubmit = async (values: any) => {
    if (!validation(values)) return false;

    setLoading(true);

    let from = values?.from ? Number(values?.from) : undefined;
    let to = values?.to ? Number(values?.to) : undefined;

    if (selectedTab == "expense") {
      from = values?.account ? Number(values?.account) : undefined;
    } else if (selectedTab == "income") {
      to = values?.account ? Number(values?.account) : undefined;
    }

    const payload = {
      balance: values?.amount,
      type: selectedTab,
      date: new Date(values.date).toISOString(),
      tags: values?.tags || [],
      description: values?.description || "",
      category: values?.category ? Number(values?.category) : undefined,
      from: from,
      to: to,
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

  if (isMobile) {
    return (
      <DrawerView
        title={`${data ? "Update" : "Add"} Transaction`}
        open={show}
        onOpenChange={(e) => {
          if (!e) {
            setAddTransactionModal(e);
          }
        }}
        height="550px"
      >
        <TransactionChildren
          defaultTabValue={defaultTabValue}
          setSelectedTab={setSelectedTab}
          data={data}
          loading={loading}
          onSubmit={onSubmit}
        />
      </DrawerView>
    );
  }

  return (
    <Dialog
      open={show}
      onOpenChange={(e) => {
        setAddTransactionModal(e);
      }}
    >
      <DialogContent className="sm:max-w-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>{data ? "Update" : "Add"} Transaction</DialogTitle>
        </DialogHeader>
        <TransactionChildren
          defaultTabValue={defaultTabValue}
          setSelectedTab={setSelectedTab}
          data={data}
          loading={loading}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

const TransactionChildren = ({
  defaultTabValue,
  setSelectedTab,
  data,
  loading,
  onSubmit,
}: {
  defaultTabValue: TransactionType;
  setSelectedTab: Dispatch<SetStateAction<TransactionType>>;
  data: TransactionDataType;
  loading: boolean;
  onSubmit: (values: any) => void;
}) => {
  return (
    <div className="  px-3 overflow-y-scroll">
      <Tabs
        defaultValue={defaultTabValue}
        className="w-full"
        onValueChange={(value) => setSelectedTab(value as TransactionType)}
      >
        <TabsList className="grid w-full grid-cols-4">
          {Items.map((item) => {
            return (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="text-xs md:text-sm"
              >
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
  );
};

export default TransactionModal;
