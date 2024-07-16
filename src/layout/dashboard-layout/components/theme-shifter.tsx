"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeShifter = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      aria-label="Search"
    >
      {theme == "light" ? (
        <Moon className="h-5 w-5" onClick={() => setTheme("dark")} />
      ) : (
        <Sun className="h-5 w-5" onClick={() => setTheme("light")} />
      )}
    </Button>
  );
};

export default ThemeShifter;
