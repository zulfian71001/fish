import dynamic from "next/dynamic" 
const CustomersChat= dynamic(()=>import("@/components/back-office/seller/CustomersChat")) 


const Page = () => {
  return (
    <>
       <CustomersChat/>
    </>
  )
}

export default Page
