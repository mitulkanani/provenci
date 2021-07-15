import React from 'react'
import { AppProps } from 'next/app'
import { Provider,useSession } from 'next-auth/client'
import Layout from '../components/Layout/Layout'
import { injectStyle } from "react-toastify/dist/inject-style";
import '../styles/index.css'

if (typeof window !== "undefined") {
  injectStyle();
}

function MyApp({ Component, pageProps }: AppProps) {
  const [session, loading] = useSession()
  return <Provider session={pageProps.session}>
    <Layout session={session} title="Proven Cli">
        <Component {...pageProps} />
      </Layout>
    </Provider>
}

export default MyApp
