import Head from 'next/head'
import Layout from '../components/Layout'
import Client from '../components/Client'
import {gql, useQuery} from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'

const GET_USER_CLIENTS = gql`
  query getSellerClients {
    getSellerClients{
      name
      lastname
      company
      email
      id
    }
  }
`

export default function Index() {
  
  const {data, loading, error} = useQuery(GET_USER_CLIENTS)
  const router = useRouter()

  if(loading) return (<p>Loading...</p>)

  return (
    <div>
      {!data.getSellerClients ? <p>Not allowed</p> :
      
        <Layout>
          <h1 className='text-2xl text-gray-800 font-light'>Clients</h1>
          <Link href="/newclient">
            <a className='bg-green-700 py-2 px-3 mt-5 inline-block text-white rounded text-sm hover:bg-green-900 mb-3 uppercase font-bold transition ease-in-out delay-100 w-full lg:w-auto text-center'>New Client</a>
          </Link>

          <div className='overflow-x-scroll'>
            <table className='table-auto shadow-md mt-10 w-full w-lg'>
              <thead className='bg-green-800'>
                <tr className='text-white'>
                  <th className='w-1/5 py-2'>Name</th>
                  <th className='w-1/5 py-2'>Company</th>
                  <th className='w-1/5 py-2'>Email</th>
                  <th className='w-1/5 py-2'>Delete</th>
                  <th className='w-1/5 py-2'>Edit</th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                
                { data.getSellerClients.map(client => (
                  <Client
                    key={client.id}
                    client={client}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </Layout>
      }
    </div>
  )
}
