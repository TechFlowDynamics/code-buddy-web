import { useState, useCallback } from 'react';
// import { databases } from '../config/appwrite';
// import { DATABASE_ID, COLLECTION_ID_MESSAGES } from '../config/constants';
// import { Message } from '../types';
import { Query } from 'appwrite';
import { databases } from '@/features/appwrite';
import { Message } from '@/core/interface/room.interface';
import { COLLECTION_ID_MESSAGES, DATABASE_ID } from '@/core/constants/appwriteConstants';

export const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState<Record<string, string>>({});

  const storeUserDetails = useCallback((userId: string, userName: string) => {
    try {
      localStorage.setItem(`user_${userId}`, JSON.stringify({ userId, userName }));
    } catch (error) {
      console.error('Error storing user details:', error);
    }
  }, []);

  const fetchUserDetails = useCallback(async (roomId: string, roomUsers?: string[]) => {
    try {
      const userMap: Record<string, string> = {};

      // Get current user's details
      const storedData = localStorage.getItem("loginDetails");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        userMap[parsedData.data.userId] = parsedData.data.userName;
        storeUserDetails(parsedData.data.userId, parsedData.data.userName);
      }

      // Fetch messages for user details
      const response = await databases.listDocuments<Message>(
        DATABASE_ID,
        COLLECTION_ID_MESSAGES,
        [Query.equal("roomId", roomId)]
      );

      response.documents.forEach(msg => {
        if (msg.userId !== "system" && !userMap[msg.userId]) {
          userMap[msg.userId] = msg.userName;
          storeUserDetails(msg.userId, msg.userName);
        }
      });

      // Get stored details for room users
      roomUsers?.forEach(userId => {
        if (!userMap[userId]) {
          const storedUserData = localStorage.getItem(`user_${userId}`);
          if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            userMap[userId] = userData.userName;
          }
        }
      });

      setUserDetails(userMap);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }, [storeUserDetails]);

  return {
    userDetails,
    setUserDetails,
    storeUserDetails,
    fetchUserDetails,
  };
};