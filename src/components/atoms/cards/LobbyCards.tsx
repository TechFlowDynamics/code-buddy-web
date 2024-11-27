import { Avatar, Badge, Button, Group, Indicator, Text } from "@mantine/core";

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
    <div className="flex w-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-lg md:w-[calc(50%-20px)] lg:w-[calc(50%-20px)] xl:w-[calc(23%-20px)] dark:border-gray-700 dark:bg-gray-800">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <Text className="text-sm text-gray-600 dark:text-gray-300">
          {game.date} {game.time}
        </Text>
        {game.status === "Live" ? (
          <Indicator
            processing
            inline
            size={14}
            className="border-2 !border-transparent">
            <Badge
              className="m-0 mt-0"
              color={game.status === "Live" ? "green" : "gray"}
              size="lg">
              <span>{game.status}</span>
            </Badge>
          </Indicator>
        ) : (
          <Badge
            color={game.status === "Live" ? "green" : "gray"}
            size="lg"
            className="flex">
            <span>{game.status}</span>
          </Badge>
        )}
      </div>

      {/* Title */}
      <Text className="mt-2 text-lg font-bold text-gray-800 dark:text-gray-100">
        {game.title}
      </Text>

      {/* Avatar Section */}
      <div className="mt-3 flex items-center -space-x-2">
        <Avatar.Group spacing="xs">
          {game.avatars.slice(0, 4).map((avatar, index) => (
            <Avatar
              src={avatar}
              alt="Player avatar"
              radius="xl"
              size="md"
              key={index}
            />
          ))}
          {game.avatars.length - 4 > 0 && (
            <Avatar radius="xl">+{game.avatars.length - 4}</Avatar>
          )}
        </Avatar.Group>
      </div>

      {/* Game Details */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
        <div>
          <Text>Joined</Text>
          <Text className="font-semibold text-gray-800 dark:text-gray-100">
            {game.blinds}
          </Text>
        </div>
        <div>
          <Text>Lobby Size</Text>
          <Text className="font-semibold text-gray-800 dark:text-gray-100">
            {game.minBuyIn}
          </Text>
        </div>
        <div>
          <Text>Credits</Text>
          <Text className="font-semibold text-gray-800 dark:text-gray-100">
            {game.token}
          </Text>
        </div>
        <div>
          <Text>Type</Text>
          <Badge
            variant={game.type === "Global" ? "outline" : "gradient"}
            color={game.type === "Global" ? "pink" : "blue"}>
            {game.type}
          </Badge>
        </div>
      </div>

      {/* Buttons */}
      <Group mt="4">
        <Button variant="outline" color="blue" fullWidth>
          View
        </Button>
        <Button variant="filled" color="violet" fullWidth>
          Join
        </Button>
      </Group>
    </div>
  );
};

const LobbyCards: React.FC<LobbyCardsProps> = ({ games }) => {
  return (
    <>
      {games.map((game, index) => (
        <LobbyCard key={index} game={game} />
      ))}
    </>
  );
};

export default LobbyCards;
