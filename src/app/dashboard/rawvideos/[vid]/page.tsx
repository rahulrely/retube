"use client"

import React, { useEffect, useState } from 'react'
import VideoPlayer from '@/components/VideoPlayer';
import axios from 'axios';
import { useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


type videoProps = {
  vid: string
  filePath: string
  title : string
  status : string
  instructions : string
  cloudinaryPublicID : string
}

function VideoPage() {
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState<videoProps>({
    vid: "",
    filePath: '',
    title: '',
    status : "",
    instructions: "",
    cloudinaryPublicID: '',
  });
  
  const { vid } = useParams();
  
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/raw/${vid}`);
        const videoData = response?.data?.data;
        
        if (!videoData) {
          throw new Error('No video data returned from API');
        }
        
        setVideo({
          vid: videoData.vid || '',
          filePath: videoData.url || '',
          title: videoData.title || '',
          instructions : videoData.instructions || "",
          status : videoData.status || "",
          cloudinaryPublicID: videoData.cloudinaryPublicID || '',
        });

        // videoData.cloudinaryPublicID;
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideo();
  }, [vid]);

  return (
    <div className='ml-6 pt-6'>
      <h1 className='text-4xl font-bold'>View the Raw Video</h1>
      <br/>
      <p className='text-gray-400'>This Video is for editing purpose only.It has been sent by owner</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-50 mt-6">
        <div id='Video Player'>
        {loading && <p className="text-gray-500 mt-4">Loading video...</p>}
        {!loading && video.filePath ? (
          <VideoPlayer videoPublicID={video.cloudinaryPublicID} title={video.title} />
        ) : (!loading  && (
          <p className="text-yellow-500 mt-4">Video file path is missing. Cannot load video player.</p>
        ))}
        </div>
        <div id="video details">
          <Card className="w-90">
        <CardHeader>
          <CardTitle>Video Details</CardTitle>
          <CardDescription>View the uploaded raw video details</CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-gray-400">Unique Video ID</h1>
            <h5 className="border border-solid border-gray-400 rounded-lg p-1.5 pl-6 m-1.5">{video.vid}</h5>
          <h1 className="text-gray-400">Title</h1>
            <h5 className="border border-solid border-gray-400 rounded-lg p-1.5 pl-6 m-1.5">{video.title}</h5>
          <h1 className="text-gray-400">Instructions</h1>
            <h5 className="border border-solid border-gray-400 rounded-lg p-1.5 pl-6 m-1.5">{video.instructions}</h5>
        </CardContent>
          <CardFooter>
            
          </CardFooter>
      </Card>
        </div>
      </div>
    </div>
  );
}
export default VideoPage