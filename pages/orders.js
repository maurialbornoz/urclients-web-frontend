import React, { useEffect } from 'react'

import Layout from '../components/Layout'
import Link from 'next/link'
import Order from '../components/Order'
import { gql, useQuery } from '@apollo/client'

const GET_ORDERS = gql`
query getSellerOrders{
  getSellerOrders {
    id
    order {
      id
      amount
      name
    }

    client {
      id
      name
      lastname
      email
      phone
    }
    state
    total
    seller
  }
}
`

export default function Orders() {

  const {data, loading, error, startPolling, stopPolling } = useQuery(GET_ORDERS)

  useEffect(() => {
    startPolling(1000)
    return () => {
        stopPolling()
    }
  }, [startPolling, stopPolling])

  if(loading) return 'Loading'

  const {getSellerOrders} = data

  return (
    <div>
      {!data.getSellerOrders ? <p>Not allowed</p> :
      
        <Layout>
          <h1 className='text-2xl text-gray-800 font-light'>Orders</h1>
          <Link href="/neworder">
            <a className='bg-green-700 py-2 px-3 mt-5 inline-block text-white rounded text-sm hover:bg-green-900 mb-3 uppercase font-bold transition ease-in-out delay-100 '>New Order</a>
          </Link>
          {getSellerOrders.length === 0 ? (
            <p className='mt-5 text-center text-2xl'>No Orders</p>
          ) : (
            getSellerOrders.map((order) => (
              
              <Order
                key={order.id}
                order={order}
              />
              
            ))
          )}
        </Layout>
      }
    </div>
  )
}
