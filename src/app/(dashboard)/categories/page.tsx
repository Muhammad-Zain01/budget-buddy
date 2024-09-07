"use client";
import { useMemo, useState } from "react";
import CategoryCard from "@/components/category/category-card";
import CategoryModal from "@/components/category/category-modal";
import useModalStore from "@/store/modal";
import useCategory from "@/hooks/api/useCategory";
import { Category } from "@/models";
import { Category as CategoryServices } from "@/lib/services/category";
import { useToast } from "@/components/ui/use-toast";
import useAlertDialoag from "@/hooks/useAlertDialog";
import CategoryTabs from "@/components/category/category-tabs";
import Loading from "@/components/loader";
import EmptyRecord from "@/components/empty-record";

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

  const categoryData = useMemo(() => {
    return (
      data?.data.filter(
        (category: Category) =>
          category.categoryType.toLowerCase() == activeTab.toLowerCase()
      ) || []
    );
  }, [activeTab, data]);

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 gap-6 p-6">
        <div className="bg-background rounded-lg">
          <CategoryTabs
            active={activeTab}
            onChange={handleTabChange}
            addModal={setAddCategoryModal}
          />
          {isLoading ? (
            <Loading fullPage />
          ) : (
            <>
              {categoryData?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {categoryData.map((category: Category) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      onDelete={onDelete}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  <EmptyRecord />
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <CategoryModal />
    </div>
  );
}
