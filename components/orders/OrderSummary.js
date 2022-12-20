import React, { useContext } from 'react'
import OrderContext from '../../context/orders/OrderContext';
import ProductSummany from './ProductSummary';

const OrderSummary = () => {
    const {products } = useContext(OrderContext)
    
    return ( 
        <>
            <p className='mt-10 my-2 bg-white border-l-4 border-green-800 text-green-800 p-2 font-bold'>3 - Adjust Product Amounts</p>
            {products.length > 0 ? (
                <>
                    {products.map((product) => (
                        <ProductSummany 
                            key={product.id}
                            product={product}
                        />
                    ))}
                </>
            ) : (
                <>
                    <p className='mt-5 text-sm'>No Products</p>
                </>
            )}
        </>
     );
}
 
export default OrderSummary;