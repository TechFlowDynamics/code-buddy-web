// pages/login.tsx
"use client";
import React, { useState } from "react";
import InputField from "@/components/atoms/inputs/InputFields";
import SubmitButton from "@/components/atoms/buttons/SubmitButton";
import BackButton from "@/components/atoms/buttons/BackButton";
import { useAuth } from "@/hooks/AuthContext";
import { useRouter } from "next/navigation";
import snackbar from "@/hooks/useSnackbar";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy user data
    const userData = {
      accessToken: "dummyAccessToken123",
      userId: "1",
      email,
      fullName: "Vivek Kumar",
      active: true,
      isEmailVerified: true,
      registrationStatus: "completed",
    };

    if (!email || !password) {
      console.log("🚀 ~ handleSubmit ~ password:", email);
      snackbar.error("Please enter email and password");
      return;
    }
    if (
      email !== "vivekumar2003bsr@gmail.com" ||
      password !== "Vivekumar@1234"
    ) {
      snackbar.error("Please enter email and password");
      return;
    }
    login(userData); // Pass user data to login function
    router.push("/dashboard"); // Redirect to dashboard
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <BackButton />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-6">
            Login to CodieBuddy
          </h1>

          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <SubmitButton label="Login" />
          </form>

          <div className="text-center mt-4">
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
