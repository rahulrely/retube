"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BackendCheck() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get("/api/hello")
      .then(res => {
        setMessage(res.data.message);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1 className='text-5xl text-white mt-31'>{message || 'Backend isn\'t connected. OR Loading...'}</h1>
    </div>
  );
}
