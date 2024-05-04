import dynamic from "next/dynamic";

const ProductPage = dynamic(
  () => import("@/components/front-office/ProductPage")
);

const page = () => {
  return <>
  <ProductPage/>
  </>;
};

export default page;
