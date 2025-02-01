import LobbyCards from "../cards/LobbyCards";
import React, { useEffect, useMemo, useState } from "react";
import { useGetRoomsQuery } from "@/api/rooms/roomApiSlice";
import { IRoom } from "@/core/interface/room.interface";

const RoomsLobby: React.FC = () => {
  const [page, setPage] = useState(1);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  // Fetch rooms for the current page
  const { data, error, isLoading } = useGetRoomsQuery({ page, limit: 10 });

  useEffect(() => {
    if (data?.rooms) {
      setRooms(data.rooms); // ✅ Replace old rooms instead of appending
      setTotalPages(data.pagination?.totalPages || null);
    }
  }, [data]); // ✅ Ensure rooms are replaced with each new fetch

  // Function to load more rooms
  const loadMoreRooms = () => {
    if (totalPages && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  // Transform room data for UI
  const games = useMemo(() => {
    return rooms.map((room: IRoom) => ({
      date: new Date(room.startTime).toLocaleDateString(),
      time: new Date(room.startTime).toLocaleTimeString(),
      title: room.roomName,
      avatars: room.users
        ? room.users.map(() => "https://via.placeholder.com/40")
        : [],
      blinds: `${room.users ? room.users.length : 0} Joined`,
      minBuyIn: String(room.roomSize),
      token: room.credits,
      type: room.type,
      status: room.status ?? "N/A",
    }));
  }, [rooms]);

  console.log("RoomsLobby (Processed Games)", games);

  if (isLoading && page === 1) return <div>Loading rooms...</div>;
  if (error) return <div>Error fetching rooms.</div>;

  return (
    <div className="flex w-full flex-col items-center">
      <LobbyCards games={games} />

      {/* Load More Button */}
      {totalPages && page < totalPages && (
        <button
          onClick={loadMoreRooms}
          disabled={isLoading}
          className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default RoomsLobby;
