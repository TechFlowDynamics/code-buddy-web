// features/auth/authApiSlice.ts

import apiSlice from "@/features/apiSlice";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  email: string;
  password: string;
  userName: string;
  firstName?: string;
  lastName?: string;
}

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

    signUp: builder.mutation<AuthResponse, SignUpCredentials>({
      query: credentials => ({
        url: "/user/signup-user",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApiSlice;
