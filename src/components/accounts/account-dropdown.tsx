import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useAlertDialoag from "@/hooks/useAlertDialog";
import useModalStore from "@/store/modal";

const AccountDropdown = ({ account, onDelete }: any) => {
  const { open } = useAlertDialoag();
  const setAccountModal = useModalStore((state) => state.setAccountModal);

  return (
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
            setAccountModal(true, account);
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
              () => {
                onDelete(account.id);
              }
            );
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
