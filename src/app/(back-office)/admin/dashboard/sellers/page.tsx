import dynamic from "next/dynamic";
const SellersData = dynamic(()=>import("@/components/back-office/SellersData")) 
const page = () => {
  return <>
  <SellersData/>
  </>;
};

export default page;
