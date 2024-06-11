const Footer = dynamic(()=>import("@/components/front-office/Footer"))
const CartPage = dynamic(()=>import("@/components/front-office/CartPage"))
import Navbar from "@/components/front-office/Navbar"
import dynamic from "next/dynamic"


const page = () => {
  return (
    <>
    <Navbar/>
     <CartPage/> 
     <Footer/>
    </>
  )
}

export default page
