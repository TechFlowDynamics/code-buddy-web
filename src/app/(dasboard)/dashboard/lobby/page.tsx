"use client";

import { Button } from "@mantine/core";
import { v4 as uuid } from "uuid";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import useScroll from "@/hooks/useScroll";

import { useRoomHandler } from "@/actions/room.actions";

import staticConstant from "@/core/constants/static.constant";
import { RoomType } from "@/core/interface/room.interface";

import LobbyCards from "@/components/atoms/cards/LobbyCards";
import SelectDropdown from "@/components/atoms/dropdown/SelectDropdown";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">{title}</h2>
        {children}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-800">
          ✖
        </button>
      </div>
    </div>
  );
};

const Lobby = () => {
  const scrolled = useScroll();
  const router = useRouter();

  const [lobbyType, setLobbyType] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  const { handlerCreateRoom, handlerJoinRoom } = useRoomHandler();

  const [formData, setFormData] = useState({
    roomName: "",
    questionIds: "",
    type: "public",
    roomSize: 0,
    credits: "",
    startTime: "",
    endTime: "",
  });

  const [roomCode, setRoomCode] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Prepare the payload
      const payload = {
        roomName: formData.roomName,
        questionIds: formData.questionIds.split(",").map(id => id.trim()),
        type: formData.type as RoomType,
        roomSize: Number(formData.roomSize),
        credits: formData.credits,
        startTime: new Date(formData.startTime),
        endTime: new Date(formData.endTime),
      };

      await handlerCreateRoom(payload);

      alert("Lobby created successfully!");

      // Redirect to the room page
      router.push("/dashboard/room");

      // Reset form and close modal
      setFormData({
        roomName: "",
        questionIds: "",
        type: "public",
        roomSize: 0,
        credits: "",
        startTime: "",
        endTime: "",
      });
      setIsCreateOpen(false);
    } catch (error) {
      console.error("Error creating lobby:", error);
      alert(error || "An error occurred while creating the lobby.");
    }
  };

  const handleJoinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roomCode.length !== 6) {
      alert("Join code must be exactly 6 characters.");
      return;
    }

    try {
     
      const payload = {
        roomCode: roomCode,
      };
      const response = await handlerJoinRoom(payload);
      
      if (response) {
        router.push(`/dashboard/room/${roomCode}`);
      }
    } catch (error) {
      console.error("Error joining room:", error);
      alert(error || "An error occurred while joining the lobby.");
    }
  };

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
            onChange={value => setLobbyType(value)}
          />
        </div>
        <div className="m-2 flex w-full justify-center gap-4 md:justify-end">
          <Button
            onClick={() => setIsJoinOpen(true)}
            variant="outline"
            className="border-yellow-700 text-yellow-700/70 hover:bg-yellow-400/60 hover:text-yellow-800/70 dark:text-yellow-200 dark:hover:bg-yellow-600/40 dark:hover:text-darkText">
            Join with Code
          </Button>
          <Button
            onClick={() => setIsCreateOpen(true)}
            className="bg-green-700/70 text-darkText hover:bg-green-400/60 hover:text-green-800/70 dark:text-green-200 dark:hover:bg-green-500/70 dark:hover:text-darkText">
            Create
          </Button>
        </div>
      </div>

      {/* Modal for Joining Lobby */}
      <Modal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        title="Join a Lobby">
        <form onSubmit={handleJoinSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Join Code</label>
            <input
              type="text"
              value={roomCode}
              onChange={e => setRoomCode(e.target.value.toUpperCase())}
              maxLength={6}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500"
              placeholder="Enter 6-character join code"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsJoinOpen(false)}
              className="rounded bg-gray-300 px-4 py-2 text-gray-800">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white">
              Join Lobby
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create a Lobby">
        <h2 className="mb-4 text-lg font-bold">Create a Lobby</h2>
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Lobby Name</label>
            <input
              type="text"
              name="roomName"
              value={formData.roomName}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500"
              placeholder="Enter lobby name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Question IDs</label>
            <input
              type="text"
              name="questionIds"
              value={formData.questionIds}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500"
              placeholder="Comma-separated question IDs"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Room Size</label>
            <input
              type="number"
              name="roomSize"
              value={formData.roomSize}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500"
              placeholder="Enter room size"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Credits</label>
            <input
              type="text"
              name="credits"
              value={formData.credits}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500"
              placeholder="Enter credits (e.g., USD)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">End Time</label>
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="rounded bg-gray-300 px-4 py-2 text-gray-800">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white">
              Create Lobby
            </button>
          </div>
        </form>
      </Modal>

      <div className="mx-0 mb-0 mt-[5%] flex h-[75vh] w-full flex-wrap justify-evenly gap-2 overflow-y-scroll rounded-xl border-2 border-dashed border-gray-500 p-2 md:gap-10">
        {Array.from({ length: 5 }).map(() => (
          <LobbyCards games={staticConstant.PRIVATE_LOBBY} key={uuid()} />
        ))}
      </div>
    </div>
  );
};

export default Lobby;
