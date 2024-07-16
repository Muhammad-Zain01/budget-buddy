import useModalStore from "@/store/modal";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CategoryModal = () => {
  const { addCategoryModal, setAddCategoryModal } = useModalStore(
    (state) => state
  );

  return (
    <Dialog
      open={addCategoryModal.show}
      onOpenChange={(e) => {
        console.log("e >>>", e);
        setAddCategoryModal(e);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Category Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
