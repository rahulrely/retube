"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import VideoSecondary from '@/components/VideoSecondary';
import VideoPrimary from "@/components/VideoPrimary";

function Videos() {
const [role,setRole] = useState("");

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/users/rolecheck");
      const role = response?.data?.data?.role;
      setRole(role);
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };
  
  fetchData();
}, []);

return (
  <>
    <div>
      {role === "Primary" && <VideoPrimary />}
      {role === "Secondary" && <VideoSecondary />}
    </div>
    </>
  );
}
export default Videos