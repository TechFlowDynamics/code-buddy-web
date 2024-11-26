"use client";

import { Button } from "@mantine/core";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/AuthContext";

import LobbyCards from "@/components/atoms/cards/LobbyCards";
import SelectDropdown from "@/components/atoms/dropdown/SelectDropdown";

const games = [
  {
    date: "22.12.2022",
    time: "20:20:02",
    title: "Chip Champs",
    avatars: [
      "https://randomuser.me/api/portraits/men/32.jpg",
      "https://randomuser.me/api/portraits/women/45.jpg",
    ],
    blinds: "5/10",
    minBuyIn: "100",
    token: "PKR",
    type: "Local",
    status: "Playing Now",
  },
  {
    date: "23.12.2022",
    time: "15:10:00",
    title: "Poker Pros",
    avatars: [
      "https://randomuser.me/api/portraits/men/44.jpg",
      "https://randomuser.me/api/portraits/women/38.jpg",
    ],
    blinds: "10/20",
    minBuyIn: "500",
    token: "USD",
    type: "Global",
    status: "Open",
  },
];

export default function LobbyPage() {
  const [lobbyType, setLobbyType] = useState<string | null>(null);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard/lobby"); // Redirect to dashboard
    }
  }, [isLoggedIn]);
  return (
    <div className="relative mt-0 flex min-h-screen flex-col overflow-hidden md:mt-4 md:px-16">
      {/* <BackgroundAnimation /> */}
      <div className="relative left-[2%] top-[8%] flex w-full flex-col items-center shadow-md backdrop-blur-sm md:flex-row">
        <div className="m-2 w-full">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Global Lobbies
          </h1>
        </div>
        <div className="m-2 flex w-full justify-center gap-4 md:justify-end">
          <Button
            variant="outline"
            className="border-yellow-700 text-yellow-700/70 hover:bg-yellow-400/60 hover:text-yellow-800/70 dark:text-yellow-200 dark:hover:bg-yellow-600/40 dark:hover:text-darkText">
            Join with Code
          </Button>
          <Button className="bg-green-700/70 text-darkText hover:bg-green-400/60 hover:text-green-800/70 dark:text-green-200 dark:hover:bg-green-500/70 dark:hover:text-darkText">
            Create
          </Button>
        </div>
      </div>
      <div className="mx-0 my-4 flex w-full flex-wrap justify-around gap-8 rounded-xl border-2 border-dashed border-gray-500 p-2 md:gap-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <LobbyCards games={games} />
        ))}
      </div>
    </div>
  );
}
