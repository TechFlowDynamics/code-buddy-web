import {
  validateJoinRoom,
  validteCreateRoom,
} from "@/validators/functions/room.validationFunctions";

import { useCallback, useState } from "react";

import snackbar from "@/hooks/useSnackbar";
import { useApiErrorHandler } from "@/utils/errorHandler.utils";

import { IJoinRoom, IRoom } from "@/core/interface/room.interface";
import { useCreateRoomsMutation, useJoinRoomsMutation } from "@/api/rooms/roomApiSlice";

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
    }: IRoom) => {
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
       
        const data = await joinRoom({roomCode}).unwrap();
       
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
    [joinRoom, handleApiError],
  );

  return { handlerCreateRoom, handlerJoinRoom, loading };
};
