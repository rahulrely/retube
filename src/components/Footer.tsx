import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-black border-y border-gray-800 pb-10 mt-5">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                    <div className="text-4xl font-bold text-[#107678] lg:order-1">
                    Retube
            </div>
            <div className='flex h-3 w-100 text-sm text-gray-400 mb-6'>Collaborate, Approve, Publish Seamlessly to YouTube!</div>
            <span className='text-gray-300 text-sm'>Handcrafted by <a href='https://www.linkedin.com/in/rahulrely'  target='_blank' className='text-[#107678]'>@rahulrely</a></span>
                    </div>                    
                    <div className="pt-4  text-sm  text-gray-400 ">
                    <p>For questions or support, contact us at <a href="mailto:aksrahul@hotmail.com"  className="text-blue-600">aksrahul@hotmail.com</a>.</p>
                    
                    </div>
                                      
                </div>
            </div>
        </footer>
    );
}