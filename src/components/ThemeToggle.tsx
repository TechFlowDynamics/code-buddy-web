// components/ThemeToggle.tsx
"use client";
import { useTheme } from "@/hooks/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border rounded-md bg-gray-200 dark:bg-gray-700 dark:text-white">
      {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
}
