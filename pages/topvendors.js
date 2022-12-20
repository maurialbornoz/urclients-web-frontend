import React, {useEffect} from 'react'
import Layout from '../components/Layout'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql, useQuery } from '@apollo/client';

const BEST_SELLERS=gql`
    query bestSellers{
        bestSellers {
            seller {
                name
                email
            }
            total
        }
    }
`

const TopVendors = () => {
    const {data, loading, error, startPolling, stopPolling} = useQuery(BEST_SELLERS)
    
    useEffect(() => {
        startPolling(1000)
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])

    if(loading) return 'Loading...'

    const {bestSellers} = data

    const sellerGraphic = []

    bestSellers.map((seller, index) => {
        sellerGraphic[index] = {
            ...seller.seller[0],
            total: seller.total
        }
    })


    return(
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Top Vendors</h1>
                <ResponsiveContainer 
                    width={'99%'}
                    height={550}
                >
                    <BarChart
                        className='mt-10'
                        width={600}
                        height={400}
                        data={sellerGraphic}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="#0369a1" />
                    </BarChart>
                </ResponsiveContainer>
        </Layout>
    )
}

export default TopVendors;