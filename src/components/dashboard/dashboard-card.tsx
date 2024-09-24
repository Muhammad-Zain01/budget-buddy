import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import CurrencyView from "../ui/currency-view";
import { Switch } from "../ui/switch";

type DashboardCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  additionalHeader?: React.ReactNode;
  className?: string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  children,
  additionalHeader,
  className = "",
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex w-full flex-col md:flex-row  justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="mt-2 md:mt-0 justify-end flex md:block">
            {additionalHeader && additionalHeader}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default DashboardCard;
