import dynamic from "next/dynamic";
import Navbar from "@/components/front-office/Navbar";
const Footer = dynamic(() => import("@/components/front-office/Footer"));


const layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className="w-full">
          <Navbar />
        <main>
          {children}
        </main>
        <Footer />
    </div>
  );
};
export default layout;
