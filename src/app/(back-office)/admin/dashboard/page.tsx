'use client'
import dynamic from "next/dynamic";
const HeaderDashboard = dynamic(()=> import("@/components/back-office/HeaderDashboard")) ;
const SmallCards = dynamic(()=> import("@/components/front-office/SmallCards")) ;
const RecentOrders = dynamic(()=> import("@/components/back-office/RecentOrders")) ;
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/GlobalRedux/store";
import { get_dashboard_index_data_admin } from "@/GlobalRedux/features/dashboardReducer";
import { useEffect } from "react";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
const Page = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const { totalOrders, pendingOrder, recentOrders, cancelledOrder } =
  useAppSelector((state) => state.dashboardUser);
  const {role} = useAppSelector((state)=>state.auth)
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
