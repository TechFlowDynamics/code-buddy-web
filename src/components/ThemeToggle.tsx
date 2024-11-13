"use client";

import { FaMoon, FaSun } from "react-icons/fa";

import { useTheme } from "@/hooks/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-md border bg-gray-200 p-2 text-gray-800 dark:bg-gray-700 dark:text-white"
      aria-label="Toggle Theme">
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}
