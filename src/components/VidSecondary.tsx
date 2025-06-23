"use client"

import { toast } from "sonner";
import React, { useEffect, useState } from 'react'
import VideoPlayer from '@/components/VideoPlayer';
import axios, { AxiosError } from 'axios';
import { useParams } from "next/navigation";

type videoProps = {
  vid: string
  filePath: string
  title: string
  description: string
  tags: []
  cloudinaryPublicID: string
}

function VidSecondary() {
  const { vid } = useParams();
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState<videoProps>({
    vid: "",
    filePath: '',
    title: '',
    description: '',
    tags: [],
    cloudinaryPublicID: '',
  });

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/videos/${vid}`);
        const videoData = response?.data?.data;

        if (!videoData) throw new Error('No video data returned');

        setVideo({
          vid: videoData.vid || '',
          filePath: videoData.url || '',
          title: videoData.title || '',
          description: videoData.description || '',
          tags: videoData.tags || [],
          cloudinaryPublicID: videoData.cloudinaryPublicID || '',
        });
      } catch (error) {
        const axiosError = error as AxiosError;
        let errorMessage = (axiosError.response?.data as {message : string})?.message ?? "Error fetching video";
        toast.error(`Failed in fetching video[${vid}]`,{
        description: errorMessage,
      });
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [vid]);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-6 w-fit">
      <h1 className="text-2xl md:text-4xl font-bold">View Sent the Video</h1>
      <p className="text-gray-400 text-sm md:text-base mt-1">
        Video has been sent to Owner 
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-50 mt-6">
        {/* Video Player */}
        <div id="Video Player">
          {loading ? (
            <p className="text-gray-500 mt-4">Loading video...</p>
          ) : video.filePath ? (
            <div className="aspect-video w-full">
              <VideoPlayer videoPublicID={video.cloudinaryPublicID} title={video.title} />
            </div>
          ) : (
            <p className="text-yellow-500 mt-4">Video file path is missing. Cannot load video player.</p>
          )}
        </div>
        <div id="video details ml-10">
            <span id="Title" className="mt-2 mb-1">
                <h1 className="text-xl text-gray-400 p-2">Title</h1>
                <pre className="text-xl font-bold border border-gray-600 border-solid rounded-xl p-2">{video.title}</pre>
            </span>
            <span id="Description" className="mt-1 mb-1">
                <h1 className="text-xl text-gray-400 p-2">Description</h1>
                <pre className="text-xl font-bold border border-gray-600 border-solid rounded-xl p-2">{video.description}</pre>
            </span>
            <span id="Tags" className="mt-1 mb-2 ">
                <h1 className="text-xl text-gray-400 p-2">Tags</h1>
                <pre className="text-xl font-bold border border-gray-600 border-solid rounded-xl p-2">{video.tags}</pre>
            </span>
        </div>
      </div>
    </div>
  );
}

export default VidSecondary;