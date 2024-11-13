// /src/app/lobby/components/CreateRoomButton.tsx
"use client";

import { motion } from "framer-motion";

import React from "react";

// /src/app/lobby/components/CreateRoomButton.tsx

// /src/app/lobby/components/CreateRoomButton.tsx

// /src/app/lobby/components/CreateRoomButton.tsx

// /src/app/lobby/components/CreateRoomButton.tsx

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
      className="relative rounded-lg bg-gradient-to-r from-green-500 to-teal-500 py-3 text-white shadow-lg hover:from-green-600 hover:to-teal-600"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
      {label}
      <span className="absolute right-0 top-0 -translate-y-2 translate-x-2 transform rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
        -2 Credits
      </span>
    </motion.button>
  );
};

export default CreateRoomButton;
