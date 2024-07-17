"use client";
import useModalStore from "@/store/modal";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CategoryIconSelector from "./category-icon-selector";
import { Category } from "@/lib/services/category";
import { useState } from "react";
import useCategory from "@/hooks/api/useCategory";
import { Spinner } from "../ui/spinner";

const formSchema = z.object({
  categoryName: z.string(),
  categoryType: z.string(),
  icon: z.string(),
});

const CategoryModal = () => {
  const { addCategoryModal, setAddCategoryModal } = useModalStore(
    (state) => state
  );

  return (
    <Dialog
      open={addCategoryModal.show}
      onOpenChange={(e) => {
        setAddCategoryModal(e);
      }}
    >
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {addCategoryModal?.data ? "Update" : "Add"} Category
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CategoryForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CategoryForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { refetch } = useCategory();
  const { addCategoryModal, setAddCategoryModal } = useModalStore(
    (state) => state
  );

  const data = addCategoryModal.data;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: data?.categoryName || "",
      categoryType: data?.categoryType?.toLowerCase() || "income",
      icon: data?.icon || "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (values: any) => {
    setLoading(true);
    if (data) {
      const response = await Category.update(values, data.id);
      if (response.status) {
        toast({
          title: "Category added successfully",
        });
        setAddCategoryModal(false);
        refetch();
      }
    } else {
      const response = await Category.add(values);
      if (response.status) {
        toast({
          title: "Category added successfully",
        });
        setAddCategoryModal(false);
        refetch();
      }
    }
    setLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryType"
            defaultValue="income"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Type</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <CategoryIconSelector {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
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

export default CategoryModal;
