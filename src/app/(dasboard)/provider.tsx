"use client";

import React from "react";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
