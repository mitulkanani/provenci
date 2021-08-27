import React, { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import ActiveLink from '../Helper/ActiveLink'
import Image from 'next/image'

type Props = {
    SideBarClose:Boolean
}

const SideBar = ({SideBarClose}:Props) => {
    const [btnMobileView,setButtonMobileView]:any = useState();
    const [sidebarElement,setSidebarElement]:any = useState();
    useEffect(()=>{

        const btn = document.querySelector(".mobile-menu-button");
        const sidebar = document.querySelector(".sidebar");

        // add our event listener for the click
        btn.addEventListener("click", () => {
            sidebar.classList.toggle("-translate-x-full");
        });
    },[SideBarClose])
    return(
        <>
        <div className="dashboard-page-height sidebar bg-white text-gray-500 w-64 space-y-6 py-7 pl-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
        
            {/* logo */}
            

            {/* nav */}
            <nav>
                <div className='sidebar-link-height'>

                    <ActiveLink activeClassName="active" href="/profile-page">
                        
                        {/* <Link href="/profile-page"> */}
                            <a href="/profile-page" className="block text-center py-2.5 px-4 rounded transition duration-200 sidebar-link-hover hover:sidebar-link-hover hover:text-purple-900">
                                Dashboard
                            </a>
                        {/* </Link> */}
                    </ActiveLink>
                    <a href="" className="block text-center py-2.5 px-4 rounded transition duration-200 sidebar-link-hover hover:text-purple-900">
                        Vault
                    </a>
                    <a href="" className="block text-center py-2.5 px-4 rounded transition duration-200 sidebar-link-hover hover:text-purple-900">
                        Scheduler
                    </a>
                    <ActiveLink activeClassName="active" href="/training">
                        
                        {/* <Link href="/profile-page"> */}
                            <a href="/training" className="block text-center py-2.5 px-4 rounded transition duration-200 sidebar-link-hover hover:sidebar-link-hover hover:text-purple-900">
                                Training
                            </a>
                        {/* </Link> */}
                    </ActiveLink>
                    <ActiveLink activeClassName="active" href="/pci-manager">

                        <a className="block text-center py-2.5 px-4 rounded transition duration-200 sidebar-link-hover hover:text-purple-900">
                            PCI Manager
                        </a>
                    </ActiveLink>
                    {/* <a href="" className="block text-center py-2.5 px-4 rounded transition duration-200 sidebar-link-hover hover:text-purple-900">
                        Antivirus
                    </a>
                    <a href="" className="block text-center py-2.5 px-4 rounded transition duration-200 sidebar-link-hover hover:text-purple-900">
                        Patching
                    </a>
                    <a href="" className="block text-center py-2.5 px-4 rounded transition duration-200 sidebar-link-hover hover:text-purple-900">
                        Security & Training
                    </a> */}
                    <a href="" className="block text-center py-2.5 px-4 rounded transition duration-200 sidebar-link-hover hover:text-purple-900">
                        Policy & Procedures
                    </a>
                    <a href="" className="block text-center py-2.5 px-4 rounded transition duration-200 sidebar-link-hover hover:text-purple-900">
                        Reports
                    </a>
                    
                    
                </div>
                <div>
                <a href="" className="block text-center py-2.5 px-4 rounded transition duration-200 sidebar-link-hover hover:text-purple-900">
                       Settings
                    </a>
                    <a href="" className="block text-center py-2.5 px-4 rounded transition duration-200 sidebar-link-hover hover:text-purple-900">
                        Support
                    </a>
                </div>
            </nav>
        </div>
        </>
    )
}

export default SideBar;