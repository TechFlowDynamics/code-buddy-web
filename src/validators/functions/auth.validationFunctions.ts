import {
  loginSchema,
  signUpValidationSchema,
  verifyOtpSchema,
} from "../schemas/auth.validationSchema";
import * as yup from "yup";

import {
  LoginCredentials,
  SignUpCredentials,
  VerifyOtp,
} from "@/core/interface/auth.interface";

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
export const loginData = async (data: LoginCredentials) => {
  try {
    await loginSchema.validate(data, { abortEarly: false });
    return { valid: true, errors: [] };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { valid: false, errors: error.errors };
    }
    return { valid: false, errors: ["Validation error"] };
  }
};
