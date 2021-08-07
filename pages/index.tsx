import Link from 'next/link'
import Layout from '../components/Layout/Layout'
import Login from '../components/Auth/SignIn'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from "next-auth/client"
import prisma from '../lib/prisma';
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';

export default function IndexPage() {
  // `session` should match `callbacks.session()` in `NextAuth()`
  const [session, loading] = useSession()
	const router = useRouter()

  useEffect(() => {
		// if(!loading && !session?.accessToken) {
		// 	router.push('/login')
		// }
	}, [loading, session])
  
  return (
    // <Layout session={session} title="Proven Cli">
      <>
        
      </>
    // </Layout>
  )
}
