import React from "react";
import StatisticsCard from "../cards/StatisticsCard";
import data from "../../../core/data/dummyData.json";

const DashboardContent = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Your Progress</h2>
      <div className="flex flex-wrap gap-6">
        {data.map(item => (
          <StatisticsCard
            key={item.id}
            title={item.title}
            value={item.value}
            progress={item.progress}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardContent;
