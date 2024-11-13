// pages/login.tsx
"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/AuthContext";
import snackbar from "@/hooks/useSnackbar";

import { BOTTOM_CENTER } from "@/core/constants/snackbar.constant";

import BackButton from "@/components/atoms/buttons/BackButton";
import SubmitButton from "@/components/atoms/buttons/SubmitButton";
import InputField from "@/components/atoms/inputs/InputFields";

// pages/login.tsx

// pages/login.tsx

// pages/login.tsx

// pages/login.tsx

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard"); // Redirect to dashboard
    }
  }, [isLoggedIn]);

  const handleSubmit = (e: React.FormEvent): void => {
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
      snackbar.error("Please enter email and password", BOTTOM_CENTER);
      return;
    }
    if (email !== "vivek.mohit@gmail.com" || password !== "vivek.mohit@1111") {
      snackbar.error("Cross check the credentials again!", BOTTOM_CENTER);
      return;
    }
    login(userData);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 p-4 dark:bg-darkBgColor">
      <BackButton />
      <div className="flex flex-grow items-center justify-center bg-gray-100 dark:bg-darkBgColor">
        <div className="w-full max-w-md rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-lg dark:bg-gray-800/80">
          <h1 className="mb-6 text-center text-2xl font-semibold text-gray-700 dark:text-gray-200">
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
            <div className="mt-4 flex gap-2 text-center">
              New Buddy?
              <button
                type="button"
                onClick={() => router.push("/get-started")}
                className="text-blue-500 hover:underline">
                let's get started
              </button>
            </div>
            <SubmitButton label="Login" />
          </form>

          <div className="mt-4 text-center">
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
