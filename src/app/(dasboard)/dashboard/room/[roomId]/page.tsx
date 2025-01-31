"use client";

import { Client, Databases, ID, Query } from "appwrite";

import React, { useEffect, useRef, useState } from "react";

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
};

type UserData = {
  userId: string;
  userName: string;
  roomId: string;
};

const Page = () => {
  const router = useRouter();
  const { roomId } = useParams() as { roomId: string };
  const { handlerGetRoom, handlerExitRoom } = useRoomQueryHandler(roomId);

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

  useEffect(() => {
    const verifyAccess = async () => {
      if (!user) return;
      try {
        const res = await handlerGetRoom(roomId);
        if (res) {
          setAccessGranted(true);

          // Force fetching fresh data before checking timestamps
          await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for Appwrite to sync

          // Fetch the last exit message
          const lastExitResponse = await databases.listDocuments<Message>(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            [
              Query.equal("roomId", roomId),
              Query.equal("userId", "system"),
              Query.search("body", `${user.userName} has left the chat.`),
              Query.orderDesc("$createdAt"),
              Query.limit(1),
            ],
          );

          // Fetch the last join message
          const lastJoinResponse = await databases.listDocuments<Message>(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            [
              Query.equal("roomId", roomId),
              Query.equal("userId", "system"),
              Query.search("body", `${user.userName} has joined the chat.`),
              Query.orderDesc("$createdAt"),
              Query.limit(1),
            ],
          );

          // Convert timestamps
          const lastExitTime = lastExitResponse.documents.length
            ? new Date(lastExitResponse.documents[0].$createdAt).getTime()
            : 0;
          const lastJoinTime = lastJoinResponse.documents.length
            ? new Date(lastJoinResponse.documents[0].$createdAt).getTime()
            : 0;

          // ✅ FIX: Ensure "joined" message appears correctly
          if (
            lastExitTime > 0 &&
            (lastExitTime >= lastJoinTime || lastJoinTime === 0)
          ) {
            await databases.createDocument(
              DATABASE_ID,
              COLLECTION_ID_MESSAGES,
              ID.unique(),
              {
                userId: "system",
                userName: "System",
                body: `${user.userName} has joined the chat.`,
                roomId: roomId,
                isSystem: true,
              },
            );
          }
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

  // useEffect(() => {
  //   const unsubscribe = client.subscribe(
  //     `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
  //     response => {
  //       if (
  //         response.events.includes(
  //           "databases.*.collections.*.documents.*.create",
  //         )
  //       ) {
  //         setMessages(prevMessages => [
  //           ...prevMessages,
  //           response.payload as Message,
  //         ]);
  //       }
  //     },
  //   );

  //   return () => unsubscribe();
  // }, []);

  // Fetch initial messages

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const subscribeToMessages = async () => {
      try {
        // Unsubscribe from previous WebSocket (if exists)
        if (unsubscribe) {
          console.log("DEBUG: Unsubscribing from previous WebSocket.");
          unsubscribe(); // Close old connection
          unsubscribe = null;
        }

        // Establish WebSocket connection
        unsubscribe = client.subscribe(
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
      } catch (error) {
        console.error("WebSocket subscription error:", error);
      }
    };

    subscribeToMessages();

    return () => {
      if (unsubscribe) {
        console.log("DEBUG: Cleaning up WebSocket.");
        try {
          unsubscribe(); // Ensure WebSocket closes when unmounting
        } catch (error) {
          console.error("Error unsubscribing WebSocket:", error);
        }
        unsubscribe = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once

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

  const exitRoom = async () => {
    if (!user) return;
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID_MESSAGES,
        ID.unique(),
        {
          userId: "system",
          userName: "System",
          body: `${user.userName} has left the chat.`,
          roomId: roomId,
          isSystem: true,
        },
      );

      // Wait for message to be created before navigating away
      setTimeout(async () => {
        const response = await handlerExitRoom(roomId);
        if (response) {
          router.push("/dashboard");
        }
      }, 500); // Slight delay to allow message processing
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Chat Room: {roomId}</h1>
      <button
        onClick={exitRoom}
        className="mb-4 rounded bg-red-500 px-4 py-2 text-white">
        Leave Room
      </button>

      <div className="mb-4 h-64 overflow-y-auto border p-2">
        {messages.map(msg => (
          <div
            key={msg.$id}
            className={`mb-2 ${msg.isSystem ? "italic text-gray-500" : ""}`}>
            <strong>{msg.isSystem ? "" : msg.userName}</strong> {msg.body}
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

// "use client";

// import { Client, Databases, ID, Query } from "appwrite";
// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useRoomHandler, useRoomQueryHandler } from "@/actions/room.actions";

// const PROJECT_ID = "678ca53800214a472c3d";
// const DATABASE_ID = "678ca9f50033014018f9";
// const COLLECTION_ID_MESSAGES = "678caa0c0018dfb97016";

// const client = new Client()
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject(PROJECT_ID);

// const databases = new Databases(client);

// // type Message = {
// //   $id: string;
// //   userId: string;
// //   userName: string;
// //   body: string;
// //   isSystem?: boolean;
// //   $createdAt: string;
// // };

// // type UserData = {
// //   userId: string;
// //   userName: string;
// //   roomId: string;
// // };

// const Page = () => {
//   const router = useRouter();
//   const { roomId } = useParams() as { roomId: string };
//   const { handlerGetRoom, handlerExitRoom } = useRoomQueryHandler(roomId);

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [message, setMessage] = useState("");
//   const [user, setUser] = useState<UserData | null>(null);
//   const [accessGranted, setAccessGranted] = useState<boolean | null>(null);

//   useEffect(() => {
//     const storedData = localStorage.getItem("loginDetails");
//     if (storedData) {
//       try {
//         const parsedData: { data: UserData } = JSON.parse(storedData);
//         setUser(parsedData.data);
//       } catch (error) {
//         console.error("Failed to parse user data:", error);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (!user) return;
//     const verifyAccess = async () => {
//       try {
//         const res = await handlerGetRoom(roomId);
//         setAccessGranted(!!res);
//         if (!res) return;

//         const lastMessages = await databases.listDocuments<Message>(
//           DATABASE_ID,
//           COLLECTION_ID_MESSAGES,
//           [
//             Query.equal("roomId", roomId),
//             Query.equal("userId", "system"),
//             Query.search("body", `${user.userName} has left the chat.`),
//             Query.orderDesc("$createdAt"),
//             Query.limit(1),
//           ]
//         );

//         const lastExitTime = lastMessages.documents.length
//           ? new Date(lastMessages.documents[0].$createdAt).getTime()
//           : 0;

//         if (lastExitTime > 0) {
//           await databases.createDocument(
//             DATABASE_ID,
//             COLLECTION_ID_MESSAGES,
//             ID.unique(),
//             {
//               userId: "system",
//               userName: "System",
//               body: `${user.userName} has joined the chat.`,
//               roomId,
//               isSystem: true,
//             }
//           );
//         }
//       } catch (error) {
//         console.error("Error verifying room access:", error);
//         setAccessGranted(false);
//       }
//     };
//     verifyAccess();
//   }, [user, roomId]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await databases.listDocuments<Message>(
//           DATABASE_ID,
//           COLLECTION_ID_MESSAGES,
//           [Query.equal("roomId", roomId)]
//         );
//         setMessages(response.documents);
//       } catch (error) {
//         console.error("Failed to fetch messages:", error);
//       }
//     };
//     fetchMessages();
//   }, [roomId]);

//   useEffect(() => {
//     const unsubscribe = client.subscribe(
//       `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
//       (response) => {
//         if (response.events.includes("databases.*.collections.*.documents.*.create")) {
//           setMessages((prevMessages) => [...prevMessages, response.payload as Message]);
//         }
//       }
//     );
//     return () => unsubscribe();
//   }, []);

//   const sendMessage = useCallback(async () => {
//     if (!message.trim() || !user) return;
//     try {
//       await databases.createDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, ID.unique(), {
//         userId: user.userId,
//         userName: user.userName,
//         body: message,
//         roomId,
//       });
//       setMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   }, [message, user, roomId]);

//   const exitRoom = async () => {
//     if (!user) return;
//     try {
//       await databases.createDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, ID.unique(), {
//         userId: "system",
//         userName: "System",
//         body: `${user.userName} has left the chat.`,
//         roomId,
//         isSystem: true,
//       });
//       setTimeout(async () => {
//         const response = await handlerExitRoom(roomId);
//         if (response) router.push("/dashboard");
//       }, 500);
//     } catch (error) {
//       console.error("Error leaving room:", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="mb-4 text-2xl font-bold">Chat Room: {roomId}</h1>
//       <button onClick={exitRoom} className="mb-4 rounded bg-red-500 px-4 py-2 text-white">
//         Leave Room
//       </button>
//       <div className="mb-4 h-64 overflow-y-auto border p-2">
//         {messages.map((msg) => (
//           <div key={msg.$id} className={`mb-2 ${msg.isSystem ? "italic text-gray-500" : ""}`}>
//             <strong>{msg.isSystem ? "" : msg.userName}</strong> {msg.body}
//           </div>
//         ))}
//       </div>
//       <div className="flex">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message..."
//           className="mr-2 flex-1 border p-2"
//         />
//         <button onClick={sendMessage} className="rounded bg-blue-500 px-4 py-2 text-white" disabled={!user}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Page;
