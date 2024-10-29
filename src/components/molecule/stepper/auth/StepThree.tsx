// components/StepThree.tsx
import React from "react";
import InputField from "@/components/atoms/inputs/InputFields";
import FileInput from "@/components/atoms/inputs/FileInput";
import SubmitButton from "@/components/atoms/buttons/SubmitButton";

interface StepThreeProps {
  formData: any;
  updateFormData: (data: any) => void;
  handlePrev: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({ formData, updateFormData, handlePrev }) => (
  <div>
    <InputField label="First Name" placeholder="Enter your first name" value={formData.firstName} onChange={(e) => updateFormData({ firstName: e.target.value })} />
    <InputField label="Last Name" placeholder="Enter your last name" value={formData.lastName} onChange={(e) => updateFormData({ lastName: e.target.value })} />
    <InputField label="Phone" placeholder="Enter your phone number" value={formData.phone} onChange={(e) => updateFormData({ phone: e.target.value })} />
    <FileInput label="Upload Profile Picture" onChange={(file) => updateFormData({ image: file })} />
    <div className="flex justify-between">
      <SubmitButton label="Back" onClick={handlePrev} />
      <SubmitButton label="Finish" />
    </div>
  </div>
);

export default StepThree;
