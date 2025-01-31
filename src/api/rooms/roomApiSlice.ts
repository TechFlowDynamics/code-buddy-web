// features/auth/authApiSlice.ts
import apiSlice from "@/features/apiSlice";

import { ICreateRoom, IJoinRoom, IRoom } from "@/core/interface/room.interface";

export const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createRooms: builder.mutation<ICreateRoom, any>({
      query: credentials => ({
        url: "/room/createroom",
        method: "post",
        body: credentials,
      }),
    }),
    joinRooms: builder.mutation<IJoinRoom, any>({
      query: credentials => ({
        url: "/room/joinroom",
        method: "post",
        body: credentials,
      }),
    }),
    getRoom: builder.query<{ message: string; room: IRoom }, string>({
      query: roomCode => ({
        url: `/room/${roomCode}/verify`,
        method: "get",
      }),
    }),
    exitRoom: builder.mutation<ICreateRoom, any>({
      query: credentials => ({
        url: `/room/exitroom`,
        method: "post",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useCreateRoomsMutation,
  useJoinRoomsMutation,
  useGetRoomQuery,
  useExitRoomMutation,
} = roomApiSlice;
