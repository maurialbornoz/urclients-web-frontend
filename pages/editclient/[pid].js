import React from 'react'
import {useRouter} from 'next/router'
import { Report } from 'notiflix/build/notiflix-report-aio';
import Layout from '../../components/Layout'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'

const GET_CLIENT = gql`
    query getClient($id: ID!){
        getClient(id: $id){
            name
            lastname
            email
            company
            phone
        }
    }
`

const UPDATE_CLIENT = gql`
    mutation updateClient($id: ID!, $input: ClientInput){
        updateClient(id:$id, input:$input){
            id
            name
            lastname
            email
            company
        }
    }
`

const EditClient = () => {
    const router = useRouter()
    const {query: {pid}} = router
    
    const {data, loading, error} = useQuery(GET_CLIENT, {
        variables: {
            id: pid
        }
    })

    const [ updateClient] = useMutation(UPDATE_CLIENT)

    // validation schema
    const validationSchema =  Yup.object({
        name: Yup.string()
            .required('Name is required'),
        lastname: Yup.string()
            .required('Lastname is required'),
        email: Yup.string()
            .email('Email not valid')
            .required('Email is required'),
        company: Yup.string()
            .required('Company is required'),
            
    })

    if(loading) return 'Loading'

    const {getClient} = data

    const updateOneClient = async (values) => {
        const {name, lastname, company, email, phone} = values
        try {
            const {data} = await updateClient({
                variables: {
                    id: pid,
                    input: {
                        name, lastname, company, email, phone
                    }
                }
            })
            

            Report.success(
                `The client was updated`,
                '',
                'Ok',
                );

            router.push('/home')
        } catch (error) {
            console.error(error)
        }
    }

    return ( 
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light'>Edit Client</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <Formik
                        validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={getClient}
                        onSubmit={(values) => {
                            updateOneClient(values)
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
                                        <label className='block text-green-800 text-sm font-bold mb-2' htmlFor='lastname'>
                                            Lastname
                                        </label>
                                        <input 
                                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:ring-0 focus:shadow-outline'
                                            id='lastname'
                                            placeholder='Lastame'
                                            type='type'
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.lastname}
                                        />

                                    </div>
                                    {props.touched.lastname && props.errors.lastname ? (
                                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                                <p className='font-bold'>Error</p>
                                                <p>{props.errors.lastname}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.company}
                                        />

                                    </div>
                                    {props.touched.company && props.errors.company ? (
                                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                                <p className='font-bold'>Error</p>
                                                <p>{props.errors.company}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.email}
                                        />

                                    </div>
                                    {props.touched.email && props.errors.email ? (
                                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                                <p className='font-bold'>Error</p>
                                                <p>{props.errors.email}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.phone}
                                        />

                                    </div>
                                    <button
                                        className='bg-green-800 w-full mt-5 p-3 text-white uppercase font-bold hover:bg-green-900'
                                        type='submit'
                                    >
                                        Edit Client
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
 
export default EditClient;