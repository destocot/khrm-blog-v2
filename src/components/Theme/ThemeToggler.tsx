"use client";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Spinner } from "../Spinner";

export const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const handleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div>
        <Button
          aria-label="Toggle theme placeholder"
          onClick={handleTheme}
          size="icon"
          variant="ghost"
        >
          <div className="w-6">
            <Spinner />
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button
        aria-label="Toggle theme"
        onClick={handleTheme}
        size="icon"
        variant="ghost"
      >
        {resolvedTheme === "dark" ? (
          <SunIcon width="22" height="22" />
        ) : (
          <MoonIcon width="22" height="22" />
        )}
      </Button>
    </div>
  );
};
