"use client";

import { motion } from "framer-motion";

import React, { useState } from "react";

import useNavigate from "@/hooks/useNavigation";

import AccountButton from "@/components/atoms/buttons/AccountButton";

interface AccountDropdownProps {
  onLogout: () => void;
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  return (
    <div className="relative hidden md:block">
      <AccountButton onClick={toggleDropdown} />

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg dark:bg-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-600">
            <li>
              <button
                onClick={() => navigate("/dashboard")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600">
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/lobby")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600">
                Lobby
              </button>
            </li>
            <li>
              <button
                onClick={onLogout}
                className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-600 hover:dark:text-white">
                Logout
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default AccountDropdown;
