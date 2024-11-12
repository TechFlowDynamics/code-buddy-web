import { useState, useCallback } from "react";
import snackbar from "@/hooks/useSnackbar";
import { useDispatch } from "react-redux";
import { useSignUpMutation } from "@/api/auth/authApiSlice";
import { useApiErrorHandler } from "@/utils/errorHandler.utils";
import { AppDispatch } from "@/store/store";
import { authActions } from "@/reducer/auth/authSlice";
import { SignUpCredentials } from "@/core/interface/auth.interface";

export const useLoginHandler = () => {
  const [signUp] = useSignUpMutation();
  const dispatch = useDispatch<AppDispatch>();
  const handleApiError = useApiErrorHandler();
  const [loading, setLoading] = useState(false);

  const handlerSignUp = useCallback(
    async ({ userName, email, password }: SignUpCredentials) => {
      setLoading(true);
      try {
        const data = await signUp({ userName, email, password }).unwrap();
        if (data) {
          dispatch(authActions.stepUpdate(2));
          snackbar.success("Otp sent successfully!!");
          return data;
        } else {
          snackbar.error("Signup failed");
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, signUp, handleApiError],
  );

  return { handlerSignUp, loading };
};
