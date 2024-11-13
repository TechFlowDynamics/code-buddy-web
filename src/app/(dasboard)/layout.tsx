import React from "react";

import TopNavbar from "@/components/molecule/navbar/TopNavbar";
import Sidebar from "@/components/molecule/sidebar/Sidebar";

import DashboardLayoutClient from "./provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayoutClient>
      <div className="flex min-h-screen bg-to-top-blue-gray text-white">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <TopNavbar />
          <main className="flex-grow overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </DashboardLayoutClient>
  );
};

export default Layout;
