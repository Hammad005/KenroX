import React from "react";
import { useTheme } from "./ui/theme-provider";
import { Button } from "./ui/button";
import { MoonStar, Sun } from "lucide-react";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      className="flex items-center justify-between gap-3 w-10 h-10 hover:w-fit overflow-x-hidden transition-all duration-[1000ms] ease-in-out"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <MoonStar className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Sun className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="text-sm text-foreground font-semibold">
        {
          theme === "dark"
            ? "Light"
            : "Dark"
        }
      </span>
    </Button>
  );
};

export default ModeToggle;
