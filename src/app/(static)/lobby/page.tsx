"use client";

import { Button } from "@mantine/core";
import { v4 as uuid } from "uuid";
import React, { useState, useEffect } from "react";
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

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export default function LobbyPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    roomName: "",
    questionIds: "",
    status: "public",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // Update state
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.roomName || !formData.questionIds || !formData.startTime || !formData.endTime) {
      alert("All fields are required!");
      return;
    }

    // Format data for request
    const payload = {
      roomName: formData.roomName,
      questionIds: formData.questionIds.split(",").map((id) => id.trim()),
      status: formData.status,
      startTime: new Date(formData.startTime).toISOString(),
      endTime: new Date(formData.endTime).toISOString(),
    };


    try {
      const response = await fetch("http://localhost:8081/api/v1/room/createroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
       
        alert("Lobby created successfully!");
        setIsOpen(false);
        setFormData({
          roomName: "",
          questionIds: "",
          status: "public",
          startTime: "",
          endTime: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating lobby:", error);
      alert("An error occurred while creating the lobby.");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard/lobby");
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
            className="border-yellow-700 text-yellow-700/70 hover:bg-yellow-400/60 hover:text-yellow-800/70 dark:text-yellow-200 dark:hover:bg-yellow-600/40 dark:hover:text-darkText"
          >
            Join with Code
          </Button>
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-green-700/70 text-darkText hover:bg-green-400/60 hover:text-green-800/70 dark:text-green-200 dark:hover:bg-green-500/70 dark:hover:text-darkText"
          >
            Create
          </Button>
        </div>
      </div>

      {/* Modal for Creating Lobby */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Create a Lobby</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Lobby Name</label>
            <input
              type="text"
              name="roomName"
              value={formData.roomName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-500"
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
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-500"
              placeholder="Comma-separated question IDs"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-500"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-500"
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
              className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 placeholder-gray-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Lobby
            </button>
          </div>
        </form>
      </Modal>

      {/* Lobby Cards */}
      <div className="mx-0 my-4 mt-[6%] flex w-full flex-wrap justify-around gap-8 rounded-xl border-2 border-dashed border-gray-500 p-2 md:gap-10">
        {Array.from({ length: 20 }).map(() => (
          <LobbyCards games={games} key={uuid()} />
        ))}
      </div>
    </div>
  );
}
