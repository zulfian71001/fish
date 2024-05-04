import dynamic from "next/dynamic"

const Profile = dynamic(() => import("@/components/back-office/seller/Profile"))
const page = () => {
  return (
    <>
      <Profile/>
    </>
  )
}

export default page
