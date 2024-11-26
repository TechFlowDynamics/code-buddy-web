import { useCallback, useEffect } from "react";

import snackbar from "@/hooks/useSnackbar";

import { useQuestionQuery } from "@/api/questions/questionApiSlice";

import { useApiErrorHandler } from "@/utils/errorHandler.utils";

import { QuestionParamInterface } from "@/core/interface/question.interface";

interface UseQuestionHandlerReturn {
  fetchQuestions: () => Promise<any>;
  refetch: () => Promise<any>;
  loading: boolean;
  data: any;
}

export const useQuestionHandler = (
  initialParams: QuestionParamInterface,
): UseQuestionHandlerReturn => {
  const handleApiError = useApiErrorHandler();

  const { data, error, isFetching, refetch } = useQuestionQuery(initialParams, {
    skip: !Object.keys(initialParams).length, // Skip query when params are not provided
  });

  // Handles fetch logic
  const fetchQuestions = useCallback(async () => {
    refetch();
    try {
      if (error) {
        throw new Error("Failed to fetch questions.");
      }

      if (data) {
        snackbar.success("Questions fetched successfully!");
        return data;
      }
    } catch (err) {
      handleApiError(err);
    }
  }, [initialParams]);

  useEffect(() => {
    if (initialParams) {
      fetchQuestions();
    }
  }, [initialParams]);
  return { fetchQuestions, loading: isFetching, data, refetch };
};
