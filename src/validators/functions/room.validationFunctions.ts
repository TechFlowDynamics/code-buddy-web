import { IJoinRoom, IRoom } from "@/core/interface/room.interface";
import { joinRoomValidatorSchema, roomValidatorSchema } from "../schemas/room.validationSchema";
import * as yup from "yup";

export const validteCreateRoom = async (data: IRoom) => {
  try {
    await roomValidatorSchema.validate(data, { abortEarly: false });
    return { valid: true, errors: [] };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { valid: false, errors: error.errors };
    }
    return { valid: false, errors: ["Validation error"] };
  }
};

export const validateJoinRoom = async (data: IJoinRoom) => {
  try {
    await joinRoomValidatorSchema.validate(data, { abortEarly: false });
    return { valid: true, errors: [] };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { valid: false, errors: error.errors };
    }
    return { valid: false, errors: ["Validation error"] };
  }
};