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
import { Category } from "@/models";
import useAlertDialoag from "@/hooks/useAlertDialog";
import { Category as CategoryService } from "@/lib/services/category";
import useModalStore from "@/store/modal";

type ComponentProps = {
  category: Category;
  onDelete: (id: number) => void;
};
const CategoryCard: React.FC<ComponentProps> = ({ category, onDelete }) => {
  const { open } = useAlertDialoag();
  const setAddCategoryModal = useModalStore(
    (state) => state.setAddCategoryModal
  );
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
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                setAddCategoryModal(true, category);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                open(
                  "Are you sure?",
                  "Do you want to delete this category?",
                  () => onDelete(category.id)
                );
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

export default CategoryCard;
