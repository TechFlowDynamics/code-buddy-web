// components/StepOne.tsx
import React from "react";

import { useRouter } from "next/navigation";

import SubmitButton from "@/components/atoms/buttons/SubmitButton";
import InputField from "@/components/atoms/inputs/InputFields";

interface StepOneProps {
  formData: any;
  updateFormData: (data: any) => void;
  handleNext: () => void;
}

const StepOne: React.FC<StepOneProps> = ({
  formData,
  updateFormData,
  handleNext,
}) => {
  const router = useRouter();
  return (
    <div>
      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={e => updateFormData({ email: e.target.value })}
      />
      <InputField
        label="Username"
        placeholder="Enter your username"
        value={formData.userName}
        onChange={e => updateFormData({ userName: e.target.value })}
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={e => updateFormData({ password: e.target.value })}
      />
      <div className="mt-4 flex gap-2 text-center">
        Already Part of Buddy Community?
        <button
          onClick={() => router.push("/login")}
          className="text-blue-500 hover:underline">
          Login
        </button>
      </div>
      <SubmitButton label="Next" onClick={handleNext} />
    </div>
  );
};
export default StepOne;
