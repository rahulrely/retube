'use client';

import { RadialChart } from '@/components/RadialChartStorageQuota'
import React, { useEffect, useState } from 'react'
import axios ,{AxiosError} from 'axios';
import { toast } from 'sonner';

type userDetailsType = {
  name: string;
  email:string;
  role: string;
  isVerified: boolean;
  subscription : string;
  subscriptionExpiry : Date;
  usedStorage : Number;
  totalStoarge : Number;
  youtubeChannelID: string;
  linkedUserName:string;
  linkedUserEmail:string;
};

function Dashboard() {
  const [loading,setLoading] = useState<boolean>(false);
  const [userDetails,setUserDetails] = useState<userDetailsType>({
    name: "",
    email: "",
    role: "",
    isVerified: false,
    subscription : "",
    subscriptionExpiry : new Date(),
    usedStorage : 0,
    totalStoarge :0,
    youtubeChannelID: "",
    linkedUserName:"",
    linkedUserEmail:"",
});
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/users/details");
        const userData = response?.data?.data;

        if (!userData) throw new Error("No user data returned");

        setUserDetails({
          name: userData.name,
          email: userData.email,
          role: userData.role,
          isVerified: userData.isVerified,
          linkedUserName: userData.linkedUserName,
          linkedUserEmail: userData.linkedUserEmail,
          subscription: userData.subscription,
          subscriptionExpiry: userData.subscriptionExpiry,
          usedStorage: userData.usedStorage,
          totalStoarge: userData.totalStoarge,
          youtubeChannelID: userData.youtubeChannelID,
        });
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage =
          (axiosError.response?.data as { message: string })?.message ??
          "Error in fetching user";
        toast.error("Failed in fetching User Details", {
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  //Radial Chart Value Calculation
  const initialAngle = 0;
  const finalAngle = (Number(userDetails.usedStorage)/ Number(userDetails.totalStoarge))*360;

  return (
    <>
    <div id="body">
  {RadialChart( initialAngle, finalAngle , Number(userDetails.usedStorage) , Number(userDetails.totalStoarge) )}
    </div>
    </>
  )
}

export default Dashboard
