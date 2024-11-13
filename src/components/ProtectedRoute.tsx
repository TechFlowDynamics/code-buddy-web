"use client";

import { ReactNode, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null; // or a loading indicator

  return <>{children}</>;
};

export default ProtectedRoute;
