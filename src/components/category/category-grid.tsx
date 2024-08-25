import useCategory from "@/hooks/api/useCategory";
import Loading from "../loader";
import { Category } from "@/models";
import { Icon } from "../icon";
import clsx from "clsx";

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
  const categoryData = data?.data?.filter(
    (item: Category) => item?.categoryType.toLowerCase() == type
  );

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="flex gap-3">
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

const CategoryGridItem = ({
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
        "flex w-3/12 cursor-pointer flex-col items-center p-1 px-2 rounded-md border border-white hover:border-gray-200",
        isSelected && "bg-gray-100"
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
      <p className="text-xs mt-2 line-clamp-1">{item.categoryName}</p>
    </div>
  );
};

export default CategoryGrid;
