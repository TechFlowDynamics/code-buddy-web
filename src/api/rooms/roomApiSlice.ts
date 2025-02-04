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
      invalidatesTags: ['RoomList'],
    }),
    
    joinRooms: builder.mutation<IJoinRoom, any>({
      query: credentials => ({
        url: "/room/joinroom",
        method: "post",
        body: credentials,
      }),
      invalidatesTags: (result, error, { roomId }) => [
        { type: 'Room', id: roomId },
        'RoomList'
      ],
    }),
    
    verifyRoom: builder.query<{ message: string; room: IRoom }, string>({
      query: roomCode => ({
        url: `/room/${roomCode}/verify`,
        method: "get",
      }),
      providesTags: (result, error, roomCode) => [
        { type: 'Room', id: roomCode }
      ],
    }),
    
    exitRoom: builder.mutation<ICreateRoom, any>({
      query: credentials => ({
        url: `/room/exitroom`,
        method: "post",
        body: credentials,
      }),
      invalidatesTags: (result, error, { roomId }) => [
        { type: 'Room', id: roomId },
        'RoomList'
      ],
    }),
    
    getRooms: builder.query<IGetRoomsResponse, any>({
      query: () => "/room/getRooms",
      transformResponse: (response: IGetRoomsResponse) => response,
      providesTags: ['RoomList'],
    }),
  }),
});

// Add this to handle polling manually
export const usePollingVerifyRoomQuery = (roomCode: string, pollingInterval = 3000) => {
  const result = roomApiSlice.endpoints.verifyRoom.useQuery(roomCode, {
    pollingInterval,
  });
  return result;
};

export const usePollingGetRoomsQuery = (pollingInterval = 5000) => {
  const result = roomApiSlice.endpoints.getRooms.useQuery(undefined, {
    pollingInterval,
  });
  return result;
};

export const {
  useCreateRoomsMutation,
  useJoinRoomsMutation,
  useVerifyRoomQuery,
  useExitRoomMutation,
  useGetRoomsQuery,
} = roomApiSlice;