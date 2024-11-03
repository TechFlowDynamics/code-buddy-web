"use client";
import { createContext, ReactNode, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/reducer/auth/authSlice";
import { RootState } from "@/store/store"; // Import RootState to use with useSelector

interface AuthContextProps {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (userData: any) => void; // Accepts userData for login
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const login = (userData: any) => {
    dispatch(authActions.login(userData));
  };

  const logout = () => {
    dispatch(authActions.logout());
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!accessToken, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
