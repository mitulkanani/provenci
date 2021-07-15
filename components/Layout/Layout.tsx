import React, { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Header from './Header'
import SideBar from './Sidebar'
import { signIn,useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
type Props = {
  children?: ReactNode
  title?: string,
  session?:any,
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const [active, setActive] = useState(false);
  const [isSideBarClose,setIsSideBarClose] = useState(true);
  const router = useRouter()
  const [session, loading]:any = useSession()

  useEffect(() => {
    console.log("session?.accessToken",session?.accessToken)
    if(!loading && session?.accessToken) {
      console.log(session?.user?.data?.isFirstTimeLogin)
      if(session?.user?.data?.isFirstTimeLogin){
        router.push(`/set-password/${session.user.data.id}`)
      }else{
        router.push('/profile-page')
      }
    }else if (!loading){
      router.push('/login')
    }
  }, [loading, session])
  const handleClick = () => {
    setActive(!active);
  };
  return(
  <div className='h-screen font-family-Century-Gothic'>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header SideBarClose={setIsSideBarClose}></Header>
    {
      loading && session?.accessToken &&
      <>
      <SideBar SideBarClose={isSideBarClose}/>
      </>
    }
      {children}
  </div>
)
}
export default Layout
