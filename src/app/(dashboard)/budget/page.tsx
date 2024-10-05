"use client";

import AddButton from "@/components/add-button";
import useModalStore from "@/store/modal";
import Loading from "@/components/loader";
import { useToast } from "@/components/ui/use-toast";
import useAlertDialoag from "@/hooks/useAlertDialog";
import EmptyRecord from "@/components/empty-record";
import useBudget from "@/hooks/api/useBudget";
import BudgetModal from "@/components/budgets/budget-modal";
import BudgetCard from "@/components/budgets/budget-card";
import { Budget } from "@/lib/services/budget";

export default function BudgetPage() {
  const { data, isLoading, refetch } = useBudget();
  const setBudgetModal = useModalStore((state) => state.setBudgetModal);
  const { toast } = useToast();
  const { close } = useAlertDialoag();

  const onDelete = async (id: number) => {
    const response = await Budget.remove(id);
    if (response.status) {
      toast({
        title: "Budget Deleted",
        description: "Budget has been deleted successfully",
      });
      refetch();
    } else {
      toast({
        title: "Budget Not Deleted",
        variant: "destructive",
        description:
          response?.message ||
          "Budget could not be deleted. It may be used in transactions",
      });
    }
    close();
  };

  const budgetData = data?.data || [];

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 gap-6">
        <div className="bg-background rounded-lg flex justify-end">
          <AddButton label="Add Budget" onClick={() => setBudgetModal(true)} />
        </div>
        {isLoading ? (
          <Loading fullPage />
        ) : (
          <>
            {/* @ts-ignore */}
            {budgetData?.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {budgetData?.map((budget, index) => (
                  <BudgetCard key={index} budget={budget} onDelete={onDelete} />
                ))}
              </div>
            ) : (
              <EmptyRecord title="No Budgets Available" />
            )}
          </>
        )}
      </main>
      <BudgetModal />
    </div>
  );
}
