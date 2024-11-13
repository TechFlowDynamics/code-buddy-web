"use client";

import { IoLogOutOutline } from "react-icons/io5";

import React from "react";

import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/hooks/AuthContext";

import staticConstants from "@/core/constants/static.constant";

const Sidebar = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="bg-glass flex h-screen w-64 flex-col space-y-4 p-6 shadow-xl backdrop-blur-md">
      <h2 className="text-center text-2xl font-bold">Dashboard</h2>
      <nav className="flex-grow space-y-2">
        {staticConstants.DASHBOARD_SIDEBAR_CONSTANT.map(item => (
          <button
            key={item.name}
            onClick={() => router.push(item.path)}
            className={`w-full rounded-md p-2 text-left hover:bg-white/20 ${
              pathname === item.path
                ? "bg-white/20 font-bold text-gray-300/80"
                : ""
            }`}>
            {item.name}
          </button>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-md bg-red-500 p-2 text-center hover:bg-red-600">
        <IoLogOutOutline size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
