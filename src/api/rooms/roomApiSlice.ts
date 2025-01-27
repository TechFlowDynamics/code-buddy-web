// features/auth/authApiSlice.ts
import apiSlice from "@/features/apiSlice";
import { IJoinRoom, IRoom } from "@/core/interface/room.interface";

export const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createRooms: builder.mutation<IRoom, any>({
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
  }),
});



export const { useCreateRoomsMutation , useJoinRoomsMutation  } = roomApiSlice;