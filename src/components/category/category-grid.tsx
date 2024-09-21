import useCategory from "@/hooks/api/useCategory";
import Loading from "../loader";
import { Category } from "@/models";
import { Icon } from "../icon";
import clsx from "clsx";
import CategorySelector from "./CategorySelector";
import useResponsive from "@/hooks/useResponsive";

type CategoryGridProps = {
  type: "expense" | "income";
  value: string;
  onChange: (value: string) => void;
};

const CategoryGrid: React.FC<CategoryGridProps> = ({
  type,
  value,
  onChange,
}) => {
  const { data, isLoading } = useCategory();
  const { isMobile } = useResponsive();
  const categoryData = data?.data?.filter(
    (item: Category) => item?.categoryType.toLowerCase() == type
  );
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (isMobile) {
    return (
      <CategorySelector
        data={categoryData || []}
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3 max-h-[200px] overflow-y-auto">
      {categoryData?.map((item: Category) => {
        return (
          <CategoryGridItem
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

export const CategoryGridItem = ({
  item,
  isSelected,
  onClick,
}: {
  item: Category;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      key={item.id}
      className={clsx(
        "flex cursor-pointer flex-col items-center p-1 px-2 rounded-md border",
        "border-white hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700",
        isSelected && "bg-gray-100 dark:bg-gray-800"
      )}
      onClick={onClick}
    >
      <div className="flex">
        <div className="bg-accent p-2 rounded-full">
          <Icon
            icon={item.icon}
            className="w-8 h-8 text-accent-foreground dark:brightness-0 dark:invert"
          />
        </div>
      </div>
      <p className="text-[10px] sm:text-xs mt-2 truncate">{item.categoryName}</p>
    </div>
  );
};

export default CategoryGrid;
