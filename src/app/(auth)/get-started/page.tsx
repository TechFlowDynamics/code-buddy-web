// pages/getStarted.tsx
"use client";

import React, { useState } from "react";
import FormWrapper from "@/components/atoms/forms/FormWrapper";
import StepOne from "@/components/molecule/stepper/auth/StepOne";
import StepTwo from "@/components/molecule/stepper/auth/StepTwo";
import StepThree from "@/components/molecule/stepper/auth/StepThree";

const GetStarted: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
    otp: "",
    firstName: "",
    lastName: "",
    phone: "",
    image: null,
  });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);
  const updateFormData = (data: any) => setFormData({ ...formData, ...data });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
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
  );
};

export default GetStarted;
