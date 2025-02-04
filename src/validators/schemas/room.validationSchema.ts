import * as yup from "yup";

import { RoomType } from "@/core/interface/room.interface";

export const roomValidatorSchema = yup.object().shape({
  roomName: yup.string().required("Room name is required"),
  questionIds: yup
    .array()
    .of(yup.string().required())
    .required("Question IDs are required"),
  type: yup
    .mixed<RoomType>()
    .oneOf(Object.values(RoomType))
    .required("Room type is required"),
  startTime: yup.date().required("Start time is required"),
  endTime: yup
    .date()
    .min(yup.ref("startTime"), "End time must be after start time")
    .required("End time is required"),
  roomSize: yup
    .number()
    .min(1, "Room size must be at least 1")
    .required("Room size is required"),
  credits: yup
    .string()
    .matches(/^[0-9]+$/, "Credits must be a number")
    .required("Credits are required"),
});

export const joinRoomValidatorSchema = yup.object().shape({
  roomCode: yup
    .string()
    .trim()
    .length(6, "Room code must be exactly 6 characters.")
    .matches(/^[A-Za-z0-9]+$/, "Room code must be alphanumeric.")
    .required("Room code is required."),
});