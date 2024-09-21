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
import { Account, Category, Transaction } from "@/models";
import { getIcon } from "@/lib/utils";
import clsx from "clsx";
import CurrencyView from "../ui/currency-view";

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
    const account = transaction?.toAccount as Account;
    const fromAccount = transaction?.fromAccount?.name;
    const toAccount = account?.name;

    const commonProps = {
      amount: transaction?.amount,
    };

    switch (type) {
      case "expense":
      case "income":
        const category = transaction?.category as Category;
        return {
          ...commonProps,
          subTitle: type == "income" ? toAccount : fromAccount,
          icon: category?.icon,
          title: category?.categoryName,
          amount:
            type === "expense" ? `-${commonProps.amount}` : commonProps.amount,
        };
      case "transfer":
        return {
          ...commonProps,
          icon: getIcon("transfer") as string,
          subTitle: `${fromAccount} > ${toAccount}`,
          title: "Transfer",
        };
      case "people":
        const peopleTypeMap = {
          pay: "Money Sent",
          receive: "Money Received",
          lend: "Money Lent",
          borrow: "Money Borrowed",
        };
        return {
          ...commonProps,
          icon: getIcon("transfer"),
          subTitle: `${fromAccount} > ${toAccount}`,
          title:
            peopleTypeMap[transaction?.subType as keyof typeof peopleTypeMap] ||
            "",
        };
      default:
        return null;
    }
  };

  const getTransaction = () => {
    const type = transaction?.type.toLowerCase();
    const { title, subTitle, icon, amount }: any = getHead(type);
    // @ts-ignore
    const date = DateTime.fromISO(transaction?.createdAt).toRelative();
    const description = transaction?.description;
    const tags = generateTags();
    return {
      icon,
      type,
      title,
      subTitle,
      amount,
      date,
      description,
      tags,
    };
  };

  const { icon, title, type, subTitle, amount, date, description, tags } =
    getTransaction();

  return (
    <Card className="relative rounded-md">
      <div className="flex flex-col  p-5">
        <div className="flex  w-full">
          <div className="flex w-full items-center gap-2">
            <div className="bg-accent p-2 rounded-full">
              <Icon icon={icon} className="w-8 h-8 text-accent-foreground " />
            </div>

            <div className="text-gray-600 dark:text-gray-100 text-[12px] md:text-[14px] mt-1 flex flex-col ">
              {title}
              <span className="text-xs  text-neutral-400 ">{subTitle}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-end w-full text-sm text-gray-600 dark:text-gray-100 font-[500]">
            <span
              className={clsx("text-xs md:text-sm", {
                "text-red-700": type == "expense",
                "text-green-700": type == "income",
              })}
            >
              <CurrencyView>{amount}</CurrencyView>
            </span>
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
