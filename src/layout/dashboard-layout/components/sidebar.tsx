import { Button } from "@/components/ui/button";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { DashboardItems, DashboardItemType } from "@/constants/dashboard-items";
import SidbarItem from "./sidebar-item";

const Sidebar = () => {
  return (
    <aside className="inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-background transition-all duration-300 data-[collapsed=true]:w-16 data-[collapsed=true]:overflow-x-hidden">
      <div className="flex h-16 shrink-0 items-center justify-between px-4">
        <Link
          href="#"
          className="flex items-center gap-2 font-bold"
          prefetch={false}
        >
          <img src="/logo.png" className="w-6" />
          <span className="text-lg font-bold tracking-tight transition-all duration-300 data-[collapsed=true]:opacity-0 data-[collapsed=true]:scale-0 text-primary">
            Budget Buddy
          </span>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col overflow-y-auto px-4 space-y-2 py-6">
        {DashboardItems.map((item: DashboardItemType, index) => {
          return <SidbarItem key={index} item={item} />;
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
