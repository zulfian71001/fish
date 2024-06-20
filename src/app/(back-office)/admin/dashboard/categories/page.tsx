import dynamic from "next/dynamic";

const AddCategory = dynamic(
  () => import("@/components/back-office/AddCategory")
);

const ProductCategory = dynamic(
  () => import("@/components/back-office/ProductCategory")
);

const page = () => {
  return (
    <>
      <div className="w-full flex flex-col lg:flex-row justify-between gap-4 lg:gap-2 bg-slate-200">
        <ProductCategory />
        <AddCategory />
      </div>
    </>
  );
};

export default page;
