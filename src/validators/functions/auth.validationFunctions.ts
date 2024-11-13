import * as yup from "yup";
import { SignUpCredentials } from "@/core/interface/auth.interface";
import { signUpValidationSchema } from "../schemas/auth.validationSchema";

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
  