import React, {useState, useEffect, useContext} from 'react'
import Select from 'react-select'
import { gql, useQuery } from '@apollo/client'
import OrderContext from '../../context/orders/OrderContext'

const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      price
      existence
      
    }
  }
`

const AssignProducts = () => {
    const [products, setProducts] = useState([])

    const {data, loading, error} = useQuery(GET_PRODUCTS)
    const {addProduct} = useContext(OrderContext)

    useEffect(() => {
        // is responsible for adding or removing products from the state
        addProduct(products)
    }, [products])

    const selectProduct = product => {
        setProducts(product)
    }

    if(loading) return null

    const {getProducts} = data

    return ( 
        <>
            <p className='mt-10 my-2 bg-white border-l-4 border-green-800 text-green-800 p-2 font-bold'>2 - Select or search for products</p>
            <Select
                className='mt-3'
                options={getProducts}
                isMulti={true}
                onChange={(option) => selectProduct(option)}
                getOptionValue={(options) => options.id}
                getOptionLabel={(options) => `${options.name} - ${options.existence} available`}
                placeholder="Select a Client"
                noOptionsMessage={() => "No Results"}
            />
        </>
     );
}
 
export default AssignProducts;
