// features/auth/authApiSlice.ts
import apiSlice from "@/features/apiSlice";

import { ICreateRoom, IGetRoomsResponse, IJoinRoom, IRoom } from "@/core/interface/room.interface";


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
    verifyRoom: builder.query<{ message: string; room: IRoom }, string>({
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
    getRooms: builder.query<IGetRoomsResponse, any>({
      query: () => "/room/getRooms",
      transformResponse: (response: IGetRoomsResponse) => response, // ✅ Return full response without modification
    }),
    
    
  }),
});

export const {
  useCreateRoomsMutation,
  useJoinRoomsMutation,
  useVerifyRoomQuery,
  useExitRoomMutation,
  useGetRoomsQuery,
} = roomApiSlice;
