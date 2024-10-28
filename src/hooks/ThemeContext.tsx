// context/ThemeContext.tsx
"use client";
import { RootState } from "@/store/store";
import storage from "@/utils/storage";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setTheme } from "@/reducer/theme/themeSlice";

interface ThemeContextProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme); // accessing `theme` directly from state

  useEffect(() => {
    const storedTheme = storage.getItem("theme");
    if (storedTheme) {
      dispatch(setTheme(storedTheme as "light" | "dark"));
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      dispatch(setTheme("dark"));
      document.documentElement.classList.toggle("dark", true);
    }
  }, [dispatch]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme()); // Toggle theme in Redux state
    const newTheme = theme === "dark" ? "light" : "dark";
    storage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Memoize the value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({ theme, toggleTheme: handleToggleTheme }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
