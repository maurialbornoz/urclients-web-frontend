import React from 'react'
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { gql, useQuery, useMutation } from '@apollo/client';
import {Formik} from 'formik'
import * as Yup from 'yup'
import { Report } from 'notiflix';

const GET_PRODUCT = gql`
    query getProduct($id: ID!){
        getProduct(id: $id){
            name
            existence
            price
        }
    }
`

const UPDATE_PRODUCT = gql`
    mutation updateProduct($id: ID!, $input: ProductInput){
        updateProduct(id: $id, input: $input){
            id
            name
            existence
            price
        }
    }
`

const EditProduct = () => {
    const router = useRouter()
    const {query: {pid}} = router

    const {data, loading, error} = useQuery(GET_PRODUCT, {
        variables: {
            id: pid
        }
    })

    const [updateProduct] = useMutation(UPDATE_PRODUCT)

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('The name of the product is required'),
        existence: Yup.number()
            .required('What is the available amount?')
            .positive('Stock should be positive')
            .integer('Stock should be an integer'),
        price: Yup.number()
            .required('Price is required')
            .positive('Price should be positive')
    })

    if(loading) return 'Loading'

    if(!data) {
        return 'Access denied'
    }

    const updateOneProduct = async (values) => {
        const {name, existence, price} = values
        try {
            const {data} = await updateProduct({
                variables: {
                    id: pid,
                    input: {
                        name, existence, price
                    }
                }
            })
            router.push('/products')

            Report.success(
                `The product was updated`,
                '',
                'Ok',
            );
        } catch (error) {
            console.error(error)
        }
    }

    const {getProduct} = data


    return ( 
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Edit Product</h1>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <Formik
                        enableReinitialize
                        initialValues={getProduct}
                        validationSchema={validationSchema}
                        onSubmit= {(values) => {
                            updateOneProduct(values)
                        }}
                    >
                        {props => {
                            return (
                                <form
                                    className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
                                    onSubmit={props.handleSubmit}
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.name}
                                        />
                                        
                                    </div>
                                    {props.touched.name && props.errors.name ? (
                                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                                <p className='font-bold'>Error</p>
                                                <p>{props.errors.name}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.existence}
                                        />
                                        
                                    </div>
                                    {props.touched.existence && props.errors.existence ? (
                                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                                <p className='font-bold'>Error</p>
                                                <p>{props.errors.existence}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.price}
                                        />
                                        
                                    </div>
                                    {props.touched.price && props.errors.price ? (
                                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                                <p className='font-bold'>Error</p>
                                                <p>{props.errors.price}</p>
                                            </div>
                                        ) : null}
                                    <button
                                        className='bg-green-800 w-full mt-5 p-3 text-white uppercase font-bold hover:bg-green-900'
                                        type='submit'
                                    >
                                        Edit Product
                                    </button>
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>

        </Layout>
     );
}
 
export default EditProduct;