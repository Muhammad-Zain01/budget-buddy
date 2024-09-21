import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "./ui/scroll-area";

type DrawerViewProps = {
  open: boolean;
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  onOpenChange?: (value: boolean) => void;
  height?: string;
};
const DrawerView: React.FC<DrawerViewProps> = ({
  open,
  title,
  onOpenChange,
  children,
  footer,
  height = "100%",
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto  w-full max-w-sm flex flex-col ">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <ScrollArea
            className="px-2 "
            style={{
              height,
            }}
          >
            <div className="">{children}</div>
          </ScrollArea>
          <DrawerFooter>{footer}</DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerView;
