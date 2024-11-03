import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";

const TopNavbar = () => {
  return (
    <div className="w-full flex justify-between items-center p-4 bg-glass rounded-b-md shadow-lg backdrop-blur-sm">
      <h1 className="text-xl font-semibold">Welcome Back, User!</h1>
      <div className="flex space-x-4 items-center">
        <button className="p-2 rounded-full hover:bg-gray-700/40">
          <IoIosNotifications size={20} />
        </button>
        <button className="flex items-center gap-4 px-4 py-2 rounded-md bg-green-500 hover:bg-green-600">
          <span>Profile</span>
          <FaUserAlt />
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
