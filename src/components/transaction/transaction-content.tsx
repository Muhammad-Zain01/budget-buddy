import { z } from "zod";
import { TransactionType } from "./transaction-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TransactionInput from "./transaction-input";
import TransactionDetailForm from "./transaction-detail-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import AccountGrid from "../accounts/account-grid";
import CategoryGrid from "../category/category-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useEffect } from "react";
import { isValidJSON } from "@/lib/utils";
import { Spinner } from "../ui/spinner";
import { Transaction } from "@/models";
import clsx from "clsx";

type PeopleType = "pay" | "receive" | "lend" | "borrow";

const formSchema = z.object({
  amount: z.string(),
  type: z.string(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
  account: z.string().optional(),
  category: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  people_type: z.string().optional(),
});

const TransactionContent: React.FC<{
  data: Transaction;
  loading: boolean;
  value: TransactionType;
  onSubmit: (values: any) => void;
}> = ({ data, value, onSubmit, loading }) => {
  const getTransactionGrid = () => {
    switch (value) {
      case "expense":
        return <TransactionRevenue form={form} type="expense" />;
      case "income":
        return <TransactionRevenue form={form} type="income" />;
      case "transfer":
        return <TransactionTransfer form={form} />;
      case "people":
        return (
          <TransactionPeople
            form={form}
            defaultTabValue={data?.subType || ""}
          />
        );
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (data) {
      // @ts-ignore
      const accountId = data?.type?.toLowerCase() == "income" ? data?.toId : data?.fromId;
      form.setValue("type", data?.type?.toLowerCase());
      data?.amount && form.setValue("amount", String(data?.amount));
      data?.description && form.setValue("description", data?.description);
      data?.tags &&
        form.setValue(
          "tags",
          isValidJSON(data?.tags) ? JSON.parse(data?.tags) : []
        );
      accountId && form.setValue("account", String(accountId));
      // @ts-ignore
      data?.categoryId && form.setValue("category", String(data?.categoryId));
      // @ts-ignore
      data?.fromId && form.setValue("from", String(data?.fromId));
      // @ts-ignore
      data?.toId && form.setValue("to", String(data?.toId));
      data?.subType && form.setValue("people_type", data?.subType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TransactionInput form={form} />
          <TransactionDetailForm form={form} />
          {getTransactionGrid()}

          <div className="flex mt-6 justify-end">
            <Button
              onClick={() => {
                onSubmit(form.getValues());
              }}
              disabled={loading}
              className={"text-xs sm:text-base"}
            >
              {loading && <Spinner className="text-white w-4  " />}
              {data ? "Update" : "Add"} Transaction
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const TransactionRevenue = ({
  form,
  type,
}: {
  form: any;
  type: "expense" | "income";
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ItemWrapper label="Select Category">
                <CategoryGrid {...field} type={type} />
              </ItemWrapper>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="account"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ItemWrapper label="Select Account">
                <AccountGrid {...field} />
              </ItemWrapper>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const TransactionTransfer = ({ form }: { form: any }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="from"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ItemWrapper label="Pay From">
                <AccountGrid {...field} showAll />
              </ItemWrapper>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="to"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ItemWrapper label="Pay To">
                <AccountGrid {...field} showAll />
              </ItemWrapper>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const TransactionPeople = ({
  form,
  defaultTabValue,
}: {
  form: any;
  defaultTabValue: string;
}) => {
  const Items = [
    {
      title: "Pay",
      value: "pay",
    },
    {
      title: "Receive",
      value: "receive",
    },
    {
      title: "Lend",
      value: "lend",
    },
    {
      title: "Borrow",
      value: "borrow",
    },
  ];

  const renderPeopleContent = (type: PeopleType) => {
    if (type == "pay" || type == "lend") {
      return <PeopleCreditTransaction form={form} type={type} />;
    } else if (type == "receive" || type == "borrow") {
      return <PeopleDebitTransaction form={form} type={type} />;
    }
  };
  return (
    <>
      <Tabs defaultValue={defaultTabValue || "pay"} className="w-full mt-3">
        <TabsList className="grid w-full grid-cols-4">
          {Items.map((item) => {
            return (
              <TabsTrigger
                key={item.value}
                value={item.value}
                onClick={() => {
                  form.setValue("people_type", item.value);
                }}
              >
                {item.title}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {Items.map((item) => {
          return (
            <TabsContent key={item.value} value={item.value}>
              {renderPeopleContent(item.value as PeopleType)}
            </TabsContent>
          );
        })}
      </Tabs>
      <FormField
        name="people_type"
        control={form.control}
        defaultValue={"pay"}
        render={({ field }) => <input type="hidden" {...field} />}
      />
    </>
  );
};

const PeopleCreditTransaction = ({
  form,
  type,
}: {
  form: any;
  type: PeopleType;
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="from"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ItemWrapper label={type == "pay" ? "Pay From" : "From Account"}>
                <AccountGrid {...field} />
              </ItemWrapper>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="to"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ItemWrapper label={type == "pay" ? "Pay To" : "Lend To"}>
                <AccountGrid type="PERSON" {...field} />
              </ItemWrapper>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const PeopleDebitTransaction = ({
  form,
  type,
}: {
  form: any;
  type: PeopleType;
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="from"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ItemWrapper
                label={type == "receive" ? "Receive From" : "Borrow From"}
              >
                <AccountGrid {...field} type="PERSON" />
              </ItemWrapper>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="to"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ItemWrapper label={"To Account"}>
                <AccountGrid {...field} />
              </ItemWrapper>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const ItemWrapper = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mt-4">
      <p className="mb-4">{label}</p>
      {children}
    </div>
  );
};

export default TransactionContent;
