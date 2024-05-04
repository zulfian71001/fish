import Sidebar from "@/components/back-office/SidebarAdmin";
import HeaderDashboard from "@/components/back-office/HeaderDashboard";
import { Toaster } from "react-hot-toast";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <main className=" bg-slate-200 text-white min-h-screen mt-10 ">
          <HeaderDashboard/>
          <Toaster/>
          {children}
        </main>
      </div>
    </div>
  );
};
export default layout;
