import {
  ArrowLeftRight,
  Goal,
  House,
  LayoutDashboard,
  PieChart,
  Settings,
  Wallet,
} from "lucide-react";
import Link from "next/link";

export type DashboardItemType = {
  key: string;
  title: string;
  Icon: React.ReactNode;
};
export const DashboardItems: DashboardItemType[] = [
  {
    key: "dashboard",
    title: "Dashboard",
    Icon: <House />,
  },
  {
    key: "categories",
    title: "Categories",
    Icon: <LayoutDashboard />,
  },

  {
    key: "accounts",
    title: "Accounts",
    Icon: <Wallet />,
  },
  {
    key: "transactions",
    title: "Transactions",
    Icon: <ArrowLeftRight />,
  },
  {
    key: "settings",
    title: "Settings",
    Icon: <Settings />,
  },
];
