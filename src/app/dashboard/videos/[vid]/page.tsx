"use client"

import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios';
import VidSecondary from '@/components/VidSecondary';
import VidPrimary from "@/components/VidPrimary";

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
      {role === "Primary" && <VidPrimary />}
      {role === "Secondary" && <VidSecondary />}
    </div>
    </>
  );
}
export default Videos