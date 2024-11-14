"use client";

import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import { FEATURE_CONSTANT } from "@/core/constants/static.constant";

export default function FeaturesPage() {
  return (
    <div className="mt-[3%] min-h-screen p-10 text-gray-900">
      <motion.h1
        className="mb-8 text-center text-4xl font-bold text-blue-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        Platform Features
      </motion.h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
        {FEATURE_CONSTANT.map((feature, index) => (
          <motion.div
            key={uuidv4()}
            className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-600/50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 0.8 }}>
            <motion.h2
              className="mb-2 text-2xl font-semibold dark:text-gray-200"
              whileHover={{ scale: 1.02 }}>
              {feature.title}
            </motion.h2>
            <p className="text-gray-800 dark:text-gray-300/40">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
