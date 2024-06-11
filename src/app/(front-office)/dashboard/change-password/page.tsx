import dynamic from "next/dynamic"
const ChangePassword = dynamic(()=>import("@/components/front-office/ChangePassword"))
const page = () => {
  return (
    <>
      <ChangePassword/>
    </>
  )
}

export default page
