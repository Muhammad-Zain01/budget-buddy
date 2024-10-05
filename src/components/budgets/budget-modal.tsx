"use client";
import useModalStore from "@/store/modal";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import useResponsive from "@/hooks/useResponsive";
import DrawerView from "../drawer-view";
import TransactionInput from "../transaction/transaction-input";
import CategoryGrid from "../category/category-grid";
import { Switch } from "../ui/switch";
import { Budget } from "@/lib/services/budget";
import { Input } from "../ui/input";
import useBudget from "@/hooks/api/useBudget";

const formSchema = z.object({
  name: z.string(),
  amount: z.string(),
  category: z
    .string()
    .min(1, "Category is required")
    .refine((value) => value !== "", {
      message: "Category is mandatory",
    }),
  is_recurring: z.boolean().default(false),
});

const BudgetModal = () => {
  const { budgetModal, setBudgetModal } = useModalStore((state) => state);
  const { show, data } = budgetModal;
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <DrawerView
        title={`Add Budget`}
        open={show}
        onOpenChange={(value: boolean) => {
          if (!value) {
            setBudgetModal(false);
          }
        }}
      >
        <div className="py-3 px-3">
          <div className="grid gap-4 py-4">
            <BudgetForm />
          </div>
        </div>
      </DrawerView>
    );
  }

  return (
    <Dialog
      open={show}
      onOpenChange={(e) => {
        setBudgetModal(e);
      }}
    >
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{data ? "Update" : "Add"} Budget</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <BudgetForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const BudgetForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { budgetModal, setBudgetModal } = useModalStore((state) => state);
  const { data } = budgetModal;
  const { refetch } = useBudget();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const payload = {
      name: values?.name,
      amount: values?.amount,
      categoryId: values?.category,
      isRecurring: values?.is_recurring,
    };

    const response = await Budget.add(payload);
    if (response.status) {
      toast({
        title: "Budget added successfully",
      });
      setBudgetModal(false);
      refetch();
    }

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter budget name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <TransactionInput label="Budget Amount" form={form} />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <CategoryGrid {...field} type={"expense"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_recurring"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4">
                <div className="space-y-1">
                  <FormLabel>Monthly Recurring Budget</FormLabel>
                  <FormDescription>
                    Enable this option to automatically renew the budget each
                    month
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                    aria-label="Toggle recurring budget"
                  />
                </FormControl>
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

export default BudgetModal;
