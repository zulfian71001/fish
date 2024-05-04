import dynamic from "next/dynamic";

const Payment = dynamic(
  () => import("@/components/back-office/seller/Payment")
);
const SmallCardSellers = dynamic(
  () => import("@/components/back-office/seller/SmallCardSellers")
);
const page = () => {
  return (
    <>
      <div className="mb-6">
        <SmallCardSellers />
      </div>
      <Payment />
    </>
  );
};

export default page;
