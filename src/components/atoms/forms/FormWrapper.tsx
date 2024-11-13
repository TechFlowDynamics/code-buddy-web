// components/FormWrapper.tsx
import React from "react";

interface FormWrapperProps {
  title?: string;
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ title, children }) => {
  return (
    <div className="mx-auto max-w-lg rounded-lg border border-gray-300/10 bg-white/10 p-8 shadow-lg backdrop-blur-lg dark:bg-gray-800/30">
      {title && (
        <h2 className="mb-6 text-center text-2xl font-bold">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default FormWrapper;
