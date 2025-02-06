// import { apiSlice } from '@/features/apiSlice';

import apiSlice from "@/features/apiSlice";

export const codeEditorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    runCode: builder.mutation<any, {
        code: string;
        language: string;
        questionId: string; // This will be the title
      }>({
        query: (body) => ({
          url: '/code/run',
          method: 'POST',
          body,
        }),
      }),
    submitCode: builder.mutation({
      query: (body) => ({
        url: '/code/submit',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRunCodeMutation, useSubmitCodeMutation } = codeEditorApiSlice;