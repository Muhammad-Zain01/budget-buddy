import { Plus } from "lucide-react";
import { Button } from "./ui/button";

type ComponentProps = {
  label: string;
  onClick?: () => void;
};

const AddButton: React.FC<ComponentProps> = ({ label, ...props }) => {
  return (
    <Button
      className="rounded-sm flex items-center gap-2 font-[500]"
      {...props}
    >
      <Plus size={16} strokeWidth={3} />
      {label}
    </Button>
  );
};

export default AddButton;
