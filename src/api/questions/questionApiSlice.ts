// features/auth/authApiSlice.ts
import apiSlice from "@/features/apiSlice";

import {
  QuestionResponseInterface,
  QuestionParamInterface,
} from "@/core/interface/question.interface";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    question: builder.query<QuestionResponseInterface, any>({
      query: (credentials) => ({
        url: "/questions/get",
        method: "get",
        params: credentials,
      }),
    }),
  }),
});

export const { useQuestionQuery } = authApiSlice;
