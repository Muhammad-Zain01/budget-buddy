import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Icon } from "../icon";
import { Badge } from "../ui/badge";
import { DateTime } from "luxon";
import { Category, Transaction } from "@/models";
import { getIcon } from "@/lib/utils";

interface TransactionCardProps {
  transaction: Transaction;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  onDelete,
  onEdit,
}) => {
  const generateTags = () => {
    try {
      const tags = JSON.parse(transaction?.tags || "[]");
      return tags;
    } catch (error) {
      return [];
    }
  };

  const getHead = (type: string) => {
    if (type == "expense" || type == "income") {
      const category = transaction?.category as Category;
      return {
        icon: category?.icon,
        title: category?.categoryName,
        subTitle: category?.categoryName,
      };
    } else {
      return {
        icon: getIcon(transaction?.fromAccount?.type.toLowerCase()) as string,
        title: transaction?.fromAccount?.name,
        subTitle: transaction?.fromAccount?.name,
      };
    }
    return {
      icon: "",
      title: "",
      subTitle: "",
    };
  };

  const getTransaction = () => {
    const type = transaction?.type.toLowerCase();
    const subType = "";
    const { title, subTitle, icon } = getHead(type);
    const amount = transaction?.amount;
    // @ts-ignore
    const date = DateTime.fromISO(transaction?.createdAt).toRelative();
    const description = transaction?.description;
    const tags = generateTags();
    return {
      icon,
      type,
      subType,
      title,
      subTitle,
      amount,
      date,
      description,
      tags,
    };
  };

  const { icon, title, subTitle, amount, date, description, tags } =
    getTransaction();

  return (
    <Card className="relative rounded-md">
      <div className="flex flex-col  p-5">
        <div className="flex  w-full">
          <div className="flex w-full items-center gap-2">
            <div className="bg-accent p-2 rounded-full">
              <Icon icon={icon} className="w-8 h-8 text-accent-foreground " />
            </div>

            <div className="text-gray-600 dark:text-gray-100 text-[14px] mt-1 flex flex-col">
              {title}
              <span className="text-xs text-neutral-400">{subTitle}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-end w-full text-sm text-gray-600 dark:text-gray-100 font-[500]">
            ${amount}
            <span className="text-[11px]  font-[300]">{date}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-gray-400 ">{description}</p>
          <div className="flex gap-1 items-center justify-end">
            {tags.map((tag: string, index: number) => (
              <Badge
                key={index}
                variant={"secondary"}
                className="rounded-sm text-[10px] text-primary border-primary"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute p-0 h-6 w-6 rounded-sm m-1    top-0 right-0"
          >
            <BsThreeDotsVertical className="w-3.5 h-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => onEdit(transaction?.id)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => onDelete(transaction?.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
};

export default TransactionCard;
