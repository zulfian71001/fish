import dynamic from "next/dynamic" 
const SellerChat= dynamic(()=>import("@/components/back-office/SellerChat")) 


const Page = () => {
  return (
    <>
       <SellerChat/>
    </>
  )
}

export default Page
