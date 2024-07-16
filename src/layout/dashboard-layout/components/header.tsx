import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { FaRegMoon } from "react-icons/fa";
import DateFilter from "./date-filter";
import ThemeShifter from "./theme-shifter";

const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background ">
      <div className="mx-auto  flex h-16 max-w-full items-center justify-end px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <DateFilter />
          <ThemeShifter />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
