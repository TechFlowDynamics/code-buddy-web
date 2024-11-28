"use client";

import { Button } from "@mantine/core";
import { v4 as uuid } from "uuid";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/AuthContext";

import LobbyCards from "@/components/atoms/cards/LobbyCards";

const games = [
  {
    date: "22.12.2022",
    time: "20:20:02",
    title: "Code Campus",
    avatars: [
      "https://randomuser.me/api/portraits/men/3.jpg",
      "https://randomuser.me/api/portraits/men/45.jpg",
      "https://randomuser.me/api/portraits/men/33.jpg",
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/4.jpg",
      "https://randomuser.me/api/portraits/women/5.jpg",
      "https://randomuser.me/api/portraits/women/6.jpg",
      "https://randomuser.me/api/portraits/women/55.jpg",
    ],
    blinds: "10",
    minBuyIn: "20",
    token: "PKR",
    type: "Global",
    status: "Live",
  },
  {
    date: "23.12.2022",
    time: "15:10:00",
    title: "Hackos coders",
    avatars: [
      "https://randomuser.me/api/portraits/men/4.jpg",
      "https://randomuser.me/api/portraits/women/8.jpg",
      "https://randomuser.me/api/portraits/women/38.jpg",
    ],
    blinds: "35",
    minBuyIn: "50",
    token: "USD",
    type: "Global",
    status: "Open",
  },
  {
    date: "23.12.2022",
    time: "15:10:00",
    title: "Conquer Coder",
    avatars: [
      "https://randomuser.me/api/portraits/men/44.jpg",
      "https://randomuser.me/api/portraits/women/38.jpg",
      "https://randomuser.me/api/portraits/women/28.jpg",
      "https://randomuser.me/api/portraits/women/43.jpg",
      "https://randomuser.me/api/portraits/women/8.jpg",
      "https://randomuser.me/api/portraits/women/3.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
    ],
    blinds: "20",
    minBuyIn: "50",
    token: "USD",
    type: "Global",
    status: "Open",
  },
];

export default function LobbyPage() {
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
      <div className="fixed left-[0%] top-[7%] z-10 flex w-full flex-col items-center px-[5%] shadow-md backdrop-blur-sm md:flex-row">
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
      <div className="mx-0 my-4 mt-[6%] flex w-full flex-wrap justify-around gap-8 rounded-xl border-2 border-dashed border-gray-500 p-2 md:gap-10">
        {Array.from({ length: 20 }).map(() => (
          <LobbyCards games={games} key={uuid()} />
        ))}
      </div>
    </div>
  );
}
