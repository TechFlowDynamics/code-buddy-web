export interface AuthData {
  [key: string]: string | object | number | Array<object | string | number>; // Adjust this type to match the actual structure of your auth data
}

type status = "success" | "failure";

export interface SignUpCredentials {
  email: string;
  password: string;
  userName: string;
}

export interface UserStepTwo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  imageUrl?: string;
}

export interface VerifyOtp {
  email: string;
  code: string;
  purpose: PurposeValues;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export enum Purpose {
  SIGNUP = "Register",
  RESET_PASSWORD = "PasswordChange",
  VERIFY_PHONE_NUMBER = "VerifyPhone",
  LOGIN = "LoginWithCode",
  FORGET_PASSWORD = "ForgetPassword",
}

export type PurposeValues = `${Purpose}`;

// Interface for StepOneResponse
export interface StepOneResponse {
  data: {
    email: string;
    purpose: PurposeValues;
    steps: number;
    userId: string;
    userName: string;
  };
  message: string;
  status: status;
  statusCode: number;
}
