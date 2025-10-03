"use client"

import SettingsPrimary from '@/components/SettingsPrimary'
import SettingsSecondary from '@/components/SettingsSecondary'
import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios';

function Settings(){
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
    <div className='pt-6'>
      {role === "Primary" && <SettingsPrimary />}
      {role === "Secondary" && <SettingsSecondary />}
    </div>
    </>
  );
}

export default Settings;