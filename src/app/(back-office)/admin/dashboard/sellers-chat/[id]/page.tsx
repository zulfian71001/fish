import AdminToSeller from '@/components/back-office/AdminToSellerChat'
import React from 'react'

const page = ({params}:{params:{ id: string }}) => {
  return (
    <>
        <AdminToSeller sellerId={params.id}/>
    </>
  )
}

export default page
