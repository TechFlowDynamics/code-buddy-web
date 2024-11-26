import { Avatar, Badge, Button, Group, Text } from "@mantine/core";

import React from "react";

interface Game {
  date: string;
  time: string;
  title: string;
  avatars: string[];
  blinds: string;
  minBuyIn: string;
  token: string;
  type: string;
  status: string;
}

interface LobbyCardProps {
  game: Game;
}

interface LobbyCardsProps {
  games: Game[];
}

const LobbyCard: React.FC<LobbyCardProps> = ({ game }) => {
  return (
    <div className="flex w-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-lg sm:w-[calc(50%-20px)] lg:w-[calc(25%-20px)] xl:w-[calc(23%-20px)] dark:border-gray-700 dark:bg-gray-800">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <Text className="text-sm text-gray-600 dark:text-gray-300">
          {game.date} {game.time}
        </Text>
        <Badge
          color={game.status === "Playing Now" ? "green" : "gray"}
          size="sm">
          {game.status}
        </Badge>
      </div>

      {/* Title */}
      <Text className="mt-2 text-lg font-bold text-gray-800 dark:text-gray-100">
        {game.title}
      </Text>

      {/* Avatar Section */}
      <div className="mt-3 flex items-center space-x-2">
        {game.avatars.map((avatar, index) => (
          <Avatar key={index} src={avatar} alt="Player avatar" size="sm" />
        ))}
      </div>

      {/* Game Details */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
        <div>
          <Text>Small/Big Blind</Text>
          <Text className="font-semibold text-gray-800 dark:text-gray-100">
            {game.blinds}
          </Text>
        </div>
        <div>
          <Text>Min Buy In</Text>
          <Text className="font-semibold text-gray-800 dark:text-gray-100">
            {game.minBuyIn}
          </Text>
        </div>
        <div>
          <Text>Token</Text>
          <Text className="font-semibold text-gray-800 dark:text-gray-100">
            {game.token}
          </Text>
        </div>
        <div>
          <Text>Type</Text>
          <Badge color="pink">{game.type}</Badge>
        </div>
      </div>

      {/* Buttons */}
      <Group mt="4">
        <Button variant="outline" color="blue" fullWidth>
          Share
        </Button>
        <Button variant="filled" color="purple" fullWidth>
          Play
        </Button>
      </Group>
    </div>
  );
};

const LobbyCards: React.FC<LobbyCardsProps> = ({ games }) => {
  return (
    // <div className="m-2 flex w-full flex-wrap gap-4">
    <>
      {games.map((game, index) => (
        <LobbyCard key={index} game={game} />
      ))}
      {/* // </div> */}
    </>
  );
};

export default LobbyCards;
