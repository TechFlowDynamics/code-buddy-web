import { Purpose, PurposeValues } from "@/core/interface/auth.interface";
import * as yup from "yup";

// Define a schema for signup validation
export const signUpValidationSchema = yup.object().shape({
  userName: yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});
export const verifyOtpSchema = yup.object().shape({
  purpose: yup.mixed<PurposeValues>().oneOf(Object.values(Purpose)).required(),
  email: yup.string().email("Invalid email format").required("Email is required"),
  code: yup.string().required("Code is required").length(4, "Code must be at least 4 characters"),
});

