"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';

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
    <div
      className="prose max-w-none p-4"
      dangerouslySetInnerHTML={{ __html: HTML }}
    />
  );
}

export default SuccessfullRegistration;