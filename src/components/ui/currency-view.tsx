import useCurrentUser from "@/hooks/api/useCurrentUser";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

interface CurrencyViewProps {
  className?: string;
  children?: ReactNode;
}

const CurrencyView: React.FC<CurrencyViewProps> = ({ className, children }) => {
  const { data } = useCurrentUser();
  const currency = data?.data?.currency || "$";

  return (
    <div className={twMerge("flex items-center", className)}>
      <span className="mr-1">{currency}</span>
      {children}
    </div>
  );
};

export default CurrencyView;
