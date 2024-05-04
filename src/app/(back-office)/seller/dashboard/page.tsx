import React from "react";
import HeaderDashboard from "@/components/back-office/HeaderDashboard";
import LargeCards from "@/components/back-office/LargeCards";
import SmallCards from "@/components/back-office/SmallCards";
import DashboardCharts from "@/components/back-office/DashboardCharts";

const page = () => {
  return (
    <div className="space-y-8">
      <HeaderDashboard />
      <SmallCards />
      <DashboardCharts />
    </div>
  );
};

export default page;
