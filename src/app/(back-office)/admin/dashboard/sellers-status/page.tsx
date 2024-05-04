import dynamic from "next/dynamic"

const SellersStatus = dynamic(()=>import("@/components/back-office/SellersStatus")) 

const page = () => {
  return (
    <>
      <SellersStatus/>
    </>
  )
}

export default page
