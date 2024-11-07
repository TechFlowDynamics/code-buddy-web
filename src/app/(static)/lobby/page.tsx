// /src/app/lobby/page.tsx
"use client";
import { motion } from "framer-motion";
import JoinRoomForm from "@/components/molecule/lobby/JoinRoomForm";
import CreateRoomButton from "@/components/molecule/lobby/CreateRoomButton";
import BackgroundAnimation from "@/components/molecule/lobby/BackgroundAnimation";
import JoinRandomRoomButton from "@/components/molecule/lobby/JoinRandomRoomButton";
import CreditsIndicator from "@/components/molecule/lobby/CreditsIndicator";
import { useAuth } from "@/hooks/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LobbyPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard/lobby"); // Redirect to dashboard
    }
  }, [isLoggedIn]);
  return (
    <div className="relative flex flex-col items-center min-h-screen p-4 mt-4 justify-center  overflow-hidden">
      <BackgroundAnimation />
      <motion.h1
        className="text-4xl font-extrabold mb-4 z-10  text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}>
        Welcome to the Coder's Lobby
      </motion.h1>
      <CreditsIndicator credits="10" />
      <motion.div
        className="flex flex-col gap-6 w-full max-w-lg p-6 rounded-lg bg-opacity-80 backdrop-blur-md z-10 shadow-lg"
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
