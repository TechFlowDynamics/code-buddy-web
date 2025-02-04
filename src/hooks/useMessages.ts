import { useState, useCallback } from 'react';
// import { databases, client } from '../config/appwrite';
// import { DATABASE_ID, COLLECTION_ID_MESSAGES } from '../config/constants';
// import { Message, UserData } from '../types';
import { ID, Query } from 'appwrite';
import { Message, UserData } from '@/core/interface/room.interface';
import { COLLECTION_ID_MESSAGES, DATABASE_ID } from '@/core/constants/appwriteConstants';
import { client, databases } from '@/features/appwrite';

export const useMessages = (roomId: string, user: UserData | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

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

  const sendMessage = async (storeUserDetails: (userId: string, userName: string) => void) => {
    if (!message.trim() || !user) return;
    try {
      storeUserDetails(user.userId, user.userName);
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

  const subscribeToMessages = useCallback(() => {
    return client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      (response) => {
        const newMessage = response.payload as Message;
        if (newMessage && newMessage.roomId === roomId) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      },
    );
  }, [roomId]);

  return {
    messages,
    setMessages,
    message,
    setMessage,
    fetchMessages,
    sendMessage,
    subscribeToMessages,
  };
};