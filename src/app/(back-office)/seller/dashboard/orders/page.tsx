import dynamic from "next/dynamic"

const Orders = dynamic(() => import("@/components/back-office/seller/Orders"))
const page = () => {
  return (
    <>
      <Orders/>
    </>
  )
}

export default page
