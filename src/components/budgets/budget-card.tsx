import { Card } from "@/components/ui/card";
import { Icon } from "../icon";
import clsx from "clsx";
import CurrencyView from "../ui/currency-view";
import { Budget } from "@/models/Budget";
import { Progress, ProgressType } from "../ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { Repeat, Trash } from "lucide-react";
import useAlertDialoag from "@/hooks/useAlertDialog";

const BudgetCard = ({
  budget,
  onDelete,
}: {
  budget: Budget;
  onDelete: (id: number) => void;
}) => {
  const current = Number(budget?.totalExpense || 0);
  const target = budget?.amount;
  const { open } = useAlertDialoag();
  console.log(current > target ? 100 : (current / target) * 100);
  return (
    <Card
      className={clsx(
        "relative rounded-md overflow-hidden",
        current > target && "border border-red-500"
      )}
    >
      <div className="flex justify-center  flex-col p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-accent p-2 rounded-full">
              <Icon
                icon={budget?.category?.icon}
                className="w-6 h-6 md:w-8 md:h-8 text-accent-foreground dark:brightness-0 dark:invert"
              />
            </div>
            <div>
              <div className="text-gray-800 dark:text-gray-100 font-semibold text-lg">
                <div className="flex items-center gap-3">
                  {budget.name}
                  {budget.isRecurring && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Repeat size={14} />
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg">
                          <p className="text-sm font-medium">
                            Recurring budget
                          </p>
                          <p className="text-xs mt-1 text-gray-300">
                            This budget resets every month
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-xs">
                {budget.category?.categoryName}
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <Progress
            value={current > target ? 100 : (current / target) * 100}
            type={
              (current > target
                ? "danger"
                : current / target > 0.8
                ? "warning"
                : "success") as ProgressType
            }
          />
          <div className="flex justify-between mt-1 text-xs text-gray-600 dark:text-gray-400">
            <span className={current > target ? "text-red-500" : ""}>
              <CurrencyView>{current}</CurrencyView>
            </span>
            <span>
              <CurrencyView>{target}</CurrencyView>
            </span>
          </div>
        </div>

        <div className="absolute top-2 right-2  flex justify-end">
          <Button
            variant={"ghost"}
            size="sm"
            onClick={() => {
              open(
                "Are you sure?",
                "Do you want to delete this budget?",
                () => {
                  onDelete(budget.id);
                }
              );
            }}
          >
            <Trash size={13} />
          </Button>
        </div>
        <div className="flex justify-end">
          {current > target && (
            <div className="mt-3 w-full text-xs text-red-500 flex items-center ">
              Budget exceeded! Consider adjusting your spending or increasing
              your budget limit.
            </div>
          )}
          <div className="flex items-center  "></div>
        </div>
      </div>
    </Card>
  );
};

export default BudgetCard;
