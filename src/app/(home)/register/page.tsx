"use client"
import React from 'react';
import RegisterForm from "@/components/RegisterForm";
import NavBarHome from "@/components/NavBarHome";
import Footer from '@/components/Footer';
import Image from 'next/image';
function Register() {
  return (
    <><div>
    <NavBarHome/>
    <div className="grid grid-cols-9">
        <div className="col-span-1"></div>
        <div className="col-span-3 mt-15">
          <Image
            src="/top.jpg"
            width={500}
            height={500}
            alt="Picture of the author"
          />
    </div>
        <div className="col-span-3"><RegisterForm/></div>
        <div className="col-span-2"></div>
    </div>
    <Footer/>
    </div>
    </>
  )
}

export default Register