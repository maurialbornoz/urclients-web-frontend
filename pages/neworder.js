import React, { useContext, useState } from 'react'
import Layout from '../components/Layout';
import AssignClient from '../components/orders/AssignClient';
import AssignProducts from '../components/orders/AssignProducts';
import OrderContext from '../context/orders/OrderContext';
import OrderSummary from '../components/orders/OrderSummary';
import Total from '../components/orders/Total';
import {gql, useMutation} from '@apollo/client'
import {useRouter} from 'next/router'
import { Report } from 'notiflix/build/notiflix-report-aio';


const NEW_ORDER = gql`
    mutation newOrder($input: OrderInput){
        newOrder(input:$input){
            id
        }
    }
`

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

const NewOrder = () => {
    const router = useRouter()
    const [message, setMessage ] = useState(null)

    const {client, products, total} = useContext(OrderContext)

    const [newOrder] = useMutation(NEW_ORDER, {
        update(cache, {data: {newOrder}}) {
            const {getSellerOrders} = cache.readQuery({
                query: GET_ORDERS
            })
            
            cache.writeQuery({
                query: GET_ORDERS,
                data: {
                    getSellerOrders: [...getSellerOrders, newOrder]
                }
            })
        }
    })
    

    const validateOrder = () => {
        return !products.every(product => product.amount > 0) || total === 0 || client.length === 0 ? ' opacity-50 cursor-not-allowed ' : ''
    }

    const createNewOrder = async () => {
        const {id} = client
        const order = products.map(({__typename, existence, ...product}) => product)
        
        try {
            const {data} = await newOrder({
                variables: {
                    input: {
                        client: id,
                        total,
                        order
                    }
                }
            })
            router.push('/orders')
            Report.success(
                'The order was created successfully',
                '',
                'Ok',
            );
        } catch (error) {
            setMessage(error.message.replace('GraphQL error: ', ''))

            setTimeout(() => {
                setMessage(null)
            }, 3000);
        }
    }

    const showMessage = () => {
        return (
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{message}</p>
            </div>
        )
    }

    return ( 
        <Layout>

            <h1 className='text-2xl text-gray-800 font-light'>New Order</h1>

            {message && showMessage()}

            <div className='flex justify-center mt-5 '>
                <div className='w-full max-w-xl'>
                    <AssignClient/>
                    <AssignProducts/>
                    <OrderSummary/>
                    <Total/>

                    <button
                        type='button'
                        className={`bg-green-700 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-green-900 ${validateOrder()}`}
                        onClick={() => createNewOrder()}
                    >New Order</button>

                </div>
            </div>
        </Layout>
     );
}
 
export default NewOrder;