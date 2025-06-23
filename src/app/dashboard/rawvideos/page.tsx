"use client"

import RawPrimary from '@/components/RawPrimary'
import RawSecondary from '@/components/RawSecondary'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

function RawVideos(){
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
      {role === "Primary" && <RawPrimary />}
      {role === "Secondary" && <RawSecondary />}
    </div>
    </>
  );
}

export default RawVideos;