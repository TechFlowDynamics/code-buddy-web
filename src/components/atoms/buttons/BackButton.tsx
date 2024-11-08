// components/atoms/buttons/BackButton.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { TiArrowBack } from "react-icons/ti";
import { useAuth } from "@/hooks/AuthContext";
import { useHistory } from "@/hooks/HistoryContext";

const BackButton: React.FC = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { lastPath } = useHistory();
  const handleBackButton = () => {
    if (!isLoggedIn && lastPath?.includes("dashboard")) {
      router.push("/");
    } else {
      router.back();
    }
  };
  return (
    <button
      onClick={() => handleBackButton()}
      className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 my-4 w-fit py-2 px-4 rounded space-x-2">
      <TiArrowBack size={28} />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
