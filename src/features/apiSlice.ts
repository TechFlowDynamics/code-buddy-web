// features/apiSlice.ts
import { logoutHandler } from "@/reducer/auth/authActions";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { getAuthToken } from "@/core/config/auth.config";

import snackbar from "../hooks/useSnackbar";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: headers => {
    const accessToken = getAuthToken();
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

// Define `baseQueryWithReAuth` without explicitly assigning `QueryReturnValue`
const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(logoutHandler({ isSession: false }));
    const errorMessage =
      (result.error.data as { message?: string })?.message || "Unauthorized";
    snackbar.error(errorMessage);
  }

  if (result?.error?.status === 403) {
    api.dispatch(logoutHandler({ isSession: false }));
  }

  return result; // Return without explicit typecasting
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User"],
  endpoints: () => ({}),
});

export default apiSlice;
