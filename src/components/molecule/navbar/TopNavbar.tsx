"use client";

import { FaUserAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from "react-redux";

import React from "react";

import { RootState } from "@/store/store";

const TopNavbar = () => {
  const fullName = useSelector((state: RootState) => state.auth.fullName);

  return (
    <div className="bg-glass flex w-full items-center justify-between rounded-b-md p-4 shadow-lg backdrop-blur-sm">
      <h1 className="text-xl font-semibold">Welcome Back, {fullName}!</h1>
      <div className="flex items-center space-x-4">
        <button className="rounded-full p-2 hover:bg-gray-700/40">
          <IoIosNotifications size={20} />
        </button>
        <button className="flex items-center gap-4 rounded-md bg-green-500 px-4 py-2 hover:bg-green-600">
          <span>Profile</span>
          <FaUserAlt />
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
