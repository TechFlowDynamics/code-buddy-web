// components/FormWrapper.tsx
import React from "react";

interface FormWrapperProps {
  title?: string;
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ title, children }) => {
  return (
    <div className="max-w-lg mx-auto p-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg dark:bg-gray-800/30 border border-gray-300/10">
      {title && (
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default FormWrapper;
