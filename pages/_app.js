import '../styles/globals.css'
import Head from 'next/head'
import {ApolloProvider} from '@apollo/client'
import client from '../config/apollo'
import OrderState from '../context/orders/OrderState'


function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>Vendup</title>
      </Head>
      
        <ApolloProvider client={client}>

            <OrderState>

              <Component {...pageProps} />
            </OrderState>

        </ApolloProvider>
      
    </>
  )
}

export default MyApp
