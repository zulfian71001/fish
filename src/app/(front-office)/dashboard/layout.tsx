import dynamic from "next/dynamic";
import Navbar from "@/components/front-office/Navbar";
import SidebarUser from "@/components/front-office/SidebarUser";
const Footer = dynamic(() => import("@/components/front-office/Footer"));
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <Navbar />
      <main className="w-full px-4 gap-4 flex py-6 lg:py-10 bg-slate-200 relative ">
        <SidebarUser />
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default layout;
