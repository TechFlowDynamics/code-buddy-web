import ProfileCard from "../cards/ProfileCards";
import QuestionHome from "../questions/Questions";

import React from "react";

const DashboardContent = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-6">
        <ProfileCard />

        {/* {data.map(item => (
          <StatisticsCard
            key={item.id}
            title={item.title}
            value={item.value}
            progress={item.progress}
          />
        ))} */}
      </div>
      <QuestionHome />
    </div>
  );
};

export default DashboardContent;
