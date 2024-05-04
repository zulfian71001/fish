import dynamic from "next/dynamic" 
const AdminChat= dynamic(()=>import("@/components/back-office/seller/AdminChat")) 


const Page = () => {
  return (
    <>
       <AdminChat/>
    </>
  )
}

export default Page
