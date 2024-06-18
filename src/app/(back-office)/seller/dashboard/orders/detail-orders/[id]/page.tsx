import dynamic from "next/dynamic"

const DetailOrders = dynamic(()=>import("@/components/back-office/seller/DetailOrdersSeller"))

const page = ({params}:{params:{id:string}}) => {
  return (
    <>
    <DetailOrders orderId={params.id}/>
    </>
  )
}

export default page
