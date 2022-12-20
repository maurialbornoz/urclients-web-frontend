import React, {useState} from 'react'
import Layout from '../components/Layout'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {useMutation, gql} from '@apollo/client'
import {useRouter} from 'next/router'

const NEW_ACCOUNT = gql`
    mutation newUser($input: UserInput) {
        newUser(input: $input) {
            id
            name
            lastname
            email
            
        }
    }
`

const NewAccount = () => {

    const [message, saveMessage] = useState(null)
    const [newUser] = useMutation(NEW_ACCOUNT)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required'),
            lastname: Yup.string()
                .required('Lastname is required'),
            email: Yup.string()
                .email('Email not valid')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .min(6,'Password should be at least 6 characters'),
        }),
        onSubmit: async values => {
            const {name, lastname, email, password} = values
            try {
                const {data} = await newUser({
                    variables : {
                        input : {
                            name,
                            lastname,
                            email,
                            password
                        }
                    }
                })
                
                saveMessage(`The user was created successfully: ${data.newUser.name}`)
                setTimeout(() => {
                    saveMessage(null)
                    router.push('/login')
                }, 3000);

            } catch (error) {

                // saveMessage(error.message.replace('GraphQL error: ', ''))
                saveMessage(error.message)
                setTimeout(() => {
                    saveMessage(null)
                }, 3000);
            }
        }
    })

    // if(loading) return 'loading...'

    const showMessage = () => {
        return(
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{message}</p>
            </div>
        )
    }
    return ( 
        <>
        <Layout>
            {message && showMessage() }
            <h1 className='text-center text-2xl text-white font-light'>Create new account</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm'>
                    <form
                        className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
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
                                type='text'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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
                                placeholder='Lastname'
                                type='text'
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.lastname && formik.errors.lastname ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.lastname}</p>
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
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        ) : null}
                        <div className='mb-4'>
                            <label className='block text-green-800 text-sm font-bold mb-2' htmlFor='password'>
                                Password
                            </label>
                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:ring-0 focus:shadow-outline'
                                id='password'
                                placeholder='Password'
                                type='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.password}</p>
                            </div>
                        ) : null}
                        <input 
                            type='submit'
                            className='bg-green-800 w-full mt-5 p-2 text-white uppercase hover:bg-green-900'
                            value='Create Account'
                        /> 
                    </form>
                </div>
            </div>
        </Layout>
    </> 
     );
}
 
export default NewAccount;