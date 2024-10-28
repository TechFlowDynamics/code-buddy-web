import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logoutHandler } from "@/reducer/auth/authActions";
import snackbar from "../hooks/useSnackbar";
import { getAuthToken } from "@/core/config/auth.config";

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

const baseQueryWithReAuth = async (
  args: any,
  api: any,
  extraOptions: any,
): Promise<{ data?: any; error?: any }> => {
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

  return result;
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User"],
  endpoints: () => ({}),
});

export default apiSlice;
