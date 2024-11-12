"use Client";
import { useCallback } from "react";
import snackbar from "@/hooks/useSnackbar";

const GENERIC_ERROR_MESSAGE = "An unexpected error occurred";

export const useApiErrorHandler = () => {
  return useCallback(
    (error: any, defaultMessage: string = GENERIC_ERROR_MESSAGE) => {
      const typedError = error;
      const errorMessage = typedError?.data?.message || defaultMessage;
      snackbar.error(errorMessage);
      return errorMessage;
    },
    [],
  );
};
