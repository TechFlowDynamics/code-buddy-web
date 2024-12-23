// features/auth/authApiSlice.ts
import apiSlice from "@/features/apiSlice";

import {
  LoginCredentials,
  SignUpCredentials,
  StepOneResponse,
  UserStepTwo,
  VerifyOtp,
} from "@/core/interface/auth.interface";

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    userName: string;
  };
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: credentials => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    signUp: builder.mutation<StepOneResponse, SignUpCredentials>({
      query: credentials => ({
        url: "/auth/register-steps-1",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    registerStep2: builder.mutation<AuthResponse, UserStepTwo>({
      query: credentials => ({
        url: "/auth/register-steps-2",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    verifyOtp: builder.mutation<AuthResponse, VerifyOtp>({
      query: credentials => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useRegisterStep2Mutation,
  useVerifyOtpMutation,
} = authApiSlice;
