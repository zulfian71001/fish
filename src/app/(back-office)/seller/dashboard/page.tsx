'use client'
import React from "react";
import LargeCards from "@/components/back-office/LargeCards";
import DashboardCharts from "@/components/back-office/DashboardCharts";
import RecentOrderSeller from "@/components/back-office/seller/RecentOrderSeller";
import dynamic from "next/dynamic";
const HeaderDashboard = dynamic(()=> import("@/components/back-office/HeaderDashboard")) ;
const SmallCards = dynamic(()=> import("@/components/front-office/SmallCards")) ;
const RecentOrders = dynamic(()=> import("@/components/back-office/seller/RecentOrderSeller")) ;
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { get_dashboard_index_data_seller } from "@/GlobalRedux/features/dashboardReducer";
import { useEffect } from "react";
const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalOrders, pendingOrder, recentOrders, cancelledOrder } =
  useAppSelector((state) => state.dashboardUser);
  const { userInfo} = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(get_dashboard_index_data_seller({userId:userInfo._id}));
  }, []);
  return (
    <div className="space-y-8">
      <HeaderDashboard />
      <SmallCards
        totalOrders={totalOrders}
        pendingOrder={pendingOrder}
        cancelledOrder={cancelledOrder}
      />
      {/* <DashboardCharts /> */}
      <RecentOrderSeller />
    </div>
  );
};

export default Page;
