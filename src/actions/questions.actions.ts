import { useEffect, useState } from "react";

import snackbar from "@/hooks/useSnackbar";

import { useQuestionQuery } from "@/api/questions/questionApiSlice";

import { useApiErrorHandler } from "@/utils/errorHandler.utils";

import { QuestionParamInterface } from "@/core/interface/question.interface";

interface UseQuestionHandlerReturn {
  fetchQuestions: () => Promise<any>;
  loading: boolean;
  data: any;
}

export const useQuestionHandler = (
  initialParams: QuestionParamInterface,
): UseQuestionHandlerReturn => {
  const [queryParams, setQueryParams] =
    useState<QuestionParamInterface>(initialParams);
  const handleApiError = useApiErrorHandler();
  const { data, error, isFetching } = useQuestionQuery(queryParams, {
    skip: !Object.keys(queryParams).length, // Skip query when params are not provided
  });

  // Handles fetch logic
  const fetchQuestions = async () => {
    if (!Object.keys(queryParams).length) {
      snackbar.error("Query parameters are required.");
      return null;
    }

    try {
      if (error) {
        throw new Error("Failed to fetch questions.");
      }

      if (data) {
        snackbar.success("Questions fetched successfully!");
        return data;
      } else {
        snackbar.error("No questions found.");
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  useEffect(() => {
    if (initialParams) setQueryParams(initialParams);
  }, [initialParams]);

  return { fetchQuestions, loading: isFetching, data };
};
