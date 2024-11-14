"use client";

import { TiArrowBack } from "react-icons/ti";

import React from "react";

import { useRouter } from "next/navigation";

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
      className="fixed my-4 flex w-fit items-center space-x-2 rounded px-4 py-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600">
      <TiArrowBack size={28} />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
