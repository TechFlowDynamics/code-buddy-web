"use client";

import React, { useEffect, useState } from "react";
import { Client, Databases, ID } from "appwrite";

// Define constants
const PROJECT_ID = "678ca53800214a472c3d";
const DATABASE_ID = "678ca9f50033014018f9";
const COLLECTION_ID_MESSAGES = "678caa0c0018dfb97016";

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const databases = new Databases(client);

// Define types
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

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      (response) => {
        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
          setMessages((prevMessages) => [...prevMessages, response.payload as Message]);
        }
      }
    );

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await databases.listDocuments<Message>(DATABASE_ID, COLLECTION_ID_MESSAGES);
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
            //add room oid
          }
        );
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="mb-4 h-64 overflow-y-auto border p-2">
        {messages.map((msg) => (
          <div key={msg.$id} className="mb-2">
            <strong>{msg.userName}</strong>: {msg.body}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="mr-2 flex-1 border p-2"
        />
        <button
          onClick={sendMessage}
          className="rounded bg-blue-500 px-4 py-2 text-white"
          disabled={!user}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Page;
