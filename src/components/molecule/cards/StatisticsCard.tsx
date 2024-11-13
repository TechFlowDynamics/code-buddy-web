import React from "react";

interface StatisticsCardProps {
  title: string;
  value: string;
  progress: number;
}

const StatisticsCard = ({ title, value, progress }: StatisticsCardProps) => {
  return (
    <div className="bg-glass w-full rounded-lg p-6 shadow-md backdrop-blur-sm md:w-1/3">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 text-2xl font-bold">{value}</p>
      <div className="relative h-2 rounded-full bg-gray-700">
        <div
          className="absolute left-0 top-0 h-2 rounded-full bg-blue-500"
          style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default StatisticsCard;
