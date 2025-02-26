'use client';
import React,{ useState } from 'react'
import Link from 'next/link';


function NavBarHome() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <>
    <header className="fixed top-0 inset-x-0 z-50 shadow">
    <nav className="bg-black border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
            {/* Left Side - Logo */}
            <div className="text-4xl font-bold text-[#0F7173] lg:order-1">
                <Link href="/">
                    Retube
                </Link>
            </div>
            

            {/* Right Side -  Navigation Links */}
            <div className="flex items-center space-x-8 lg:order-2">
                <Link
                    href="/"
                    className="text-gray-300 hover:text-white font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5"
                >
                    Home
                </Link>
                <Link
                    href="/about"
                    className="text-gray-300 hover:text-white font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5"
                >
                    About
                </Link>
                <Link
                    href="/login"
                    className="text-gray-300 hover:text-white font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5"
                >
                    Log in
                </Link>
                <Link
                    href="/signup"
                    className="text-white bg-[#0F7173] hover:bg-[#0f727598] focus:ring-4 focus:ring-[#0f7173] font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
                >
                    Get started
                </Link>
            </div>
        </div>
    </nav>
</header>
</>
  )
}

export default NavBarHome