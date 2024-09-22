"use client";
import { DashboardItemType } from "@/constants/dashboard-items";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ComponentProps = {
  item: DashboardItemType;
  onCloseDrawer: () => void;
};

const SidbarItem: React.FC<ComponentProps> = ({
  item: { title, Icon, key },
  onCloseDrawer,
}) => {
  const path = usePathname();

  return (
    <Link
      href={key}
      className={clsx(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
        path?.includes(key) && "bg-gray-100 dark:bg-neutral-700"
      )}
      prefetch={false}
      onClick={onCloseDrawer}
    >
      <div className="flex gap-3 items-center">
        {Icon}
        <span className="transition-all duration-300 data-[collapsed=true]:opacity-0 data-[collapsed=true]:w-0">
          {title}
        </span>
      </div>
    </Link>
  );
};

export default SidbarItem;
