// components/AccountButton.tsx
import { Button } from "@mantine/core";
import { FaUserCircle } from "react-icons/fa";

import React from "react";

interface AccountButtonProps {
  onClick?: () => void;
}

const AccountButton: React.FC<AccountButtonProps> = ({ onClick }) => (
  <Button
    onClick={onClick}
    className="flex items-center rounded-full border-2 border-blue-400 bg-transparent p-0 px-2 text-blue-400 hover:text-blue-600/90">
    <FaUserCircle size={20} />
  </Button>
);

export default AccountButton;
