"use client"
import React, { use, useEffect, useState } from 'react';

import axios from "axios";
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage(){
  const router  = useRouter();
  const [user,setUser] = useState({
    name : "",
    email : "",
    password : "",
    role : ""
  })

  const  [buttonDisabled,setButtonDisabled] = useState(false);
  const  [loading,setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup",user)
      console.log("sign up  success",response.data);

      router.push("/login");


    } catch (error:any) {
      console.log("sign up failed")
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.role.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])

  return (
    <>
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "SignUp" }</h1>
      <hr/>
      <label htmlFor='name'>name</label>
      <input 
      className='p-2 border-gray-900 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='name'
      value={user.name}
      onChange={(e) => setUser({...user,name:e.target.value})}
      placeholder='name'
      type="text" />
      
      <hr/>
      <label htmlFor='email'>email</label>
      <input 
      className='p-2 border-gray-900 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='email'
      value={user.email}
      onChange={(e) => setUser({...user,email:e.target.value})}
      placeholder='email'
      type="text" />

      <hr/>
      <label htmlFor='password'>password</label>
      <input 
      className='p-2 border-gray-900 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id='password'
      value={user.password}
      onChange={(e) => setUser({...user,password:e.target.value})}
      placeholder='password'
      type="password" />

      <hr/>
      <label htmlFor="role">Choose a Role:</label>
      <select
        className="p-2 border-gray-900 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="role"
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
      >
        <option value="" disabled>Select a role</option>
        <option value="primary">Primary</option>
        <option value="secondary">Secondary</option>
      </select>

      <button 
      onClick={onSignup}
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >{buttonDisabled ? "No Signup" : "SignUp"}</button>
      <Link href="/login">Visit login</Link>
    </div>
    </>
  )
}