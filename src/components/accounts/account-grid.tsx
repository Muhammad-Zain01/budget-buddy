import useAccount from "@/hooks/api/useAccount";
import { Account } from "@/models/Account";
import { Icon } from "../icon";
import { getIcon } from "@/lib/utils";
import clsx from "clsx";

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
  return (
    <div className="flex gap-3">
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

const AccountGridItem = ({
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
        "flex w-3/12 cursor-pointer flex-col items-center p-1 px-2 rounded-md border",
        "border-white hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700",
        isSelected && "bg-gray-100 dark:bg-gray-800"
      )}
      onClick={onClick}
    >
      <div className="flex">
        <div className="bg-accent dark:bg-accent-dark p-2 rounded-full">
          <Icon
            icon={getIcon(item.type.toLowerCase()) as string}
            className="w-8 h-8 text-accent-foreground dark:text-accent-foreground-dark"
          />
        </div>
      </div>
      <p className="text-xs mt-2 line-clamp-1 text-gray-800 dark:text-gray-200">
        {item.name}
      </p>
    </div>
  );
};

export default AccountGrid;
