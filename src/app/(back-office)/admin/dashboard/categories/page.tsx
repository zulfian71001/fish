import dynamic from "next/dynamic";

const AddCategory = dynamic(
  () => import("@/components/back-office/AddCategory")
);
const HeaderDashboard = dynamic(
  () => import("@/components/back-office/HeaderDashboard")
);
const ProductCategory = dynamic(
  () => import("@/components/back-office/ProductCategory")
);

const page = () => {
  return (
    <>
      <div className="w-full flex justify-between gap-10 bg-slate-200">
        <ProductCategory />
        <AddCategory />
      </div>
    </>
  );
};

export default page;
