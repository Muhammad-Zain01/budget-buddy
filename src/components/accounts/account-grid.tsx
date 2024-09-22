import useAccount from "@/hooks/api/useAccount";
import { Account } from "@/models/Account";
import { Icon } from "../icon";
import { getIcon } from "@/lib/utils";
import clsx from "clsx";
import useResponsive from "@/hooks/useResponsive";
import AccountSelector from "./account-selector";

type AccountGridProps = {
  type?: string;
  value: string;
  showAll?: boolean;
  onChange: (value: string) => void;
};
const AccountGrid: React.FC<AccountGridProps> = ({
  type,
  onChange,
  value,
  showAll = false,
}) => {
  const { data } = useAccount();
  const { isMobile } = useResponsive();
  const accountData = data?.data?.filter((item) => {
    if (type) {
      if (item.type === type) {
        return true;
      }
      return false;
    }

    if (!showAll && item.type == "PERSON") {
      return false;
    }
    return true;
  });

  if (isMobile) {
    return (
      <AccountSelector
        data={accountData || []}
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3 max-h-[200px] overflow-y-auto">
      {accountData?.map((item: Account) => {
        return (
          <AccountGridItem
            key={item.id}
            item={item}
            isSelected={value == String(item.id)}
            onClick={() => {
              onChange(String(item.id));
            }}
          />
        );
      })}
    </div>
  );
};

export const AccountGridItem = ({
  item,
  isSelected,
  onClick,
}: {
  item: Account;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      key={item.id}
      className={clsx(
        "flex  cursor-pointer flex-col items-center p-1 px-2 rounded-md border",
        "border-white hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700",
        isSelected && "bg-gray-100 dark:bg-gray-800"
      )}
      onClick={onClick}
    >
      <div className="flex">
        <div className="bg-accent dark:bg-accent-dark p-2 rounded-full">
          <Icon
            icon={getIcon(item.type.toLowerCase()) as string}
            className="w-7 h-7 md:w-8 md:h-8 text-accent-foreground dark:text-accent-foreground-dark"
          />
        </div>
      </div>
      <p className="text-[10px]  mt-2 truncate text-gray-800 dark:text-gray-200">
        {item.name}
      </p>
    </div>
  );
};

export default AccountGrid;
