import { icons } from "@/constants/icons";
import usePagination from "@/hooks/usePagination";
import { Icon } from "../icon";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ComponentProps = {
  value: string;
  onChange: (value: string) => void;
};
const CategoryIconSelector: React.FC<ComponentProps> = ({
  value,
  onChange,
}) => {
  const { items, next, prev, showPrev, showNext } = usePagination<string[]>(
    icons,
    14
  );

  return (
    <div className="flex justify-evenly">
      <div className="flex items-center">
        {showPrev && (
          <ChevronLeft size={16} onClick={prev} className="cursor-pointer" />
        )}
      </div>
      <div className="flex flex-wrap gap-2 justify-center items-center">
        {items.map((icon: string) => {
          return (
            <SelectorItem
              key={icon}
              icon={icon}
              value={value}
              onClick={() => onChange(icon)}
            />
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

const SelectorItem = ({
  icon,
  value,
  onClick,
}: {
  icon: string;
  value: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={clsx(
        "w-[12%] h-[50px] flex justify-center items-center dark:border-gray-600 border rounded-sm hover:border-gray-400 dark:hover:border-gray-100  cursor-pointer",
        value == icon ? "border-gray-600 dark:border-white" : "border-gray-200"
      )}
      onClick={onClick}
    >
      <Icon icon={icon} className="w-8 h-8" />
    </div>
  );
};
export default CategoryIconSelector;
