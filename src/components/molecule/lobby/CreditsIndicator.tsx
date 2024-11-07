// /src/app/lobby/components/CreditsIndicator.tsx
"use client";
import { motion } from "framer-motion";

interface CreditsIndicatorInterface {
  credits: string;
}

const CreditsIndicator: React.FC<CreditsIndicatorInterface> = ({ credits }) => {
  return (
    <motion.div
      className="flex items-center justify-center text-lg font-bold px-6 py-4 rounded-full shadow-lg mb-4
    bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-blue-200
    bg-opacity-60 dark:bg-opacity-80"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}>
      <p className="text-lg font-semibold">Credits: {credits}</p>
    </motion.div>
  );
};

export default CreditsIndicator;
