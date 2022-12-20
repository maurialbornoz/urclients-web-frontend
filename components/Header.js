import React from 'react'
import {useQuery, gql} from '@apollo/client'
import {useRouter} from 'next/router'

const GET_USER = gql`
    query getUser{
        getUser{
            id
            name
            lastname
            email
            
        }
    }
`

const Header = () => {
    const {data, loading, error} = useQuery(GET_USER)

    const router = useRouter()

    if(loading) return 'Loading...'
    
    if(data.getUser === null){
        router.push('/')
        return null
    }

    const {name, lastname} = data.getUser

    const logout = () => {
        localStorage.removeItem('token')
        router.push('/')
    }


    return ( 
        <div className='sm:flex sm:justify-between mb-5'>

            <p className='mr-2 mb-5 lg:mb-0'>Hello {name} {lastname} </p >
            <button 
                onClick={() => logout()}
                type='button'
                className='bg-green-700 w-full sm:w-auto font-bold uppercase text-xs  py-2 px-2 text-white  hover:bg-green-900'
            >
                Log Out
            </button>
        </div>
     );
}
 
export default Header;