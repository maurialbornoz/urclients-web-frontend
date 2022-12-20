import React from 'react'
import Layout from '../components/Layout';
import { Report } from 'notiflix/build/notiflix-report-aio';

import { useFormik } from 'formik';
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client';
import {useRouter} from 'next/router'

const NEW_PRODUCT = gql`
    mutation newProduct($input: ProductInput){
        newProduct(input: $input) {
            id
            existence
            name
            price

        }
    }
`

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

const NewProduct = () => {
    const [newProduct] = useMutation(NEW_PRODUCT, {
        update(cache, {data: {newProduct}}){
            // get from cache
            const {getProducts} = cache.readQuery({query: GET_PRODUCTS})

            // override cache
            cache.writeQuery({
                query: GET_PRODUCTS,
                data: {
                    getProducts: [...getProducts, newProduct]
                }
            })
        }
    })
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            name: '',
            existence: '',
            price: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('The name of the product is required'),
            existence: Yup.number()
                .required('What is the available amount?')
                .positive('Stock should be positive')
                .integer('Stock should be an integer'),
            price: Yup.number()
                .required('Price is required')
                .positive('Price should be positive')
        }),
        onSubmit: async (values) => {
            const {name, existence, price} = values
            try {
                const {data} = await newProduct({
                    variables: {
                        input: {
                            name, existence, price
                        }
                    }
                })
                

                Report.success(
                    `Product created successfully`,
                    '',
                    'Ok',
                );
                router.push('/products')
            } catch (error) {
                console.error(error)
                
            }
        }
    })

    return ( 
        <Layout>

            <h1 className='text-2xl text-gray-800 font-light'>New Product</h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <form
                        className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                        onSubmit={formik.handleSubmit}
                    >
                        <div className='mb-4'>
                            <label className='block text-green-800 text-sm font-bold mb-2' htmlFor='name'>
                                Name
                            </label>
                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:ring-0 focus:shadow-outline'
                                id='name'
                                placeholder='Name'
                                type='type'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            
                        </div>
                        {formik.touched.name && formik.errors.name ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.name}</p>
                                </div>
                            ) : null}
                        <div className='mb-4'>
                            <label className='block text-green-800 text-sm font-bold mb-2' htmlFor='existence'>
                                Stock
                            </label>
                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:ring-0 focus:shadow-outline'
                                id='existence'
                                placeholder='Stock'
                                type='number'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.existence}
                            />
                            
                        </div>
                        {formik.touched.existence && formik.errors.existence ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.existence}</p>
                                </div>
                            ) : null}
                        <div className='mb-4'>
                            <label className='block text-green-800 text-sm font-bold mb-2' htmlFor='price'>
                                Price
                            </label>
                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:ring-0 focus:shadow-outline'
                                id='price'
                                placeholder='Price'
                                type='number'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                            />
                            
                        </div>
                        {formik.touched.price && formik.errors.price ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.price}</p>
                                </div>
                            ) : null}
                        <button
                            className='bg-green-800 w-full mt-5 p-3 text-white uppercase font-bold hover:bg-green-900'
                            type='submit'
                        >
                            Add New Product
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
     );
}
 
export default NewProduct;