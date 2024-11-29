// src/app/profile/components/ProfileCard.tsx
'use client'
import { Avatar } from "@mantine/core";
import { useSelector } from "react-redux";

import React from "react";

import { RootState } from "@/store/store";

const ProfileCard: React.FC = () => {
  const userDetails = useSelector((state: RootState) => state.auth);
  console.log("🚀 ~ userDetails:", userDetails)
  return (
    <div className="w-full max-w-2xl rounded-lg bg-lightBackground bg-opacity-10 p-6 text-center shadow-md backdrop-blur-lg dark:bg-darkBgColor dark:bg-opacity-30">
      <Avatar
        src="https://randomuser.me/api/portraits/men/28.jpg"
        alt="Profile"
        radius="xl"
        size="md"
        className="mx-auto h-40 w-40 rounded-full border-2 shadow-md"
      />
      <h2 className="mt-4 text-2xl font-semibold">{userDetails.fullName}</h2>
      <p className="text-gray-400">@{userDetails.userName || "john.doe"}</p>
      <p className="mt-2 text-sm text-gray-300">
        🚀 Full Stack Developer | Tech Innovator <br />
        🎓 B.Tech in IT & Mathematical Innovations, Minor in Management — DU
      </p>
      <div className="mt-4 flex justify-center gap-4">
        <div>
          <p className="text-sm font-semibold">5</p>
          <p className="text-sm text-gray-400">Followers</p>
        </div>
        <div>
          <p className="text-sm font-semibold">2</p>
          <p className="text-sm text-gray-400">Following</p>
        </div>
      </div>
      <button className="mt-4 rounded-md bg-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-600">
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;
