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
  message: string;
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


export interface ChatProps {
  roomId: string;
  onExit: () => Promise<void>;
  roomData: {
    endTime: Date | string;
    startTime: Date | string;
    roomName: string;
    questionIds: string[];
    users?: string[];
  };
}

export type RoomUser = {
  userId: string;
  userName: string;
};

export type Message = {
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

export type UserData = {
  userId: string;
  userName: string;
  roomId: string;
};

export type UserDetails = {
  userId: string;
  userName: string;
};

export type Score = {
  score: number;
  bonus: number;
  status: 'pending' | 'completed';
};

export type UserScore = {
  questions: Record<string, Score>;
  totalScore: number;
  totalBonus: number;
};

export type Scores = {
  [userId: string]: UserScore;
};