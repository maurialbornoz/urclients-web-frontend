import React, {useState, useEffect, useContext} from 'react'
import Select from 'react-select'
import { gql, useQuery } from '@apollo/client'
import OrderContext from '../../context/orders/OrderContext'

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

const AssignClient = () => {
    const [client, setClient] = useState([])
    const {addClient} = useContext(OrderContext)

    const {data, loading, error} = useQuery(GET_USER_CLIENTS)

    useEffect(() => {
        addClient(client)
    }, [client])

    const selectClient = clients => {
        setClient(clients)
    }

    if(loading) return null

    const {getSellerClients} = data

    return ( 
        <>
            <p className='mt-10 my-2 bg-white border-l-4 border-green-800 text-green-800 p-2 font-bold'>1 - Assing a client for the order</p>
            <Select
                className='mt-3'
                options={getSellerClients}
                onChange={(option) => selectClient(option)}
                getOptionValue={(options) => options.id}
                getOptionLabel={(options) => options.name}
                placeholder="Select a Client"
                noOptionsMessage={() => "No Results"}
            />
        </>
     );
}
 
export default AssignClient;