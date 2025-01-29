export enum RoomType {
  Public = "public",
  Private = "private",
}

export interface IRoom {
  roomName: string;
  questionIds: string[];
  type: RoomType; // Using enums for better type safety
  startTime: Date;
  endTime: Date;
  roomSize: number;
  credits: string;
}

export interface IJoinRoom {
  roomCode: string;
}


export interface IJoinRoomResponse {
  status: string; // e.g., "success" or "error"
  message: string; // e.g., "New user joined successfully."
  room: {
    _id: string;
    roomName: string;
    roomCode: string;
    type: string; // "public" | "private"
    status: string; // "active" | "inactive" | "scheduled"
    startTime: string;
    endTime: string;
    duration: number;
    credits: string;
    roomSize: number;
    users: string[];
    userId: string;
    questionIds: string[];
    createdAt: string;
    roomHash?: string; // Optional field for private rooms
  };
  statusCode: number;
}