// /src/app/lobby/components/CreateRoomButton.tsx
"use client";
import { motion } from "framer-motion";
interface CreateRoomButtonProps {
  label: string;
  onClick?: () => void;
}
const CreateRoomButton: React.FC<CreateRoomButtonProps> = ({
  label,
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg shadow-lg hover:from-green-600 hover:to-teal-600 relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
      {label}
      <span className="absolute top-0 right-0 bg-red-500 text-xs font-bold text-white px-2 py-1 rounded-full transform translate-x-2 -translate-y-2">
        -2 Credits
      </span>
    </motion.button>
  );
};

export default CreateRoomButton;
