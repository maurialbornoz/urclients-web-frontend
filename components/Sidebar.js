import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
const Sidebar = () => {
    const router = useRouter()

    return ( 
        <aside className='bg-green-700 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
            <div>
                <p className='text-white text-4xl font-black'>URClients</p>
            </div>

            <div className='sm:mt-10'>
                <p className='text-white text-lg font-black'>Management</p>
            </div>

            <nav className='mt-5 list-none'>
                <li className={router.pathname === '/home' ? 'bg-green-900 p-2' : 'p-2'}>
                    <Link href="/home">
                        <a className='text-white block'>
                            Your clients
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === '/orders' ? 'bg-green-900 p-2' : 'p-2'}>
                    <Link href="/orders">
                        <a className='text-white block'>
                            Orders
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === '/products' ? 'bg-green-900 p-2' : 'p-2'}>
                    <Link href="/products">
                        <a className='text-white block'>
                            Products
                        </a>
                    </Link>
                </li>
            </nav>

            <div className='sm:mt-10'>
                <p className='text-white text-lg font-black'>Other Options</p>
            </div>
            <nav className='mt-5 list-none'>
                <li className={router.pathname === '/topvendors' ? 'bg-green-900 p-2' : 'p-2'}>
                    <Link href="/topvendors">
                        <a className='text-white block'>
                            Top Vendors
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === '/topclients' ? 'bg-green-900 p-2' : 'p-2'}>
                    <Link href="/topclients">
                        <a className='text-white block'>
                            Top Clients
                        </a>
                    </Link>
                </li>                
            </nav>
        </aside>
     );
}
 
export default Sidebar;