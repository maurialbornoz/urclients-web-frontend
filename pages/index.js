import React, {useState} from 'react'
import Layout from '../components/Layout'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {gql, useMutation} from '@apollo/client'
import {useRouter} from 'next/router'
import Link from 'next/link'

const AUTHENTICATE_USER = gql`
    mutation authenticateUser($input: AuthenticateInput){
        authenticateUser(input: $input) {
            token
        }
    } 
`
 
const Login = () => {
    const [message, saveMessage] = useState(null)
    const router = useRouter()
    const [authenticateUser] = useMutation(AUTHENTICATE_USER)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Email not valid')
                .required('Email is required'),
            password: Yup.string()
            .required('Password is required')
        }),
        onSubmit: async values => {
            const {email, password} = values
            try {
                const {data} = await authenticateUser({
                    variables: {
                        input: {
                            email,
                            password
                        }
                    }
                })
                
                saveMessage('Authenticating...')

                setTimeout(() => {
                    const {token} = data.authenticateUser
                    localStorage.setItem('token', token)
                }, 1000);

                setTimeout(() => {
                    saveMessage(null)
                    router.push('/home')
                }, 1000);
            } catch (error) { 
                saveMessage(error.message.replace('GraphQL error: ', ''))
                setTimeout(() => {
                    saveMessage(null)
                }, 3000);
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
        <>
        <Layout>
            {message && showMessage() }
            <h1 className='text-center text-2xl text-white font-light'>Login</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm'>
                    <form
                        className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                        onSubmit={formik.handleSubmit}
                    >
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
                            <label className='block text-green-800 text-sm font-bold mb-2' htmlFor='password'>
                                Password
                            </label>
                            <input 
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight  focus:ring-0 focus:shadow-outline'
                                id='password'
                                placeholder='Password'
                                type='password'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
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
                            value='Log In'
                        /> 
                        <Link href="/newaccount">
                            <a className='bg-green-800 py-2 px-3 mt-5 inline-block text-white  hover:bg-green-900 mb-3 uppercase w-full text-center'>Register</a>
                        </Link>
                    </form>
                </div>
            </div>
        </Layout>
    </> 
     );
}
 
export default Login;