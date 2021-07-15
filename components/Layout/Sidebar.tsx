import React, { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
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
            <div className="dashboard-page-height sidebar bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">

            {/* logo */}
            

            {/* nav */}
            <nav>
            <a href="#" className="block text-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                Home
            </a>
            <a href="" className="block text-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                About
            </a>
            <a href="" className="block text-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                Features
            </a>
            <a href="" className="block text-center py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                Pricing
            </a>
            </nav>
        </div>
        </>
    )
}

export default SideBar;