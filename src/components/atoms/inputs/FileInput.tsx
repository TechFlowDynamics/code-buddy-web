// components/FileInput.tsx
import React from "react";

interface FileInputProps {
  label: string;
  onChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ label, onChange }) => (
  <div className="mb-4">
    <label className="mb-1 block text-gray-700 dark:text-gray-200">
      {label}
    </label>
    <input
      type="file"
      onChange={e => onChange(e.target.files?.[0] || null)}
      className="w-full rounded-md border p-2 dark:border-gray-600 dark:bg-gray-700"
    />
  </div>
);

export default FileInput;
