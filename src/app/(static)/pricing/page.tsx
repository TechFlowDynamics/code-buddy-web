// app/pricing/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

const plans = [
  {
    title: "Freemium",
    price: "Free",
    credits: 5,
    description: "Get started with 5 free credits. Invite friends to join a room and use 2 credits per invite.",
  },
  {
    title: "Basic",
    price: "$5",
    credits: 20,
    description: "Ideal for occasional coding sessions and small groups.",
  },
  {
    title: "Pro",
    price: "$15",
    credits: 50,
    description: "Perfect for regular collaboration sessions with extra flexibility.",
  },
  {
    title: "Ultimate",
    price: "$30",
    credits: 100,
    description: "Unlimited coding sessions for teams and advanced users.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen p-10">
      <motion.h1
        className="text-4xl font-bold text-center mb-8 text-blue-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Choose Your Plan
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {plans.map((plan, index) => (
          <motion.div
            key={uuidv4()}
            className="p-6 dark:bg-gray-600/50 bg-white rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-2 text-blue-700">{plan.title}</h2>
            <p className="text-4xl font-bold mb-4">{plan.price}</p>
            <p className="text-gray-200 mb-6">{plan.description}</p>
            <p className="text-lg font-semibold text-gray-400">{plan.credits} Credits</p>
            <motion.button
              className="mt-6 px-4 py-2 bg-blue-600  rounded-lg hover:bg-blue-500"
              whileHover={{ scale: 1.05 }}
            >
              Get {plan.title}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
