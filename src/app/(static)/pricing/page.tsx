// app/pricing/page.tsx
"use client";

import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import React from "react";

import { PRICING_PLANS_CONSTANT } from "@/core/constants/static.constant";

import PricingCard from "@/components/molecule/cards/PricingCards";

// app/pricing/page.tsx

// app/pricing/page.tsx

// app/pricing/page.tsx

// app/pricing/page.tsx

export default function PricingPage() {
  return (
    <div className="mt-10 min-h-screen py-10">
      <motion.h1
        className="mb-8 text-center text-4xl font-bold text-blue-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        Choose Your Plan
      </motion.h1>

      <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
        {PRICING_PLANS_CONSTANT.map(plan => (
          <PricingCard
            key={uuidv4()}
            title={plan.title}
            price={plan.price}
            credits={plan.credits}
            description={plan.description}
            features={plan.features}
          />
        ))}
      </div>
    </div>
  );
}
