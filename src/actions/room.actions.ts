import {
  validateJoinRoom,
  validteCreateRoom,
} from "@/validators/functions/room.validationFunctions";

import { useCallback, useState } from "react";

import snackbar from "@/hooks/useSnackbar";

import {
  useCreateRoomsMutation,
  useGetRoomQuery,
  useJoinRoomsMutation,
} from "@/api/rooms/roomApiSlice";

import { useApiErrorHandler } from "@/utils/errorHandler.utils";

import { ICreateRoom, IJoinRoom, IRoom } from "@/core/interface/room.interface";
import { useRouter } from "next/navigation";

export const useRoomHandler = (roomId: string) => {
  const [createRoom] = useCreateRoomsMutation();
  const [joinRoom] = useJoinRoomsMutation();
  // Automatic query call on mount:
  const { data, error:getRoomError, isLoading, refetch } = useGetRoomQuery(roomId, {
    skip: !roomId // Skip query when params are not provided
  });
  const router = useRouter();
  const handleApiError = useApiErrorHandler();
  const [loading, setLoading] = useState(false);

  const handlerCreateRoom = useCallback(
    async ({
      roomName,
      questionIds,
      type,
      credits,
      startTime,
      endTime,
      roomSize,
    }: ICreateRoom) => {
      setLoading(true);
      const { valid, errors } = await validteCreateRoom({
        roomName,
        questionIds,
        type,
        credits,
        startTime,
        endTime,
        roomSize,
      });
      if (!valid) {
        snackbar.error(errors.join(", "));

        setLoading(false);
        return;
      }
      try {
        const body = {
          roomName,
          questionIds,
          type,
          credits,
          startTime,
          endTime,
          roomSize,
        };

        const data = await createRoom(body).unwrap();

        if (data) {
          snackbar.success("Room created successfully!!");

          return data;
        } else {
          snackbar.error("Room creation failed");
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    },
    [createRoom, handleApiError],
  );

  const handlerJoinRoom = useCallback(
    async ({ roomCode }: IJoinRoom) => {
      setLoading(true);
      const { valid, errors } = await validateJoinRoom({
        roomCode,
      });

      if (!valid) {
        snackbar.error(errors.join(", "));

        setLoading(false);
        return;
      }
      try {
        const data = await joinRoom({ roomCode }).unwrap();

        if (data) {
          snackbar.success("Room joined successfully!!");
          return data;
        } else {
          snackbar.error("Room joining failed");
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    },
    [joinRoom, handleApiError],
  );

  // const handlerGetRoom = useCallback(
  //   async (roomId: string) => {
  //     setLoading(true);
  //     try {
  //       const data = await getRoom(roomId);
  //       return data;
  //     } catch (error) {
  //       handleApiError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [handleApiError],
  // );

  const handlerGetRoom = useCallback(
    async (roomId: string) => {
      setLoading(true);
      try {
        refetch();

        if (data) {
          snackbar.success("Room joined successfully!");
          router.push(`/dashboard/room/${roomId}`);
          return data;
        } else if(getRoomError){
          router.push(`/dashboard/lobby`);
          snackbar.error("Access Denied");
        }
        
      } catch (error) {
       
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    },
    [handleApiError,roomId],
  );
  return { handlerCreateRoom, handlerJoinRoom, handlerGetRoom, loading };
};
