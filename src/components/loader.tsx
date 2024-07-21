import clsx from "clsx";
import { Loader } from "lucide-react";

type ComponentProps = {
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
};
const Loading: React.FC<ComponentProps> = ({
  size = "md",
  fullPage = false,
}) => {
  const sizeMaping = {
    sm: "w-[20px] h-[20px]",
    md: "w-[30px] h-[30px]",
    lg: "w-[40px] h-[40px]",
  };

  return (
    <div
      className={clsx(fullPage && "flex items-center justify-center h-[70vh]")}
    >
      <Loader
        className={clsx(
          sizeMaping[size],
          "text-gray-600 dark:text-white loader-icon"
        )}
      />
    </div>
  );
};

export default Loading;
