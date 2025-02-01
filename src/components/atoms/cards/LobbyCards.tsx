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
    <div className="relative w-full max-w-sm min-h-[270px] flex flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-lg dark:border-gray-700 dark:bg-gray-800">

      {/* Status Badge Indicator (Active / Inactive) */}
      <div className="absolute top-2 right-2">
        {game.status === "active" ? (
          <Indicator processing inline size={12} zIndex={10} className="border border-gray-600">
            <Badge color="green" size="md">{game.status}</Badge>
          </Indicator>
        ) : (
          <Badge color="gray" size="md">{game.status}</Badge>
        )}
      </div>

      {/* Header Section */}
      <Text className="text-sm text-gray-600 dark:text-gray-300">
        {game.date} {game.time}
      </Text>

      {/* Lobby Name */}
      <Text className="mt-2 text-lg font-bold text-gray-800 dark:text-gray-100">
        {game.title}
      </Text>

      {/* Avatar Section */}
      <div className="mt-3 flex items-center">
        <Avatar.Group spacing="xs">
          {game.avatars.slice(0, 4).map((avatar, index) => (
            <Avatar src={avatar} alt="Player avatar" radius="xl" size="md" key={index} />
          ))}
          {game.avatars.length - 4 > 0 && (
            <Avatar radius="xl" className="bg-gray-500 text-white">+{game.avatars.length - 4}</Avatar>
          )}
        </Avatar.Group>
      </div>

      {/* Game Details */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
        <div>
          <Text>Joined</Text>
          <Text className="font-semibold text-gray-800 dark:text-gray-100">{game.blinds}</Text>
        </div>
        <div>
          <Text>Lobby Size</Text>
          <Text className="font-semibold text-gray-800 dark:text-gray-100">{game.minBuyIn}</Text>
        </div>
        <div>
          <Text>Credits</Text>
          <Text className="font-semibold text-gray-800 dark:text-gray-100">{game.token}</Text>
        </div>
        <div>
          <Text>Type</Text>
          <Badge variant="outline" color="blue">{game.type}</Badge>
        </div>
      </div>

      {/* Action Buttons */}
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
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6 w-full px-4">
      {games.map((game, index) => (
        <LobbyCard key={index} game={game} />
      ))}
    </div>
  );
};

export default LobbyCards;
