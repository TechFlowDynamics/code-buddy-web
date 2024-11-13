// components/InputField.tsx
import React, { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  parentClassName?: string;
  labelClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  parentClassName,
  labelClassName,
  ...props
}) => (
  <div className={`mb-4 ${parentClassName}`}>
    <label
      className={`mb-1 block text-gray-700 dark:text-gray-200 ${labelClassName}`}>
      {label}
    </label>
    <input
      {...props}
      className="w-full transform rounded-md border px-3 py-2 outline-none transition-transform duration-200 focus:scale-105 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-blue-400"
    />
  </div>
);

export default InputField;
