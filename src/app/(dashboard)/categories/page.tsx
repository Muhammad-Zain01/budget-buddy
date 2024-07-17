"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import clsx from "clsx";
import CategoryCard from "@/components/category/category-card";
import { PrimaryCategories } from "@/constants/categories";
import AddButton from "@/components/add-button";
import CategoryModal from "@/components/category/category-modal";
import useModalStore from "@/store/modal";
import useCategory from "@/hooks/api/useCategory";
import { Category } from "@/models";
import { Category as CategoryServices } from "@/lib/services/category";
import { useToast } from "@/components/ui/use-toast";
import useAlertDialoag from "@/hooks/useAlertDialog";

export default function CategoryPage() {
  const [activeTab, setActiveTab] = useState("income");
  const { data, isLoading, isError, refetch } = useCategory();
  const { close } = useAlertDialoag();
  const { toast } = useToast();

  const setAddCategoryModal = useModalStore(
    (state) => state.setAddCategoryModal
  );

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const onDelete = async (id: number) => {
    const response = await CategoryServices.remove(id);
    if (response.status) {
      toast({
        title: "Category Deleted",
        description: "Category has been deleted successfully",
      });
      refetch();
    }
    close();
  };

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 gap-6 p-6">
        <div className="bg-background rounded-lg ">
          <Tabs>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger
                  value="income"
                  className={clsx(
                    "px-3",
                    activeTab === "income" &&
                      "bg-primary text-primary-foreground"
                  )}
                  onClick={() => handleTabChange("income")}
                >
                  Income
                </TabsTrigger>
                <TabsTrigger
                  value="expense"
                  className={clsx(
                    "px-3",
                    activeTab === "expense" &&
                      "bg-primary text-primary-foreground "
                  )}
                  onClick={() => handleTabChange("expense")}
                >
                  Expense
                </TabsTrigger>
              </TabsList>
              <AddButton
                label="Add Category"
                onClick={() => setAddCategoryModal(true)}
              />
            </div>
          </Tabs>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {data &&
              data?.data
                .filter(
                  (category: Category) =>
                    category.categoryType.toLowerCase() ==
                    activeTab.toLowerCase()
                )
                .map((category: Category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onDelete={onDelete}
                  />
                ))}
          </div>
        </div>
      </main>
      <CategoryModal />
    </div>
  );
}
