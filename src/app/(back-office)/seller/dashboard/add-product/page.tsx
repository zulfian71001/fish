import dynamic from "next/dynamic";

const AddProduct = dynamic(() => import("@/components/back-office/seller/AddProduct"));
const page = () => {
  return (
    <>
      <AddProduct />
    </>
  );
};

export default page;
