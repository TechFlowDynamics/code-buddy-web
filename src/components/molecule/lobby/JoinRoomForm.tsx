"use client";

import { motion } from "framer-motion";

import React, { useState } from "react";

import InputField from "@/components/atoms/inputs/InputFields";


const JoinRoomForm: React.FC = () => {
  const [roomCode, setRoomCode] = useState("");

  const handleJoinRoom = () => {
    if (roomCode) {
      // Handle join room logic here
    }
  };

  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <InputField
        type="text"
        value={roomCode}
        onChange={e => setRoomCode(e.target.value)}
        placeholder="Room Code"
        parentClassName=""
      />
      <button
        onClick={handleJoinRoom}
        className="rounded-md bg-blue-600 py-2 text-white shadow-md hover:bg-blue-700">
        Join Room
      </button>
    </motion.div>
  );
};

export default JoinRoomForm;
