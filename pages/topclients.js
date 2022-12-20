import React, {useEffect} from 'react'
import Layout from '../components/Layout'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql, useQuery } from '@apollo/client';

const BEST_CLIENTS=gql`
    query bestClients {
        bestClients {
            client {
                name
                company
            }
            total
        }
    }
`

const TopClients = () => {
    const {data, loading, error, startPolling, stopPolling} = useQuery(BEST_CLIENTS)
    
    useEffect(() => {
        startPolling(1000)
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])

    if(loading) return 'Loading...'

    const {bestClients} = data

    const clientGraphic = []

    bestClients.map((client, index) => {
        clientGraphic[index] = {
            ...client.client[0],
            total: client.total
        }
    })


    return(
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Top Clients</h1>
                <ResponsiveContainer 
                    width={'99%'}
                    height={550}
                >

                    <BarChart
                        className='mt-10'
                        width={600}
                        height={400}
                        data={clientGraphic}
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

export default TopClients;