// components/PricingCard.tsx
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

interface PricingCardProps {
  title: string;
  price: string;
  credits: number;
  description: string;
  features: string[];
}

export default function PricingCard({
  title,
  price,
  credits,
  description,
  features,
}: Readonly<PricingCardProps>) {
  return (
    <motion.div
      className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-lg transition-shadow duration-300 hover:shadow-2xl dark:bg-gray-600/50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}>
      <h2 className="mb-2 text-2xl font-semibold text-blue-700">{title}</h2>
      <p className="mb-4 text-4xl font-bold">{price}</p>
      <p className="mb-6 text-gray-800/70 dark:text-gray-200">{description}</p>
      <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-300">
        {credits} Credits
      </p>
      <ul className="mb-6 space-y-2 text-gray-600 dark:text-gray-300/70">
        {features.map(feature => (
          <li key={uuidv4()} className="flex items-center">
            <span className="mr-2 text-blue-600">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <motion.button
        className="mt-6 rounded-lg bg-blue-600 px-6 py-2 font-semibold text-gray-200 hover:bg-blue-500 dark:text-white"
        whileHover={{ scale: 1.05 }}>
        Get {title}
      </motion.button>
    </motion.div>
  );
}
