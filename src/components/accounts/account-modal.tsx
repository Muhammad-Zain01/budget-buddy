"use client";
import useModalStore from "@/store/modal";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";
import { Icon } from "../icon";
import TypeSelector from "./type-selector";
import { Account } from "@/lib/services/account";
import useAccount from "@/hooks/api/useAccount";
import { capitalize } from "@/lib/utils";
import { Account as AccountType } from "@/models/Account";
import useResponsive from "@/hooks/useResponsive";
import DrawerView from "../drawer-view";

const formSchema = z.object({
  name: z.string(),
  type: z.string(),
  balance: z.string(),
});

const GridItems: string[][] = [
  ["money", "Cash"],
  ["bank", "Bank"],
  ["user", "Person"],
];

const AccountModal = () => {
  const [currentAccountType, setAccountType] = useState<string | null>(null);
  const { addAccountModal, setAccountModal } = useModalStore((state) => state);
  const { show, data } = addAccountModal;
  const { isMobile } = useResponsive();
  useEffect(() => {
    if (data) {
      setAccountType(capitalize(data.type));
    }
  }, [data]);

  if (isMobile) {
    return (
      <DrawerView
        title={`${data ? "Update" : "Add"} Account`}
        open={show}
        onOpenChange={(value: boolean) => {
          if (!value) {
            setAccountModal(false);
          }
        }}
      >
        <div className="py-3 px-3">
          <AccountData
            currentAccountType={currentAccountType}
            setAccountType={setAccountType}
            data={data}
          />
        </div>
      </DrawerView>
    );
  }

  return (
    <Dialog
      open={show}
      onOpenChange={(e) => {
        if (currentAccountType && !data) {
          setAccountType(null);
        } else {
          setAccountModal(e);
        }
      }}
    >
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {data ? "Update" : "Add"}{" "}
            {currentAccountType ? currentAccountType : ""} Account
          </DialogTitle>
        </DialogHeader>

        <AccountData
          currentAccountType={currentAccountType}
          setAccountType={setAccountType}
          data={data}
        />
      </DialogContent>
    </Dialog>
  );
};

const AccountData = ({
  currentAccountType,
  setAccountType,
  data,
}: {
  currentAccountType?: string | null;
  setAccountType: (type: string) => void;
  data: AccountType;
}) => {
  return (
    <>
      {!currentAccountType ? (
        <div className="grid grid-cols-1 md:grid-cols-3 justify-between gap-2">
          {GridItems.map((item) => {
            return (
              <AccountGridItem
                key={item[0]}
                item={item}
                setAccountType={setAccountType}
              />
            );
          })}
        </div>
      ) : (
        <div className="grid gap-4 py-4">
          <AccountForm
            type={currentAccountType}
            setType={(type) => {
              setAccountType(type);
            }}
          />
        </div>
      )}
    </>
  );
};

const AccountGridItem = ({
  item,
  setAccountType,
}: {
  item: string[];
  setAccountType: (item: string) => void;
}) => {
  return (
    <div
      className="flex flex-col justify-center items-center rounded-md border dark:border-gray-400 w-full py-5 cursor-pointer hover:border-gray-600 dark:hover:border-white"
      onClick={() => {
        setAccountType(item[1]);
      }}
    >
      <Icon icon={item[0]} className="w-12" />
      <div className="text-[14px] mt-2">{item[1]}</div>
    </div>
  );
};
const AccountForm = ({
  type,
  setType,
}: {
  account: AccountType;
  type: string;
  setType: (type: string | null) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { refetch } = useAccount();
  const { addAccountModal, setAccountModal } = useModalStore((state) => state);
  const { data } = addAccountModal;

  const balance = data?.initialBalance || data?.balance || 0;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(data
        ? {
            name: data?.name || "",
            type: parseFloat(data?.balance) < 0 ? "n" : "p",
            balance: String(balance),
          }
        : {}),
    },
  });

  const { toast } = useToast();

  const onSubmit = async (values: any) => {
    setLoading(true);
    const payload = {
      name: values.name,
      balance: parseFloat(
        `${values.type == "n" ? "-" : ""}${Math.abs(values.balance)}`
      ),
      type: type,
    };
    if (data) {
      const response = await Account.update(payload, data.id);
      if (response?.status) {
        toast({
          title: "Account updated successfully",
        });
        setAccountModal(false);
        refetch();
      }
    } else {
      const response = await Account.add(payload);
      if (response.status) {
        toast({
          title: "Account added successfully",
        });
        setAccountModal(false);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Account Name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter your opening balance</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Your Opening Balance"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TypeSelector
                    type={type == "Person" ? "person" : "cash"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-5 flex justify-end">
          <Button type="submit" disabled={loading} className="gap-1">
            {loading && <Spinner className="text-white w-4 " />}
            {data ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountModal;
