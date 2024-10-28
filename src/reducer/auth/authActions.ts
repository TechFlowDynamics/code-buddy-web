import snackbar from "@/hooks/useSnackbar";
import { authActions } from "./authSlice";

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
    }) => void
  ) => {
    dispatch(authActions.login(authDetails));
  };
};

const logoutHandler = (config: config) => {
  return (
    dispatch: (arg0: { payload: undefined; type: "auth/logout" }) => void
  ) => {
    console.log("cleaned");
    if (typeof window !== "undefined") {
      localStorage.removeItem("userData");
      window.location.reload();
    }
    dispatch(authActions.logout());
    !config?.isSession && snackbar.error("Logged out");
  };
};

export { loginHandler, logoutHandler };
