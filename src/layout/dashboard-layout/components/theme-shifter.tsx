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
      {theme == "dark" ? (
        <Sun className="h-5 w-5" onClick={() => setTheme("light")} />
      ) : (
        <Moon className="h-5 w-5" onClick={() => setTheme("dark")} />
      )}
    </Button>
  );
};

export default ThemeShifter;
