import { authActions } from "@/reducer/auth/authSlice";
import {
  loginData,
  validateSignUpData,
  verifyOtpData,
} from "@/validators/functions/auth.validationFunctions";
import { useDispatch } from "react-redux";

import { useCallback, useState } from "react";

import { AppDispatch } from "@/store/store";

import snackbar from "@/hooks/useSnackbar";

import {
  useLoginMutation,
  useSignUpMutation,
  useVerifyOtpMutation,
} from "@/api/auth/authApiSlice";

import { useApiErrorHandler } from "@/utils/errorHandler.utils";

import {
  LoginCredentials,
  SignUpCredentials,
  VerifyOtp,
} from "@/core/interface/auth.interface";

export const useLoginHandler = () => {
  const [signUp] = useSignUpMutation();
  const [login] = useLoginMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const handleApiError = useApiErrorHandler();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const handlerSignUp = useCallback(
    async ({ userName, email, password }: SignUpCredentials) => {
      setLoading(true);
      const { valid, errors } = await validateSignUpData({
        userName,
        email,
        password,
      });
      if (!valid) {
        snackbar.error(errors.join(", "));
        setLoading(false);
        return;
      }
      try {
        const body = {
          userName: userName.toLowerCase(),
          email: email.toLowerCase(),
          password: password,
        };
        const data = await signUp(body).unwrap();
        if (data) {
          dispatch(authActions.stepUpdate(data.data.steps + 1));
          dispatch(authActions.tempSignUp(data.data));
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

  const handlerVerifyOtp = useCallback(
    async ({ purpose, email, code }: VerifyOtp) => {
      setLoading(true);
      const { valid, errors } = await verifyOtpData({
        purpose,
        email,
        code,
      });
      if (!valid) {
        snackbar.error(errors.join(", "));
        setLoading(false);
        return;
      }
      try {
        const body = {
          purpose: purpose,
          email: email.toLowerCase(),
          code: code,
        };
        const data = await verifyOtp(body).unwrap();
        if (data) {
          // dispatch(authActions.stepUpdate(data.data.steps));
          // dispatch(authActions.tempSignUp(data.data));
          snackbar.success("Otp Verified!!");
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
  const handlerLogin = useCallback(
    async ({ email, password }: LoginCredentials) => {
      setLoading(true);
      const { valid, errors } = await loginData({
        email,
        password,
      });
      if (!valid) {
        snackbar.error(errors.join(", "));
        setLoading(false);
        return;
      }
      try {
        const body = {
          email: email.toLowerCase(),
          password: password,
        };
        const data = await login(body).unwrap();
        if (data) {
          // dispatch(authActions.stepUpdate(data.data.steps));
          // dispatch(authActions.tempSignUp(data.data));
          snackbar.success("Login Successfull!!");
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

  return { handlerSignUp, handlerVerifyOtp, handlerLogin, loading };
};
