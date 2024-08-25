import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent } from "../ui/dialog";
import CalculatorApp from "./calc";

type ComponentProps = {
  open: boolean;
  onClose: (value?: number) => void;
};
const CalculatorModal: React.FC<ComponentProps> = ({ open, onClose }) => {
  const getResult = (value: number) => {
    onClose(value);
  };
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[320px] p-0">
        <div className="flex justify-center p-0 ">
          <CalculatorApp getResult={getResult} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CalculatorModal;
