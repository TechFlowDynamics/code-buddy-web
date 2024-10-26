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
      className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}>
      <h2 className="text-2xl font-semibold mb-2 text-blue-700">{title}</h2>
      <p className="text-4xl font-bold mb-4">{price}</p>
      <p className="text-gray-700 mb-6">{description}</p>
      <p className="text-lg font-semibold text-gray-900 mb-4">
        {credits} Credits
      </p>
      <ul className="text-gray-600 mb-6 space-y-2">
        {features.map(feature => (
          <li key={uuidv4()} className="flex items-center">
            <span className="mr-2 text-blue-600">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <motion.button
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500"
        whileHover={{ scale: 1.05 }}>
        Get {title}
      </motion.button>
    </motion.div>
  );
}
