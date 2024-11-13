"use client";

import { motion } from "framer-motion";

import React from "react";


interface CreateRoomButtonProps {
  label: string;
  onClick?: () => void;
}

const JoinRandomRoomButton: React.FC<CreateRoomButtonProps> = ({
  label,
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 py-3 text-white shadow-lg hover:from-purple-600 hover:to-pink-600"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
      {label}
    </motion.button>
  );
};

export default JoinRandomRoomButton;
