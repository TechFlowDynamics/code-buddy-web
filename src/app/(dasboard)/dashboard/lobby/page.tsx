"use client";

import { Button } from "@mantine/core";

import React, { useState } from "react";

import useScroll from "@/hooks/useScroll";

import SelectDropdown from "@/components/atoms/dropdown/SelectDropdown";

const Lobby = () => {
  const scrolled = useScroll();
  const [lobbyType, setLobbyType] = useState<string | null>(null);

  return (
    <div className="relative mt-4 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4">
      <div
        className={`fixed z-10 flex w-[85%] flex-col items-center px-[5%] shadow-md backdrop-blur-sm transition-all duration-700 md:flex-row ${scrolled ? "top-0" : "top-[8%] !duration-100"}`}>
        <div className="m-2 flex w-full gap-4">
          <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl">Lobby</h1>
          <SelectDropdown
            placeholder="Filter by difficulty"
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
    </div>
  );
};

export default Lobby;
