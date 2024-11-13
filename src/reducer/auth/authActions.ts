import { authActions } from "./authSlice";

import snackbar from "@/hooks/useSnackbar";

import { removeItem } from "@/utils/storage";

export interface authDetails {
  accessToken: string;
  userId: string;
  email: string | null;
  fullName: string | null;
  active: boolean;
  isEmailVerified: boolean;
  registrationStatus: string;
  roles: string;
}
interface config {
  isSession: boolean;
}

const loginHandler = (authDetails: authDetails) => {
  return (
    dispatch: (arg0: {
      payload: any;
      type: "auth/logout" | "auth/login";
    }) => void,
  ) => {
    dispatch(authActions.login(authDetails));
  };
};

const logoutHandler = (config: config) => {
  return (
    dispatch: (arg0: { payload: undefined; type: "auth/logout" }) => void,
  ) => {
    if (typeof window !== "undefined") {
      removeItem("userData");
      window.location.reload();
    }

    // Use an if statement instead of a logical NOT expression
    if (!config?.isSession) {
      snackbar.error("Logged out");
    }

    dispatch(authActions.logout());
  };
};

export { loginHandler, logoutHandler };
