import React, { useContext } from 'react'
import OrderContext from '../../context/orders/OrderContext';
const Total = () => {
    const {total} = useContext(OrderContext)

    return ( 
        <div className='flex items-center mt-5 justify-between bg-white p-3 '>
            <h1 className='text-gray-800 text-lg'>Total</h1>
            <p className='text-gray-800 mt-0'>${total}</p>

        </div>
    );
}
 
export default Total;