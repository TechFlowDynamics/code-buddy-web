"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

export default function DashboardLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
