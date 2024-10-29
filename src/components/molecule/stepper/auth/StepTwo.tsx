// components/StepTwo.tsx
import React from "react";
import InputField from "@/components/atoms/inputs/InputFields";
import SubmitButton from "@/components/atoms/buttons/SubmitButton";

interface StepTwoProps {
  formData: any;
  updateFormData: (data: any) => void;
  handleNext: () => void;
  handlePrev: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({
  formData,
  updateFormData,
  handleNext,
  handlePrev,
}) => (
  <div>
    <InputField
      label="OTP"
      placeholder="Enter your OTP"
      value={formData.otp}
      onChange={e => updateFormData({ otp: e.target.value })}
    />
    <div className="flex justify-between">
      <SubmitButton label="Back" onClick={handlePrev} />
      <SubmitButton label="Next" onClick={handleNext} />
    </div>
  </div>
);

export default StepTwo;
