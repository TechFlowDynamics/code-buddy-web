export enum RoomType {
  Public = "public",
  Private = "private",
}

export interface IRoom {
  _id?: string;
  roomName: string;
  roomCode?: string;
  questionIds: string[];
  type: RoomType;
  status?: string; // e.g., "active", "inactive", "scheduled"
  startTime: Date;
  endTime: Date;
  duration?: number;
  credits: string;
  roomSize: number;
  users?: string[];
  userId?: string;
  createdAt?: Date;
  roomHash?: string; // Optional field for private rooms
}

// 🔹 Fix the API response structure
export interface IGetRoomsResponse {
  status: string;
  statusCode: number;
  message: string;
  rooms: IRoom[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRooms: number;
    pageSize: number;
  };
}


export interface ICreateRoom {
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

export interface ICreateRoomResponse {
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
