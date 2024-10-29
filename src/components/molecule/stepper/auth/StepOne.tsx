// components/StepOne.tsx
import React from "react";
import InputField from "@/components/atoms/inputs/InputFields";
import SubmitButton from "@/components/atoms/buttons/SubmitButton";

interface StepOneProps {
  formData: any;
  updateFormData: (data: any) => void;
  handleNext: () => void;
}

const StepOne: React.FC<StepOneProps> = ({
  formData,
  updateFormData,
  handleNext,
}) => (
  <div>
    <InputField
      label="Email"
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
    <SubmitButton label="Next" onClick={handleNext} />
  </div>
);

export default StepOne;
