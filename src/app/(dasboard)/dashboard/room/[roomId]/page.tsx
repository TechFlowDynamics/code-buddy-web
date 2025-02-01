"use client";

import { Client, Databases, ID, Query } from "appwrite";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useRoomQueryHandler } from "@/actions/room.actions";
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID as string;
const COLLECTION_ID_MESSAGES = process.env
  .NEXT_PUBLIC_COLLECTION_ID_MESSAGES as string;




const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);
const databases = new Databases(client);

type Message = {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  userId: string;
  userName: string;
  body: string;
  isSystem?: boolean;
  roomId: string;
};

type UserData = {
  userId: string;
  userName: string;
  roomId: string;
};

const Page = () => {
  const router = useRouter();
  const { roomId } = useParams() as { roomId: string };
  const { handlerVerifyRoom, handlerExitRoom } = useRoomQueryHandler(roomId);

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<UserData | null>(null);
  const [accessGranted, setAccessGranted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  // Verify room access and handle join/exit messages
  const verifyAccess = useCallback(async () => {
    if (!user) return;

    try {
      const res = await handlerVerifyRoom(roomId);
      if (res) {
        setAccessGranted(true);

        const [lastExitResponse, lastJoinResponse] = await Promise.all([
          databases.listDocuments<Message>(DATABASE_ID, COLLECTION_ID_MESSAGES, [
            Query.equal("roomId", roomId),
            Query.equal("userId", "system"),
            Query.search("body", `${user.userName} has left the chat.`),
            Query.orderDesc("$createdAt"),
            Query.limit(1),
          ]),
          databases.listDocuments<Message>(DATABASE_ID, COLLECTION_ID_MESSAGES, [
            Query.equal("roomId", roomId),
            Query.equal("userId", "system"),
            Query.search("body", `${user.userName} has joined the chat.`),
            Query.orderDesc("$createdAt"),
            Query.limit(1),
          ]),
        ]);

        const lastExitTime = lastExitResponse.documents.length
          ? new Date(lastExitResponse.documents[0].$createdAt).getTime()
          : 0;
        const lastJoinTime = lastJoinResponse.documents.length
          ? new Date(lastJoinResponse.documents[0].$createdAt).getTime()
          : 0;

        if (!lastJoinTime || lastExitTime > lastJoinTime || Date.now() - lastJoinTime > 10000) {
          await databases.createDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, ID.unique(), {
            userId: "system",
            userName: "System",
            body: `${user.userName} has joined the chat.`,
            roomId: roomId,
            isSystem: true,
          });
        }
      } else {
        setAccessGranted(false);
      }
    } catch (error) {
      console.error("Error verifying room access:", error);
      setAccessGranted(false);
    } finally {
      setIsLoading(false);
    }
  }, [user, roomId, handlerVerifyRoom]);

  useEffect(() => {
    if (user) {
      verifyAccess();
    }
  }, [user, verifyAccess]);

  // Fetch messages for the current room
  const fetchMessages = useCallback(async () => {
    try {
      const response = await databases.listDocuments<Message>(
        DATABASE_ID,
        COLLECTION_ID_MESSAGES,
        [Query.equal("roomId", roomId)],
      );
      setMessages(response.documents);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  }, [roomId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Subscribe to WebSocket for real-time updates
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const subscribeToMessages = async () => {
      try {
        unsubscribe = client.subscribe(
          `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
          (response) => {
            const newMessage = response.payload as Message;
            if (newMessage && newMessage.roomId === roomId) {
              setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
          },
        );
      } catch (error) {
        console.error("WebSocket subscription error:", error);
      }
    };

    subscribeToMessages();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [roomId]);

  // Handle sending a new message
  const sendMessage = async () => {
    if (!message.trim() || !user) return;
    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, ID.unique(), {
        userId: user.userId,
        userName: user.userName,
        body: message,
        roomId,
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle exiting the room
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
        const response = await handlerExitRoom(roomId);
        if (response) router.push("/dashboard/lobby");
      }, 500);
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (accessGranted === false) {
    return <div className="flex h-screen items-center justify-center">Access Denied</div>;
  }

  return (
    <div className="flex h-screen flex-col bg-gray-100 p-6 dark:bg-gray-900">
      {/* Chat Room Header */}
      <div className="flex items-center justify-between rounded-t-lg bg-blue-600 p-4 text-white shadow-md">
        <h1 className="text-lg font-semibold">Chat Room: {roomId}</h1>
        <button
          onClick={exitRoom}
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Leave Room
        </button>
      </div>

      {/* Chat Messages */}
      <div className="mt-2 flex-1 overflow-y-auto rounded-lg border border-gray-300 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.$id}
              className={`mb-2 rounded-lg p-2 ${
                msg.isSystem
                  ? "text-center italic text-gray-500"
                  : msg.userId === user?.userId
                  ? "ml-auto bg-blue-500 text-white"
                  : "bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
              } w-max max-w-xs`}
            >
              {!msg.isSystem && (
                <strong className="block text-sm text-gray-800 dark:text-gray-300">
                  {msg.userName}
                </strong>
              )}
              {msg.body}
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border border-gray-400 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:focus:ring-blue-600"
        />
        <button
          onClick={sendMessage}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Page;