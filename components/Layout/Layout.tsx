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
  const [isSideBarClose,setIsSideBarClose] = useState(false);
  const router = useRouter()
  const [session, loading]:any = useSession()

  useEffect(() => {
    if(!loading && session?.accessToken) {
      if(session?.user?.data?.isFirstTimeLogin){
        router.push(`/set-password/${session.user.data.id}`)
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
    <div className="relative md:flex">

      {
        session?.accessToken &&
        <SideBar SideBarClose={isSideBarClose}/>
      }
      <div className="flex-1 content-height font-bold background-content-body">

        {children}
      </div>
    </div>
  </div>
)
}
export default Layout
