import dynamic from "next/dynamic";
const HeaderDashboard = dynamic(()=> import("@/components/back-office/HeaderDashboard")) ;
const SmallCards = dynamic(()=> import("@/components/back-office/SmallCards")) ;
const DashboardCharts = dynamic(()=> import("@/components/back-office/DashboardCharts")) ;
const RecentOrders = dynamic(()=> import("@/components/back-office/RecentOrders")) ;

const page = () => {
  return (
    <div className="space-y-8">
      <HeaderDashboard />
      <SmallCards />
      <DashboardCharts />
      <RecentOrders/>
    </div>
  );
};

export default page;
