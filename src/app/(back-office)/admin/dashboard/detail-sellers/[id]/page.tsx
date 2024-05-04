import dynamic from "next/dynamic" 
const DetailSeller= dynamic(()=>import("@/components/back-office/DetailSeller")) 


const Page = ({params}:{params:{id:string}}) => {
  return (
    <>
       <DetailSeller sellerId={params.id}/>
    </>
  )
}

export default Page
