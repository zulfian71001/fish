import dynamic from "next/dynamic";

const Products = dynamic(() => import("@/components/back-office/seller/Products")) ;

const page = () => {
  return (
    <>
      <Products />
    </>
  );
};

export default page;
