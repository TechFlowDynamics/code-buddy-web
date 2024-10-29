// components/InputField.tsx
import React, { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-gray-700 dark:text-gray-200 mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full px-3 py-2 border rounded-md transition-transform duration-200 transform focus:scale-105 outline-none dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
    />
  </div>
);

export default InputField;
