import * as yup from "yup";
import { SignUpCredentials, VerifyOtp } from "@/core/interface/auth.interface";
import {
  signUpValidationSchema,
  verifyOtpSchema,
} from "../schemas/auth.validationSchema";

// A function to validate signup data
export const validateSignUpData = async (data: SignUpCredentials) => {
  try {
    await signUpValidationSchema.validate(data, { abortEarly: false });
    return { valid: true, errors: [] };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { valid: false, errors: error.errors };
    }
    return { valid: false, errors: ["Validation error"] };
  }
};
export const verifyOtpData = async (data: VerifyOtp) => {
  try {
    await verifyOtpSchema.validate(data, { abortEarly: false });
    return { valid: true, errors: [] };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { valid: false, errors: error.errors };
    }
    return { valid: false, errors: ["Validation error"] };
  }
};
