"use client";
import { Button } from "@/components/ui/button";
import { CheckCircledIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { DashboardItems, DashboardItemType } from "@/constants/dashboard-items";
import SidbarItem from "./sidebar-item";
import { Drawer } from "vaul";
import useResponsive from "@/hooks/useResponsive";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { HamIcon, Menu } from "lucide-react";

const SidebarWrapper = () => {
  const { isTablet } = useResponsive();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const openDrawer = () => {
      setOpen(true);
    };

    window?.addEventListener("open-drawer", openDrawer);
    return () => {
      window.removeEventListener("open-drawer", openDrawer);
    };
  }, []);
  if (isTablet) {
    return (
      <Sheet
        open={open}
        onOpenChange={(e) => {
          setOpen(e);
        }}
      >
        <SheetContent side={"left"} className="flex w-64 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
    );
  }
  return <Sidebar />;
};

const Sidebar = () => {
  return (
    <aside className="inset-y-0  left-0 flex w-64 flex-col border-r bg-background transition-all duration-300 data-[collapsed=true]:w-16 data-[collapsed=true]:overflow-x-hidden">
      <div className="flex h-16 shrink-0 items-center justify-between px-4">
        <Link
          href="#"
          className="flex items-center gap-2 font-bold"
          prefetch={false}
        >
          {/* eslint-disable-next-line */}
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

export default SidebarWrapper;
