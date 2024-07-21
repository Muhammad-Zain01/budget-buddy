import { Card } from "@/components/ui/card";
import { Icon } from "../icon";
import { Category } from "@/models";
import CategoryDropdown from "./category-dropdown";

type ComponentProps = {
  category: Category;
  onDelete: (id: number) => void;
};
const CategoryCard: React.FC<ComponentProps> = ({ category, onDelete }) => {
  return (
    <Card className="relative rounded-md dark:bg-muted">
      <div className="flex items-center py-5">
        <div className="flex flex-col w-full justify-center items-center gap-2">
          <div className="bg-accent p-2 rounded-full">
            <Icon
              icon={category.icon}
              className="w-8 h-8 text-accent-foreground dark:brightness-0 dark:invert"
            />
          </div>
          <div className="text-gray-600 dark:text-gray-100 text-[14px] mt-1">
            {category.categoryName}
          </div>
        </div>
        <CategoryDropdown category={category} onDelete={onDelete} />
      </div>
    </Card>
  );
};

export default CategoryCard;
