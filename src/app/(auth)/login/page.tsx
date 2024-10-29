// pages/login.tsx
import React from "react";
import InputField from "@/components/atoms/inputs/InputFields";
import SubmitButton from "@/components/atoms/buttons/SubmitButton";

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-6">
          Login to CodieBuddy
        </h1>

        <form>
          <InputField 
            label="Email" 
            type="email" 
            placeholder="Enter your email" 
            required 
          />
          <InputField 
            label="Password" 
            type="password" 
            placeholder="Enter your password" 
            required 
          />
          <SubmitButton label="Login" />
        </form>

        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
