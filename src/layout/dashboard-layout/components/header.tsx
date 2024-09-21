"use client";
import { Menu } from "lucide-react";
import DateFilter from "./date-filter";
import ThemeShifter from "./theme-shifter";
import User from "./user";
import useResponsive from "@/hooks/useResponsive";

const Header = () => {
  const { isTablet } = useResponsive();
  return (
    <header className="sticky top-0 z-10 border-b bg-background ">
      <div className="mx-auto  flex h-16 max-w-full items-center justify-end px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {isTablet && (
            <Menu
              className="fixed z-50 top-5 left-5 "
              size={20}
              onClick={() => {
                window.dispatchEvent(new Event("open-drawer"));
              }}
            />
          )}
          {/* <DateFilter /> */}
          <ThemeShifter />
          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;
