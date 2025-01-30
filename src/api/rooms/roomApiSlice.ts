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
      // This callback receives `roomCode` and constructs the endpoint
      // query: (roomCode) => `/room/${roomCode}/verify`,
      // method: "get",
      // params: credentials,

      query: roomCode => ({
        url: `/room/${roomCode}/verify`,
        method: "get",
        
      }),
    }),
  }),
});



export const { useCreateRoomsMutation , useJoinRoomsMutation ,useGetRoomQuery } = roomApiSlice;