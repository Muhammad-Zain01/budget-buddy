"use client";
import ThemeShifter from "@/layout/dashboard-layout/components/theme-shifter";
import User from "@/layout/dashboard-layout/components/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const { status } = useSession();
  const isAuthenticated = status == "authenticated";

  return (
    <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="font-bold text-xl flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Budget Buddy Logo"
            width={40}
            height={40}
          />
          <span className=" text-2xl text-[#2863EB] dark:text-[#4D8EFF] hidden sm:flex">
            Budget Buddy
          </span>
        </div>
        <div className="flex gap-3">
          <ThemeShifter />
          {isAuthenticated ? (
            <User />
          ) : (
            <div>
              <Button
                variant="ghost"
                className="mr-2 hover:text-[#2863EB] dark:hover:text-[#4D8EFF]"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <Button className="bg-[#2863EB] hover:bg-[#1E4BB8] dark:bg-[#4D8EFF] dark:hover:bg-[#3A6CD9] transition-colors duration-300">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
