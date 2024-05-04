import Sidebar from "@/components/back-office/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <main className="p-8 bg-slate-200 text-white min-h-screen mt-10 lg:ml-60">
          {children}
        </main>
      </div>
    </div>
  );
};
export default layout;
