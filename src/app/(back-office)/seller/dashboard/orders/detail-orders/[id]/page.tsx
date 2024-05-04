import dynamic from "next/dynamic"

const DetailOrders = dynamic(()=>import("@/components/back-office/DetailOrders"))

const page = ({params}:{params:{id:string}}) => {
  return (
    <>
    <DetailOrders/>
    </>
  )
}

export default page
