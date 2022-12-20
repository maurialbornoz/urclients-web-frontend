import React from 'react'
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import {gql, useMutation} from '@apollo/client'
import Router from 'next/router'

const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!){
        deleteClient(id:$id)
    }
`

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

const Client = ({client}) => {

    const [deleteClient] = useMutation(DELETE_CLIENT, {
        update(cache) {
            const {getSellerClients} = cache.readQuery({query: GET_USER_CLIENTS})

            // override cache
            cache.writeQuery({
                query: GET_USER_CLIENTS,
                data: {
                    getSellerClients : getSellerClients.filter(client => client.id !== id)
                }
            })
        }
    })

    const {id, name, lastname, company, email} = client

    const confirmDeleteClient = () => {
        Confirm.show(
            'Confirm',
            'Are you sure you want to delete this client?',
            'Yes',
            'No',
            async function okCb() {
                try {
                    const {data} = await deleteClient({
                        variables: {
                            id
                        }
                    })
                    Report.success(
                        `${data.deleteClient}`,
                        '',
                        'Ok',
                        );
                    
                } catch (error) {
                    console.error(error)
                }
            },
            function cancelCb() {
                return
            },
            {
                width: '320px',
                borderRadius: '8px',
                okButtonBackground: '#991B1B',
                titleColor: '#1f2937',
              
            },
          );
    }

    const editClient = () => {
        Router.push({
            pathname: '/editclient/[pid]',
            query: {pid: id}
        })
    }

    return ( 
        <tr>
            <td className='border px-4 py-2'>{name} {lastname}</td>
            <td className='border px-4 py-2'>{company}</td>
            <td className='border px-4 py-2'>{email}</td>
            <td className='border px-4 py-2'>
                <button
                    type='button'
                    className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                    onClick={() => confirmDeleteClient()}
                >
                    Delete
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </button>
            </td>
            <td className='border px-4 py-2'>
                <button
                    type='button'
                    className='flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                    onClick={() => editClient()}
                >
                    Edit
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>



                </button>
            </td>
        </tr>
     );
}
 
export default Client;