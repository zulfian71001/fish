import dynamic from "next/dynamic"

const DiscountProduct = dynamic(()=>import("@/components/back-office/seller/DiscountProduct"))
const page = () => {
  return (
    <>
      <DiscountProduct/>
    </>
  )
}

export default page
