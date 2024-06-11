import dynamic from "next/dynamic"
import Navbar from "@/components/front-office/Navbar"
const Shipping = dynamic(()=>import("@/components/front-office/Shipping"))
const Footer = dynamic(()=>import("@/components/front-office/Footer"))



const page = () => {
  return (
    <>
    <Navbar/>
      <Shipping/>
      <Footer/>
    </>
  )
}

export default page
