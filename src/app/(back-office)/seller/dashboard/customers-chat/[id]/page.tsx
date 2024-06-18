import SellerToCustomer from '@/components/back-office/seller/SellerToCustomer'
import React from 'react'

const page = ({params}:{params:{ id: string }}) => {
  return (
    <>
        <SellerToCustomer customerId={params.id}/>
    </>
  )
}

export default page
