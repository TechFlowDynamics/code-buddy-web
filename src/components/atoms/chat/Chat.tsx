"use client";

import { Client, Databases, ID, Query } from "appwrite";
import { useEffect, useState, useCallback } from "react";

// const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID as string;
// const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID as string;
// const COLLECTION_ID_MESSAGES = process.env.NEXT_PUBLIC_COLLECTION_ID_MESSAGES as string;


const PROJECT_ID = "678ca53800214a472c3d";
const DATABASE_ID = "678ca9f50033014018f9";
 const COLLECTION_ID_MESSAGES = "678caa0c0018dfb97016";
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);
const databases = new Databases(client);

interface ChatProps {
  roomId: string;
  onExit: () => Promise<void>;
}

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

const Chat = ({ roomId, onExit }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<UserData | null>(null);

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
        await onExit();
      }, 500);
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Room Header */}
      <div className="flex items-center justify-between border-b border-gray-800 p-4">
        <h3 className="font-semibold">Chat</h3>
        <button
          onClick={exitRoom}
          className="rounded bg-red-500 px-3 py-1 text-sm hover:bg-red-600">
          Leave
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">
            No messages yet. Start the conversation!
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.$id}
              className={`mb-2 ${
                msg.isSystem
                  ? "text-center italic text-gray-500"
                  : msg.userId === user?.userId
                  ? "ml-auto bg-[#1e4d8f]"
                  : "bg-[#2d2d2d]"
              } rounded p-2 max-w-[80%]`}
            >
              {!msg.isSystem && (
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-gray-300">{msg.userName}</strong>
                  <span className="text-xs text-gray-500">
                    {new Date(msg.$createdAt).toLocaleTimeString()}
                  </span>
                </div>
              )}
              <span className="text-gray-200 break-words">{msg.body}</span>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 rounded bg-[#2d2d2d] px-3 py-2 text-gray-300 placeholder-gray-500"
          />
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="rounded bg-[#0a84ff] px-4 py-2 hover:bg-[#0074e4] disabled:opacity-50 disabled:cursor-not-allowed">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;