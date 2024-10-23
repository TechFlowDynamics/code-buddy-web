// app/features/page.tsx
"use client";

import { FEATURE_CONSTANT } from "@/constants/static.constant";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen  text-gray-900 p-10 mt-[3%]">
      <motion.h1
        className="text-4xl font-bold text-center mb-8 text-blue-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        Platform Features
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {FEATURE_CONSTANT.map((feature, index) => (
          <motion.div
            key={uuidv4()}
            className="p-6 bg-white dark:bg-gray-600/50 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 0.8 }}>
            <motion.h2
              className="text-2xl font-semibold mb-2 dark:text-gray-200 "
              whileHover={{ scale: 1.02 }}>
              {feature.title}
            </motion.h2>
            <p className="dark:text-gray-300/40 text-gray-800">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
