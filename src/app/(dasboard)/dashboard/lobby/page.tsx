"use client";

import { Button } from "@mantine/core";
import { v4 as uuid } from "uuid";

import React, { useState } from "react";

import useScroll from "@/hooks/useScroll";

import staticConstant from "@/core/constants/static.constant";

import LobbyCards from "@/components/atoms/cards/LobbyCards";
import SelectDropdown from "@/components/atoms/dropdown/SelectDropdown";

const Lobby = () => {
  const scrolled = useScroll();
  const [lobbyType, setLobbyType] = useState<string | null>(null);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-4">
      <div
        className={`fixed z-10 flex w-[85%] flex-col items-center px-[5%] shadow-md backdrop-blur-sm transition-all duration-500 ease-linear md:flex-row ${
          scrolled ? "top-0" : "top-[8%]"
        }`}>
        <div className="m-2 flex w-full gap-4">
          <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl">Lobby</h1>
          <SelectDropdown
            placeholder="Filter by Type"
            data={["Local", "Global"]}
            checkIconPosition="right"
            value={lobbyType}
            onChange={value => {
              setLobbyType(value);
            }}
          />
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
      <div className="mx-0 mb-0 mt-[5%] flex h-[75vh] w-full flex-wrap justify-evenly gap-2 overflow-y-scroll rounded-xl border-2 border-dashed border-gray-500 p-2 md:gap-10">
        {Array.from({ length: 5 }).map(() => (
          <LobbyCards games={staticConstant.PRIVATE_LOBBY} key={uuid()} />
        ))}
      </div>
    </div>
  );
};

export default Lobby;
