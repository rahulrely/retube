"use client"
import { useRouter } from 'next/navigation';
import { useState , useEffect} from "react";
import { toast } from "sonner";
import axios, { AxiosError } from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, StatusIcon } from "@/components/CustomIcon";
function VideoPrimary(){
  type VideoType = {
  vid: string;
  title: string;
  description?: string;
  youtubeVideoId:string;
  filePath?: string;
  cloudinaryPublicID?: string;
  status: string;
};

    const [videos, setVideos] = useState<VideoType[]>([]);
    const router = useRouter();

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/videos/video/list");
        const videos = response?.data?.data?.videos || [];

        const formatted = videos
          .filter((v:VideoType) => v) //error
          .map((video: VideoType) => ({
            vid: video.vid,
            title: video.title?.length > 20
              ? video.title.slice(0, 17) + '...'
              : video.title,
            description: (video.description ?? ' ').length > 50
              ? (video.description ?? ' ').slice(0, 47) + '...'
              : video.description,
            youtubeVideoId: video.youtubeVideoId,
            filePath: video.filePath,
            cloudinaryPublicID: video.cloudinaryPublicID,
            status: video.status,
          }));
        setVideos(formatted);
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage = (axiosError.response?.data as {message : string})?.message ?? "Error fetching videos";
        toast.error("Failed in fetching videos",{
        description: errorMessage,
      });
      }
    };

    fetchData();
  }, []);

  console.log(videos);
  const handleClick = (vid: string) => {
  const result = videos.find(video => video.vid === vid);

  if (result?.status === "Approved") {
    toast.warning("Access Denied", {
      description: `This video [${vid}] has already been approved and cannot be edited or reviewed again.`,
    });
  }else if (result?.status === "Rejected") {
    toast.info("Video Rejected", {
      description: `This video [${vid}] has been rejected and will soon be removed.`,
    });
    if(result?.cloudinaryPublicID !== undefined){
        router.push(`videos/${vid}`);
    }
} else {
    router.push(`videos/${vid}`);
  }
};
  
  return (
    <>
      <div className='flex flex-col justify-center items-center mt-15 text-white'>

        <div id="Raw Video List" className="p-4 rounded-xl shadow w-fit">
        <h2 className="text-2xl font-semibold mb-4">Videos</h2>
        <Table className="text-sm">
          <TableCaption>A list of Videos Uploaded.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Video ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Youtube</TableHead>
              <TableHead>Download</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video :VideoType) => (
              <TableRow key={video.vid}>
                <TableCell onClick={() => handleClick(video.vid)} className="hover:text-gray-300">{video.vid}</TableCell>
                <TableCell>{video.title}</TableCell>
                <TableCell>{video.description}</TableCell>
                <TableCell><StatusIcon youtubeVideoId={video.youtubeVideoId} status={video.status}/></TableCell>
                <TableCell><Download href={video.filePath ?? ""} cloudinaryPublicID={video.cloudinaryPublicID ?? ""} status={video.status} /></TableCell>
                <TableCell>{video.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
        </div>
    </>
  )
}

export default VideoPrimary;