import React from "react";

interface StatisticsCardProps {
  title: string;
  value: string;
  progress: number;
}

const StatisticsCard = ({ title, value, progress }: StatisticsCardProps) => {
  return (
    <div className="p-6 rounded-lg bg-glass shadow-md backdrop-blur-sm w-full md:w-1/3">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold mb-4">{value}</p>
      <div className="relative h-2 rounded-full bg-gray-700">
        <div
          className="absolute top-0 left-0 h-2 rounded-full bg-blue-500"
          style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default StatisticsCard;
