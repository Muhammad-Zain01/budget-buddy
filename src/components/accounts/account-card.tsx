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
import clsx from "clsx";
import AccountDropdown from "./account-dropdown";
import { getIcon } from "@/lib/utils";
import CurrencyView from "../ui/currency-view";

const AccountCard = ({ account, onDelete }: any) => {
  return (
    <Card className="relative rounded-md">
      <div className="flex  p-5">
        <div className="flex w-full items-center gap-2">
          <div className="bg-accent p-2 rounded-full">
            {}
            <Icon
              icon={getIcon(account.type.toLowerCase()) as string}
              className="w-8 h-8 text-accent-foreground dark:brightness-0 dark:invert"
            />
          </div>

          <div className="text-gray-600 dark:text-gray-100 text-[14px] mt-1">
            {account.name}
          </div>
        </div>
        <div className="flex items-center justify-end w-[70px]">
          <div
            className={clsx(
              "text-ellipsis overflow-hidden text-nowrap text-sm text-gray-600 dark:text-gray-100 font-[500]",
              account.balance < 0 && "text-red-500"
            )}
          >
            <CurrencyView>{account.balance}</CurrencyView>
          </div>
        </div>

        <AccountDropdown onDelete={onDelete} account={account} />
      </div>
    </Card>
  );
};

export default AccountCard;
