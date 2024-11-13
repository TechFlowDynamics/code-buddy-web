"use client";

import Navbar from "./Navbar";

import React from "react";

import { usePathname } from "next/navigation";

import routeConstants from "@/core/constants/visibleRoutes.constant";

const ClientNavbar: React.FC = () => {
  const pathname = usePathname();

  const visibleRoutes = routeConstants.visibleRoutes;
  return visibleRoutes.includes(pathname) ? <Navbar /> : null;
};

export default ClientNavbar;
