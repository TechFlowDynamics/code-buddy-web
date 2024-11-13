"use client";

import { motion } from "framer-motion";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/AuthContext";

import BackgroundAnimation from "@/components/molecule/lobby/BackgroundAnimation";
import CreateRoomButton from "@/components/molecule/lobby/CreateRoomButton";
import CreditsIndicator from "@/components/molecule/lobby/CreditsIndicator";
import JoinRandomRoomButton from "@/components/molecule/lobby/JoinRandomRoomButton";
import JoinRoomForm from "@/components/molecule/lobby/JoinRoomForm";


export default function LobbyPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard/lobby"); // Redirect to dashboard
    }
  }, [isLoggedIn]);
  return (
    <div className="relative mt-4 flex min-h-screen flex-col items-center justify-center overflow-hidden p-4">
      <BackgroundAnimation />
      <motion.h1
        className="z-10 mb-4 text-center text-4xl font-extrabold"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}>
        Welcome to the Coder's Lobby
      </motion.h1>
      <CreditsIndicator credits="10" />
      <motion.div
        className="z-10 flex w-full max-w-lg flex-col gap-6 rounded-lg bg-opacity-80 p-6 shadow-lg backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}>
        <JoinRoomForm />
        <CreateRoomButton label="Create Room" onClick={() => {}} />
        <JoinRandomRoomButton label="Join Random Room" />
      </motion.div>
    </div>
  );
}
