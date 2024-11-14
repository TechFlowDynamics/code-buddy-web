"use client";

import { useSelector } from "react-redux";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { RootState } from "@/store/store";

import { useAuth } from "@/hooks/AuthContext";

import { useLoginHandler } from "@/actions/auth.actions";

import { Purpose } from "@/core/interface/auth.interface";

import BackButton from "@/components/atoms/buttons/BackButton";
import FormWrapper from "@/components/atoms/forms/FormWrapper";
import StepOne from "@/components/molecule/stepper/auth/StepOne";
import StepThree from "@/components/molecule/stepper/auth/StepThree";
import StepTwo from "@/components/molecule/stepper/auth/StepTwo";

const GetStarted: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const userStep = useSelector((state: RootState) => state.auth.step);
  const router = useRouter();
  const { handlerSignUp, handlerVerifyOtp } = useLoginHandler();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard"); // Redirect to dashboard
    }
  }, [isLoggedIn]);
  const [step, setStep] = useState(userStep);
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
    firstName: "",
    purpose: Purpose.SIGNUP,
    code: "",
    lastName: "",
    phone: "",
    image: null,
  });

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ userStep:", userStep);
    if (userStep) {
      setStep(userStep);
    }
  }, [userStep]);

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      userName: prevData.userName ? prevData.userName.toLowerCase() : "",
      email: prevData.email ? prevData.email.toLowerCase() : "",
    }));
  }, [formData.userName, formData.email]);

  const handleNext = async () => {
    let flag;
    switch (step) {
      case 1:
        flag = await handlerSignUp(formData);
        break;
      case 2:
        flag = await handlerVerifyOtp(formData);
        break;

      default:
        break;
    }
    if (flag) {
      setStep(step + 1);
    }
  };
  const handlePrev = () => setStep(step - 1);
  const updateFormData = (data: any) => setFormData({ ...formData, ...data });

  return (
    <div className="min-h-screen bg-gray-100 p-4 dark:bg-gray-900">
      <BackButton />
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur-lg dark:bg-gray-800/80">
          <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Get Started
          </h1>
          <FormWrapper>
            {step === 1 && (
              <StepOne
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleNext}
              />
            )}
            {step === 2 && (
              <StepTwo
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            )}
            {step === 3 && (
              <StepThree
                formData={formData}
                updateFormData={updateFormData}
                handlePrev={handlePrev}
              />
            )}
          </FormWrapper>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
