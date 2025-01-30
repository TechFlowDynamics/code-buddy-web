"use client";

import { Client, Databases, ID, Query } from "appwrite";

import React, { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useRoomHandler } from "@/actions/room.actions";

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
};

type UserData = {
  userId: string;
  userName: string;
  roomCode: string;
};

const Page = () => {
  const router = useRouter();
  const { roomId } = useParams() as { roomId: string };
  const { handlerGetRoom } = useRoomHandler(roomId);

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<UserData | null>(null);
  const [accessGranted, setAccessGranted] = useState<boolean | null>(null);

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

  // Verify room access before allowing entry
  useEffect(() => {
    const verifyAccess = async () => {
      if (!user) return;

      const loginDetails = localStorage.getItem("loginDetails");

      if (loginDetails) {
        const parsedData = JSON.parse(loginDetails);
        console.log("token", parsedData);
      }

      try {
        const res = await handlerGetRoom(roomId);
        console.log("response ressss", res);
        if (res) {
          setAccessGranted(true);
        } else {
          setAccessGranted(false);
        }
      } catch (error) {
        console.error("Error verifying room access:", error);
        setAccessGranted(false);
      }
    };

    if (user) {
      verifyAccess();
    }
  }, [user, roomId, router]);

  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      response => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create",
          )
        ) {
          setMessages(prevMessages => [
            ...prevMessages,
            response.payload as Message,
          ]);
        }
      },
    );

    return () => unsubscribe();
  }, []);

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
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
    };

    fetchMessages();
  }, []);

  // Handle sending a new message
  const sendMessage = async () => {
    if (message.trim() && user) {
      try {
        await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID_MESSAGES,
          ID.unique(),
          {
            userId: user.userId,
            userName: user.userName,
            body: message,
            roomId: roomId,
          },
        );

        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Chat Room: {roomId}</h1>

      <div className="mb-4 h-64 overflow-y-auto border p-2">
        {messages.map(msg => (
          <div key={msg.$id} className="mb-2">
            <strong>{msg.userName}</strong>: {msg.body}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="mr-2 flex-1 border p-2"
        />
        <button
          onClick={sendMessage}
          className="rounded bg-blue-500 px-4 py-2 text-white"
          disabled={!user}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Page;
