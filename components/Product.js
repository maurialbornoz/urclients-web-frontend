import React from 'react'
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { gql, useMutation } from '@apollo/client';
import Router from 'next/router'

const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: ID!){
        deleteProduct(id: $id)
    }
`

const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      price
      existence
      created
    }
  }
`

const Product = ({product}) => {
    const {name, price, existence, id} = product

    const [deleteProduct] =  useMutation(DELETE_PRODUCT, {
        variables: { id },
        update(cache) {
            const normalizedId = cache.identify({ id, __typename: 'Product' });
            cache.evict({ id: normalizedId });
            cache.gc();
        }
    });

    const confirmDeleteProduct = () => {
        Confirm.show(
            'Confirm',
            'Are you sure you want to delete this product?',
            'Yes',
            'No',
            async function okCb() {
                try {
                    const {data} = await deleteProduct({
                        variables: {
                            id
                        }
                    })
                    Report.success(
                        `${data.deleteProduct}`,
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

    const editProduct = () => {
        Router.push({
            pathname: '/editproduct/[id]',
            query: {id}
        })
    }

    return ( 
        <tr>
            <td className='border px-4 py-2'>{name}</td>
            <td className='border px-4 py-2'>{existence}</td>
            <td className='border px-4 py-2'>${price}</td>
            <td className='border px-4 py-2'>
                <button
                    type='button'
                    className='flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold'
                    onClick={() => confirmDeleteProduct()}
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
                    onClick={() => editProduct()}
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
 
export default Product;