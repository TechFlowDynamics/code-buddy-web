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
