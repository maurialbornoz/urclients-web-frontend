import React, { useState } from 'react'
import Layout from '../components/Layout';

import { useFormik } from 'formik';
import * as Yup from 'yup'

import {gql, useMutation} from '@apollo/client'
import {useRouter} from 'next/router'

const NEW_CLIENT = gql`
    mutation newClient($input: ClientInput){
        newClient(input: $input){
            id
            name
            lastname
            company
            email
            phone
        }
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
const NewClient = () => {
    const router = useRouter()

    const [message, saveMessage] = useState(null)

    const [newClient] = useMutation(NEW_CLIENT, {
        update(cache, {data: {newClient}}) {
            const {getSellerClients} = cache.readQuery({query: GET_USER_CLIENTS})
            // override cache
            cache.writeQuery({
                query: GET_USER_CLIENTS,
                data: {
                    getSellerClients: [...getSellerClients, newClient]
                }
            })
        }
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            company: '',
            email: '',
            phone: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required'),
            lastname: Yup.string()
                .required('Lastame is required'),
            company: Yup.string()
                .required('Company is required'),
            email: Yup.string()
                .email('Email not valid')
                .required('Email is required'),
        }),
        onSubmit: async values => {
            const {name, lastname, company, email, phone} = values
            try {
                const {data} = await newClient({
                    variables: {
                        input: {
                            name,
                            lastname,
                            company,
                            email,
                            phone
                        }
                    }
                })
                
                router.push('/home')
            } catch (error) {
                
                saveMessage(error.message.replace('GraphQL error: ', ''))
                setTimeout(() => {
                    saveMessage(null)
                }, 2000);
            }
        }
    })

    const showMessage = () => {
        return(
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{message}</p>
            </div>
        )
    }

    return ( 
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>New Client</h1>
            {message && showMessage()}
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
                            <label className='block text-green-800 text-sm font-bold mb-2' htmlFor='lastname'>
                                Lastname
                            </label>
                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:ring-0 focus:shadow-outline'
                                id='lastname'
                                placeholder='Lastame'
                                type='type'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastname}
                            />

                        </div>
                        {formik.touched.lastname && formik.errors.lastname ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.lastname}</p>
                                </div>
                            ) : null}
                        <div className='mb-4'>
                            <label className='block text-green-800 text-sm font-bold mb-2' htmlFor='company'>
                                Company
                            </label>
                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:ring-0 focus:shadow-outline'
                                id='company'
                                placeholder='Company'
                                type='type'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.company}
                            />

                        </div>
                        {formik.touched.company && formik.errors.company ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.company}</p>
                                </div>
                            ) : null}
                        <div className='mb-4'>
                            <label className='block text-green-800 text-sm font-bold mb-2' htmlFor='email'>
                                Email
                            </label>
                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:ring-0 focus:shadow-outline'
                                id='email'
                                placeholder='Email'
                                type='email'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />

                        </div>
                        {formik.touched.email && formik.errors.email ? (
                                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                    <p className='font-bold'>Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null}
                        <div className='mb-4'>
                            <label className='block text-green-800 text-sm font-bold mb-2' htmlFor='phone'>
                                Phone
                            </label>
                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:ring-0 focus:shadow-outline'
                                id='phone'
                                placeholder='Phone'
                                type='tel'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                            />

                        </div>
                        <button
                            className='bg-green-800 w-full mt-5 p-3 text-white uppercase font-bold hover:bg-green-900'
                            type='submit'
                        >
                            Register Client
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
     );
}
 
export default NewClient;