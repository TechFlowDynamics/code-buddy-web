"use client";
import { useTheme } from "@/hooks/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
      aria-label="Toggle Theme">
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}
