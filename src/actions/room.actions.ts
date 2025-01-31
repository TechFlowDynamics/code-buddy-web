import {
  validateJoinRoom,
  validteCreateRoom,
} from "@/validators/functions/room.validationFunctions";

import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

import snackbar from "@/hooks/useSnackbar";

import {
  useCreateRoomsMutation,
  useExitRoomMutation,
  useGetRoomQuery,
  useJoinRoomsMutation,
} from "@/api/rooms/roomApiSlice";

import { useApiErrorHandler } from "@/utils/errorHandler.utils";

import { ICreateRoom, IJoinRoom, IRoom } from "@/core/interface/room.interface";

export const useRoomHandler = () => {
  const [createRoom] = useCreateRoomsMutation();
  const [joinRoom] = useJoinRoomsMutation();

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

  return {
    handlerCreateRoom,
    handlerJoinRoom,
    loading,
  };
};

export const useRoomQueryHandler = (roomCode: string) => {
  const [exitRoom] = useExitRoomMutation();
  const {
    data,
    error: getRoomError,
    isLoading,
    refetch,
  } = useGetRoomQuery(roomCode, {
    skip: !roomCode, // Skip query when params are not provided
  });
  const router = useRouter();
  const handleApiError = useApiErrorHandler();
  const [loading, setLoading] = useState(false);

  const handlerGetRoom = useCallback(
    async (roomCode: string) => {
      setLoading(true);
      try {
        refetch();

        if (data) {
          snackbar.success("Room joined successfully!");
          router.push(`/dashboard/room/${roomCode}`);
          return data;
        } else if (getRoomError) {
          router.push(`/dashboard/lobby`);
          snackbar.error("Access Denied");
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    },
    [handleApiError, roomCode],
  );

  const handlerExitRoom = useCallback(
    async (roomCode: string) => {
      setLoading(true);
      try {
        const data = await exitRoom({ roomCode });

        if (data) {
          snackbar.success("Exited room successfully!");
          router.push(`/dashboard/lobby`);
          return data;
        } else {
          snackbar.error("Failed to exit room");
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    },
    [handleApiError, roomCode],
  );

  return {
    handlerGetRoom,
    handlerExitRoom,
    loading,
  };
};
