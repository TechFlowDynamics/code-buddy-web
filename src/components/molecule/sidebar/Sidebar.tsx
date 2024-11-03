"use client";
import React from "react";
import { useAuth } from "@/hooks/AuthContext";
import { useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="w-64 bg-glass p-6 backdrop-blur-md flex flex-col space-y-4 h-screen shadow-xl">
      <h2 className="text-2xl font-bold text-center">Dashboard</h2>
      <nav className="flex-grow space-y-2">
        <button className="w-full text-left p-2 rounded-md hover:bg-white/20">
          Overview
        </button>
        <button className="w-full text-left p-2 rounded-md hover:bg-white/20">
          Progress
        </button>
        <button className="w-full text-left p-2 rounded-md hover:bg-white/20">
          Settings
        </button>
      </nav>
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 p-2 mt-auto text-center rounded-md bg-red-500 hover:bg-red-600">
        <IoLogOutOutline size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
