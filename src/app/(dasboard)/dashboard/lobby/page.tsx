"use client";

import { Button } from "@mantine/core";

import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import useScroll from "@/hooks/useScroll";

import { useRoomHandler } from "@/actions/room.actions";

import {
  ICreateRoomResponse,
  IJoinRoom,
  IJoinRoomResponse,
  RoomType,
} from "@/core/interface/room.interface";

import SelectDropdown from "@/components/atoms/dropdown/SelectDropdown";
import RoomsLobby from "@/components/atoms/roomsLobby/RoomsLobby";

// Import the RoomsLobby component
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}>
      <div
        className="relative w-full max-w-lg transform rounded-xl bg-white shadow-2xl transition-all dark:bg-gray-800"
        onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[80vh] overflow-y-auto rounded-b-xl bg-gray-50 p-6 dark:bg-gray-800">
          {children}
        </div>
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
  const [roomCode, setRoomCode] = useState("");
  const { handlerCreateRoom, handlerJoinRoom } = useRoomHandler();

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const inputClasses =
    "w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 mt-2 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";

  const buttonClasses = {
    primary:
      "px-4 py-2.5 rounded-lg font-medium transition-colors bg-blue-500 hover:bg-blue-600 text-white shadow-sm",
    secondary:
      "px-4 py-2.5 rounded-lg font-medium transition-colors bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white shadow-sm",
  };

  const labelClasses =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
  const searchQuestions = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const response = await fetch(
        `http://localhost:8081/api/v1/questions/get`,
      );
      const data = await response.json();

      // Filter questions based on title or content matching the query
      const filteredQuestions = data.data.filter(
        (question: any) =>
          question.title.toLowerCase().includes(query.toLowerCase()) ||
          question.content.toLowerCase().includes(query.toLowerCase()),
      );

      setSearchResults(filteredQuestions);
    } catch (error) {
      console.error("Error searching questions:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Replace the existing questionIds input with this:
  const [formData, setFormData] = useState({
    roomName: "",
    questionIds: "", // This will store the IDs
    questionTitles: "", // This will show the titles in the input
    type: "public",
    roomSize: 0,
    credits: "",
    startTime: "",
    endTime: "",
  });

  // Search function remains the same...
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input

  const questionIdsInput = (
    <div className="relative">
       <label className={labelClasses}>Questions</label>
      <input
        type="text"
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value);
          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
          }
          searchTimeoutRef.current = setTimeout(() => {
            searchQuestions(e.target.value);
          }, 500);
        }}
        className={`${inputClasses} pr-10`}
        placeholder="Search for questions..."
      />

      {/* Selected Questions Display */}
      {formData.questionTitles && (
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.questionTitles.split(",").map((title, index) => (
            <div
              key={index}
              className="flex items-center rounded bg-blue-100 px-2 py-1 text-sm text-blue-800">
              <span>{title.trim()}</span>
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="ml-2 text-blue-600 hover:text-blue-800">
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {isSearching && (
        <div className="absolute right-3 top-9">
          <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-gray-900"></div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {searchResults.length > 0 && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {searchResults.map((question: any) => (
            <div
              key={question.title}
              className="cursor-pointer border-b border-gray-200 px-4 py-3 hover:bg-gray-50 last:border-b-0"
              onClick={() => {
                const currentIds = formData.questionIds
                  ? formData.questionIds.split(",").map(id => id.trim())
                  : [];
                const currentTitles = formData.questionTitles
                  ? formData.questionTitles.split(",").map(title => title.trim())
                  : [];

                if (!currentTitles.includes(question.title)) {
                  const newIds = [...currentIds, question.title];
                  const newTitles = [...currentTitles, question.title];
                  setFormData(prev => ({
                    ...prev,
                    questionIds: newIds.join(", "),
                    questionTitles: newTitles.join(", "),
                  }));
                }

                setSearchTerm("");
                setSearchResults([]);
              }}>
              <div className="font-medium text-gray-900">{question.title}</div>
              <div className="text-sm text-gray-600">
                Difficulty: {question.difficulty}
              </div>
              <div className="truncate text-xs text-gray-500">
                {question.content.replace(/<[^>]*>/g, "").substring(0, 100)}...
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Function to remove a question
  const removeQuestion = (indexToRemove: number) => {
    const ids = formData.questionIds.split(",").map(id => id.trim());
    const titles = formData.questionTitles
      .split(",")
      .map(title => title.trim());

    ids.splice(indexToRemove, 1);
    titles.splice(indexToRemove, 1);

    setFormData(prev => ({
      ...prev,
      questionIds: ids.join(", "),
      questionTitles: titles.join(", "),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Convert comma-separated IDs string to array, remove whitespace and empty strings
      const questionIdsArray = formData.questionIds
        .split(",")
        .map(id => id.trim())
        .filter(Boolean); // Remove empty strings

      // Log the array to verify it's not empty
      console.log("Question IDs Array:", questionIdsArray);

      // Validate that we have at least one question ID
      if (questionIdsArray.length === 0) {
        throw new Error("Please select at least one question");
      }

      const payload = {
        roomName: formData.roomName,
        questionIds: questionIdsArray,
        type: formData.type as RoomType,
        roomSize: Number(formData.roomSize),
        credits: formData.credits,
        startTime: new Date(formData.startTime),
        endTime: new Date(formData.endTime),
      };

      // Log the payload to verify the structure
      console.log("Payload:", payload);

      const response = (await handlerCreateRoom(payload)) as
        | ICreateRoomResponse
        | undefined;

      const { room } = response || {};
      if (response?.statusCode === 200) {
        router.push(`/room/${room?.roomCode}`);
      }

      // Reset form and close modal
      setFormData({
        roomName: "",
        questionIds: "",
        questionTitles: "",
        type: "public",
        roomSize: 0,
        credits: "",
        startTime: "",
        endTime: "",
      });
      setIsCreateOpen(false);
    } catch (error) {
      console.error("Error creating lobby:", error);
      // Add user feedback here
      alert(error instanceof Error ? error.message : "Failed to create lobby");
    }
  };
  const handleJoinSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      const payload: IJoinRoom = {
        roomCode,
        message: "",
      };
      const response = (await handlerJoinRoom(payload)) as
        | IJoinRoomResponse
        | undefined;

      if (!response) {
        throw new Error("No response received from the server.");
      }

      if (response.status === "success" && response.room) {
        const { room } = response;
        router.push(`/room/${room.roomCode}`);
      } else {
        throw new Error(response?.message || "Failed to join the room.");
      }
    } catch (error: any) {
      console.error("Error joining room:", error);
      throw new Error(error.message);
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
        <form className="space-y-4">
          <div>
            {/* <label className="block text-sm font-medium">Join Code</label> */}
            <input
              type="text"
              value={roomCode}
              onChange={e => setRoomCode(e.target.value.toUpperCase())}
              maxLength={6}
              required
              className={inputClasses}
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
              onClick={e => handleJoinSubmit(e)}
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white">
              Join Lobby
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal for Creating Lobby */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create a Lobby">
        {/* <h2 className="mb-4 text-lg font-bold">Create a Lobby</h2> */}
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Lobby Name</label>
            <input
              type="text"
              name="roomName"
              value={formData.roomName}
              onChange={handleChange}
              required
             className={inputClasses}
              placeholder="Enter lobby name"
            />
          </div>
          <div>
            
            {questionIdsInput}
          </div>
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
             className={inputClasses}>
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
             className={inputClasses}
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
             className={inputClasses}
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
             className={inputClasses}
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
             className={inputClasses}
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

      {/* Replace static dummy cards with dynamic RoomsLobby */}
      <div className="mx-auto mb-0 mt-[5%] flex w-full max-w-6xl flex-wrap justify-center gap-4 overflow-y-scroll rounded-xl border-2 border-dashed border-gray-500 p-4 md:gap-6">
        <RoomsLobby />
      </div>
    </div>
  );
};

export default Lobby;
