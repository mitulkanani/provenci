import React, { ReactNode, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession,signOut } from 'next-auth/client'


type Props = {
    SideBarClose:any
}

const Logo = () => {
    return <Image src="/images/logo.png" alt="me" layout='fill'
    objectFit='contain' />
}

const Header = ({SideBarClose}:Props) => {
  const [active, setActive] = useState(false);
  const [session, loading] = useSession();
  
    const handleClick = () => {
        setActive(!active);
        SideBarClose(!active);
    };
    return(
      <>
        <div className="text-gray-100 flex justify-end md:hidden">
          <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          </button>
        </div>
        <nav className='flex items-center flex-wrap p-3 '>
          <Link href='/'>
            <a className='header-logo-hw -inline-flex items-center p-2 mr-4 '>
              <Logo />
            </a>
          </Link>
          <div className="text-gray-100 flex justify-end md:hidden">
            {/* <!-- mobile menu button --> */}
            <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            </button>
          </div>
          <button
            className='inline-flex p-3 hover:text-blue-300 rounded lg:hidden text-blue-300 ml-auto hover:text-white outline-none'
            onClick={handleClick}
          >
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
          {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
          <div
            className={`${
              active ? '' : 'hidden'
            }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
          >
            <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
              <Link href='/'>
                <a className='color-13aeb7 lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-blue-300 font-bold items-center justify-center hover:color-13aeb7 hover:text-blue-300 '>
                  QIR Assistance
                </a>
              </Link>
              <Link href='/'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded color-13aeb7 font-bold items-center justify-center hover:color-13aeb7 hover:text-blue-300'>
                  Resources
                </a>
              </Link>
              <Link href='/'>
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded color-13aeb7 font-bold items-center justify-center hover:color-13aeb7 hover:text-blue-300'>
                  Partners
                </a>
              </Link>
              {
                !loading && session?.accessToken &&
                <Link href='/'>
                  <a onClick={() => signOut()} className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded color-13aeb7 font-bold items-center justify-center hover:color-13aeb7 hover:text-blue-300'>
                    Log Out
                  </a>
                </Link>
              }
            </div>
          </div>
        </nav>
      </>
    )
}

export default Header
