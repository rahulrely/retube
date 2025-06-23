"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Footer from '@/components/Footer';

function SuccessfullRegistration() {
  const [HTML, setHTML] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/invite");
        const html = response?.data?.data?.html;
        console.log(html);
        setHTML(html);
      } catch (error) {
        console.error("Error fetching Invite Code:", error);
      }
    };
    fetchData();
  }, []);

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
                  Share Invite and Email with Your Editor
                </span><br/>
            </div>
            <div className="flex  space-x-8 lg:order-3">
            <button className='bg-[#107678] p-2 border rounded'><text className='text-2xl font-bold'>Dashboard</text></button>
            </div>
      </div>
      </nav>
    </header>
    <div
      className="prose max-w-none p-4"
      dangerouslySetInnerHTML={{ __html: HTML }}
    />
    <Footer/>
    </>
  );
}

export default SuccessfullRegistration;