// contexts/HistoryContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface HistoryContextType {
  lastPath: string | null;
  currPath: string | null;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [paths, setPaths] = useState<HistoryContextType>({
    lastPath: null,
    currPath: null,
  });
  const pathname = usePathname();

  useEffect(() => {
    // Update paths only if pathname has changed
    if (pathname && pathname !== paths.currPath) {
      setPaths({
        lastPath: paths.currPath, // Set lastPath to the current path before it changes
        currPath: pathname, // Update currPath to the new path
      });
    }
  }, [pathname]);

  return (
    <HistoryContext.Provider value={paths}>{children}</HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};
