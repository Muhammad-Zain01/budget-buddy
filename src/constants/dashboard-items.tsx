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
  label: React.ReactNode;
  Icon: React.ReactNode;
};
export const DashboardItems: DashboardItemType[] = [
  {
    key: "dashboard",
    title: "Dashboard",
    label: <Link href="/dashboard">Dashboard</Link>,
    Icon: <House />,
  },
  {
    key: "categories",
    title: "Categories",
    label: <Link href="/categories">Categories</Link>,
    Icon: <LayoutDashboard />,
  },

  {
    key: "accounts",
    title: "Accounts",
    label: <Link href="/accounts">Accounts</Link>,
    Icon: <Wallet />,
  },
  {
    key: "transactions",
    title: "Transactions",
    label: <Link href="/transactions">Transactions</Link>,
    Icon: <ArrowLeftRight />,
  },
  {
    key: "goals",
    title: "Goals",
    label: <Link href="/goals">Goals</Link>,
    Icon: <Goal />,
  },
  {
    key: "insights",
    title: "Insights",
    label: <Link href="/insights">Insigths</Link>,
    Icon: <PieChart />,
  },
  {
    key: "settings",
    title: "Settings",
    label: <Link href="/settings">Settings</Link>,
    Icon: <Settings />,
  },
];
