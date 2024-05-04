import DetailProduct from "@/components/front-office/DetailProduct"
import Footer from "@/components/front-office/Footer"
import Navbar from "@/components/front-office/Navbar"


const Page = ({params}:{params:{id:string}}) => {
  return (
    <>
     <Navbar/>
     <DetailProduct productId={params.id}/>
     <Footer/> 
    </>
  )
}

export default Page
