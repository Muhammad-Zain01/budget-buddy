import { Card } from "@/components/ui/card";
import { Icon } from "../icon";
import clsx from "clsx";
import AccountDropdown from "./account-dropdown";
import { getIcon } from "@/lib/utils";
import CurrencyView from "../ui/currency-view";
import { Account } from "@/models";

const AccountCard = ({
  account,
  onDelete,
}: {
  account: Account;
  onDelete: (id: number) => void;
}) => {
  const balance = Number(account?.balance) || 0;

  return (
    <Card className="relative rounded-md">
      <div className="flex  p-5">
        <div className="flex w-full items-center gap-2">
          <div className="bg-accent p-2 rounded-full">
            {}
            <Icon
              icon={getIcon(account.type.toLowerCase()) as string}
              className="w-6 h-6 md:w-8 md:h-8  text-accent-foreground dark:brightness-0 dark:invert"
            />
          </div>

          <div className="text-gray-600 text-xs md:text-sm dark:text-gray-100 text-[14px] mt-1">
            {account.name}
          </div>
        </div>
        <div className="flex items-center justify-end w-[70px]">
          <div
            className={clsx(
              "text-ellipsis  text-xs md:text-sm text-gray-500 dark:text-gray-100 font-[500]",
              balance < 0 && "text-red-500"
            )}
          >
            <CurrencyView>{balance}</CurrencyView>
          </div>
        </div>

        <AccountDropdown onDelete={onDelete} account={account} />
      </div>
    </Card>
  );
};

export default AccountCard;
