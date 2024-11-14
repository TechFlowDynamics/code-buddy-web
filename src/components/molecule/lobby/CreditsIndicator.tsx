"use client";

import { motion } from "framer-motion";

import React from "react";

interface CreditsIndicatorInterface {
  credits: string;
}

const CreditsIndicator: React.FC<CreditsIndicatorInterface> = ({ credits }) => {
  return (
    <motion.div
      className="z-10 mb-4 flex items-center justify-center rounded-full bg-gray-200 bg-opacity-60 px-6 py-4 text-lg font-bold text-gray-900 shadow-lg dark:bg-gray-900 dark:bg-opacity-80 dark:text-blue-200"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}>
      <p className="text-lg font-semibold">Credits: {credits}</p>
    </motion.div>
  );
};

export default CreditsIndicator;
