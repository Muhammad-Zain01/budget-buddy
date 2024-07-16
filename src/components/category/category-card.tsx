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

const CategoryCard = ({ category }: any) => {
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
            {category.title}
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

export default CategoryCard;
