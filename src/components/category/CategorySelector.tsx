import usePagination from "@/hooks/usePagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CategoryGridItem } from "./category-grid";
import { Category } from "@/models";
import useResponsive from "@/hooks/useResponsive";
import clsx from "clsx";

const CategorySelector = ({
  value,
  data,
  onChange,
}: {
  value: string;
  data: Category[];
  onChange: (value: string) => void;
}) => {
  const { isSmallMobile } = useResponsive();
  const { items, next, prev, showPrev, showNext } = usePagination<Category[]>(
    data,
    isSmallMobile ? 2 : 3
  );

  return (
    <div className="flex justify-evenly">
      <div className="flex items-center">
        {showPrev && (
          <ChevronLeft size={16} onClick={prev} className="cursor-pointer" />
        )}
      </div>
      <div
        className={clsx(
          "grid gap-2 w-full justify-center items-center",
          isSmallMobile ? "grid-cols-2" : "grid-cols-3"
        )}
      >
        {items.map((item: Category) => {
          return (
            <div key={item.id}>
              <CategoryGridItem
                key={item.id}
                item={item}
                isSelected={value == String(item.id)}
                onClick={() => {
                  onChange(String(item.id));
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-center">
        {showNext && (
          <ChevronRight size={16} onClick={next} className="cursor-pointer" />
        )}
      </div>
    </div>
  );
};

export default CategorySelector;
