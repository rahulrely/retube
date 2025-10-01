"use client"
import React from 'react';
import LoginPage from "@/components/LoginPage";
import NavBarHome from '@/components/NavBarHome';
import Footer from '@/components/Footer';
import Image from 'next/image';

function page() {
  return (
    <>
    <NavBarHome/>
    <div className="grid gap-3 m-3 grid-cols-7">
        <div className="col-span-1"></div>
        <div className="col-span-2 mt-15">
          <Image
            src="/top.jpg"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
        <div className="col-span-3"><LoginPage/></div>
        <div className="col-span-1"></div>
    </div>
    <footer className='mt-30'><Footer/></footer>
    </>
  )
}

export default page