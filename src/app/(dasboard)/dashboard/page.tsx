import React from "react";
import DashboardContent from "@/components/molecule/dashboard/DashboardContent";
import ProtectedRoute from "@/components/ProtectedRoute";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
};

export default Dashboard;
