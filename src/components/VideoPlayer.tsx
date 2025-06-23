"use client"
import React from 'react';

type VideoPlayerProps = {
  videoPublicID: string
  title?: string
}

// Render a YouTube video player
const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoPublicID, title }) => {
  const PublicID = videoPublicID.split('/');
  const cloudinaryPublicID = `${PublicID[0]}%2F${PublicID[1]}`;
  const videoURL = `https://player.cloudinary.com/embed/?cloud_name=rs14jr&public_id=${cloudinaryPublicID}&profile=cld-adaptive-stream`
  return (
    <>
      <iframe
      className=""
      src = { videoURL }
      width="613"
      height="345"
      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
      allowFullScreen
      title = { title || "Cloudinary Video Player : VideoTitle Not Provided" }
    ></iframe>
    </>
  )
}

export default VideoPlayer