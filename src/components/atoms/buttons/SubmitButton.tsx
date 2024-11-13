// components/SubmitButton.tsx
import React from "react";

interface SubmitButtonProps {
  label: string;
  onClick?: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="mt-4 transform rounded-md bg-blue-500 px-4 py-2 font-semibold text-white transition-transform duration-200 hover:bg-blue-600 focus:scale-105 dark:bg-blue-600 dark:hover:bg-blue-700">
    {label}
  </button>
);

export default SubmitButton;
