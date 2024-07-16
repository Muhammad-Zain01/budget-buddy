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

const TransactionCard = ({ transaction }: any) => {
  return (
    <Card className="relative rounded-md">
      <div className="flex flex-col  p-5">
        <div className="flex  w-full">
          <div className="flex w-full items-center gap-2">
            <div className="bg-accent p-2 rounded-full">
              <Icon
                icon={transaction.icon}
                className="w-8 h-8 text-accent-foreground dark:brightness-0 dark:invert"
              />
            </div>

            <div className="text-gray-600 dark:text-gray-100 text-[14px] mt-1 flex flex-col">
              {transaction.title}
              <span className="text-xs text-neutral-400">
                {"Transfer Cash > UBL"}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center items-end w-full text-sm text-gray-600 dark:text-gray-100 font-[500]">
            $200
            <span className="text-[11px]  font-[300]">10-10-2021</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-gray-400 ">
            My Description,My Description,v,My Description,My DescriptionMy
          </p>
          <div className="flex gap-1 items-center justify-end">
            <Badge
              variant={"secondary"}
              className="rounded-sm text-[10px] bg-[#16a34a32] text-primary border-primary"
            >
              Tags
            </Badge>
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
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
};

export default TransactionCard;
