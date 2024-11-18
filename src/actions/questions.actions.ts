import { useCallback, useState } from "react";

import snackbar from "@/hooks/useSnackbar";

import { useQuestionQuery } from "@/api/questions/questionApiSlice";

import { useApiErrorHandler } from "@/utils/errorHandler.utils";

import { QuestionParamInterface } from "@/core/interface/question.interface";

export const useQuestionHandler = () => {
  const handleApiError = useApiErrorHandler();
  const [queryParams, setQueryParams] = useState<QuestionParamInterface | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  // Use the query with dynamically updated parameters and `skip` logic
  const { data, error, isFetching } = useQuestionQuery(queryParams || {}, {
    // skip: !queryParams, // Skip the query if queryParams is null
  });

  const handlerAllQuestions = useCallback(
    async (params: QuestionParamInterface) => {
      if (!Object.keys(params).length) {
        setQueryParams({});
      }

      setLoading(true);
      try {
        // Update queryParams to trigger the query
        setQueryParams(params);

        // Wait for the query to resolve
        if (error) {
          snackbar.error("Failed to fetch questions.");
        }

        if (data) {
          return data;
        } else {
          snackbar.error("No questions found.");
        }
      } catch (err) {
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    },
    [data, error, handleApiError, queryParams, isFetching],
  );

  return { handlerAllQuestions, loading: loading || isFetching };
};
