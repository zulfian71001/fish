'use client'
import dynamic from "next/dynamic";
const HeaderDashboard = dynamic(()=> import("@/components/back-office/HeaderDashboard")) ;
const SmallCards = dynamic(()=> import("@/components/front-office/SmallCards")) ;
const RecentOrders = dynamic(()=> import("@/components/back-office/RecentOrders")) ;
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { get_dashboard_index_data_admin } from "@/GlobalRedux/features/dashboardReducer";
import { useEffect } from "react";
const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalOrders, pendingOrder, recentOrders, cancelledOrder } =
  useAppSelector((state) => state.dashboardUser);
  useEffect(() => {
    dispatch(get_dashboard_index_data_admin());
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
      <RecentOrders/>
    </div>
  );
};

export default Page;
