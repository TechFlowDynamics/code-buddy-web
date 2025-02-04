"use client";

import { useEffect, useRef, useState } from "react";
import { ID } from "appwrite";
import { ChatProps, Score, Scores, UserData } from "@/core/interface/room.interface";
import { useMessages } from "@/hooks/useMessages";
import { useTimer } from "@/hooks/useTimer";
import { useUserDetails } from "@/hooks/useUserDetails";
import { databases } from "@/features/appwrite";
import { COLLECTION_ID_MESSAGES, DATABASE_ID } from "@/core/constants/appwriteConstants";
import { Header } from "./Header";
import { Scoreboard } from "./Scoreboard";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { useGetUsersByIdsQuery } from '@/features/apiSlice';

const Chat = ({ roomId, onExit, roomData }: ChatProps) => {
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // State
  const [user, setUser] = useState<UserData | null>(null);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [scores, setScores] = useState<Scores>({});

  // Custom Hooks
  const { messages, message, setMessage, fetchMessages, sendMessage, subscribeToMessages } = 
    useMessages(roomId, user);
  const { userDetails, storeUserDetails, fetchUserDetails } = useUserDetails();
  const timeLeft = useTimer(roomData.endTime);

  // Load user data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("loginDetails");
    if (storedData) {
      try {
        const parsedData: { data: UserData } = JSON.parse(storedData);
        setUser(parsedData.data);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  // Initialize scores
  useEffect(() => {
    const initialScores: Scores = {};
    roomData.users?.forEach(userId => {
      const questionScores: Record<string, Score> = {};
      
      roomData.questionIds.forEach(qId => {
        questionScores[qId] = {
          score: 0,
          bonus: 0,
          status: 'pending' as const
        };
      });

      initialScores[userId] = {
        questions: questionScores,
        totalScore: 0,
        totalBonus: 0
      };
    });
    setScores(initialScores);
  }, [roomData.users, roomData.questionIds]);

  // Set up WebSocket subscription
  useEffect(() => {
    const unsubscribe = subscribeToMessages();
    return () => {
      unsubscribe();
    };
  }, [subscribeToMessages]);

  // Fetch initial messages and user details
  useEffect(() => {
    fetchMessages();
    fetchUserDetails(roomId, roomData.users);
  }, [fetchMessages, fetchUserDetails, roomId, roomData.users]);

  // Send join message
  useEffect(() => {
    const sendJoinMessage = async () => {
      if (!user) return;
      try {
        await databases.createDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, ID.unique(), {
          userId: user.userId,
          userName: user.userName,
          body: `${user.userName} joined the chat`,
          roomId: roomId,
          isSystem: true,
        });
      } catch (error) {
        console.error("Error sending join message:", error);
      }
    };

    sendJoinMessage();
  }, [user, roomId]);

  // Handle exit room
  const exitRoom = async () => {
    if (!user) return;
    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, ID.unique(), {
        userId: "system",
        userName: "System",
        body: `${user.userName} has left the chat.`,
        roomId: roomId,
        isSystem: true,
      });

      setTimeout(async () => {
        await onExit();
      }, 500);
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };

  // Handle message sending
  const handleSendMessage = () => {
    sendMessage(storeUserDetails);
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-white">
      <Header roomName={roomData.roomName} />

      <div className="px-4 py-2 text-sm text-gray-400">
        {roomData.users?.length || 1} players
      </div>

      <button
        onClick={() => setShowScoreboard(true)}
        className="mx-4 mb-2 p-3 bg-[#2b2b2b] hover:bg-[#323232] rounded flex items-center justify-between"
      >
        <span className="text-gray-200">Scoreboard</span>
        <span>📊</span>
      </button>

      <Scoreboard
        show={showScoreboard}
        onClose={() => setShowScoreboard(false)}
        roomData={roomData}
        scores={scores}
        userDetails={userDetails}
      />

      <div className="mx-4 mb-2 p-3 bg-[#006d5b] rounded flex items-center gap-2">
        <span>⏱️</span>
        <span>Round ends in {timeLeft}</span>
      </div>

      <button
        onClick={exitRoom}
        className="mx-4 mb-2 p-3 bg-red-900/30 hover:bg-red-900/40 rounded flex items-center justify-center gap-2 text-red-400"
      >
        <span>Leave Room</span>
      </button>

      <MessageList messages={messages} messagesEndRef={messagesEndRef} />
      
      <MessageInput
        message={message}
        setMessage={setMessage}
        sendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Chat;