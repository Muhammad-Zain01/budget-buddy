import { Button as CalcButton } from "@/components/ui/button";
import clsx from "clsx";

interface ButtonProps {
  color?: "red" | "green" | "dark";
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, color, onClick }) => {
  return (
    <CalcButton
      className={clsx(
        "rounded-none h-[60px] w-[70px] font-lg border-none bg-white text-black hover:bg-gray-200 shadow-none"
      )}
      color={color}
      onClick={onClick}
    >
      {children}
    </CalcButton>
  );
};

export default Button;
