import ChatToSeller from "@/components/front-office/ChatToSeller"
import React from 'react'

const page = ({params}:{params:{ id: string }}) => {
  return (
    <>
        <ChatToSeller sellerId={params.id}/>
    </>
  )
}

export default page
