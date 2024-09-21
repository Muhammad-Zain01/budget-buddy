import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import useResponsive from "@/hooks/useResponsive";

type ComponentProps = {
  label: string;
  onClick?: () => void;
};

const AddButton: React.FC<ComponentProps> = ({ label, ...props }) => {
  const { isTablet } = useResponsive();
  return (
    <Button
      className="rounded-sm flex items-center gap-2 font-[500]"
      size={isTablet ? "sm" : "default"}
      {...props}
    >
      <Plus size={16} strokeWidth={3} />
      {label}
    </Button>
  );
};

export default AddButton;
