import React from 'react'
function HeaderVerification() {
  return (
    <>
    <header className="fixed top-0 inset-x-0 shadow">
      <nav className="bg-black border-y border-gray-800 px-4 lg:px-6 py-2.5">
      <div className="flex justify-between items-center mx-auto max-w-screen-xl">
            {/* Left Side - Logo */}
            <div className="text-4xl font-bold text-[#107678] lg:order-1">
              Retube
            </div>
            <div className="flex items-center space-x-8 lg:order-2">
            <span className="text-white text-2xl font-medium px-4 lg:px-5 py-2 lg:py-2.5">
                  Verify Your Account with Email OTP
                </span>
            </div>
      </div>
      </nav>
    </header>
    </>
  )
}

export default HeaderVerification