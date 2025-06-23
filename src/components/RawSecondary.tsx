"use client"

import { useRouter } from "next/navigation";
import {Download2} from "@/components/CustomIcon"
import { useEffect, useState } from "react";
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
} from "@/components/ui/table"

function RawSecondary(){
  type RawVideo = {
  vid: string;
  title: string;
  instructions?: string;
  status: string;
  filePath?: string;
  cloudinaryPublicID?: string;
};
    const [rawVideos, setRawVideos] = useState<RawVideo[]>([]);
    const router = useRouter();
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get("/api/raw/video/list");
            const rawVideos = response?.data?.data?.rawVideos || [];

            const formatted = rawVideos
          .filter((v: RawVideo) => v) //error
          .map((video: RawVideo) => ({
            vid: video.vid,
            title: video.title?.length > 20
              ? video.title.slice(0, 17) + '...'
              : video.title,
            instructions: (video.instructions ?? '').length > 50
              ? (video.instructions ?? '').slice(0, 47) + '...'
              : video.instructions ?? '',
            status: video.status,
            filePath: video.filePath,
            cloudinaryPublicID: video.cloudinaryPublicID,
          }));
            console.log(rawVideos[0])
            setRawVideos(formatted);
        } catch (error) {
            console.error("Error fetching raw videos:", error);
        }
    };

    fetchData();
  }, []);

  const handleClick = (vid: string) => {
    router.push(`rawvideos/${vid}`);
  };

  const statusClick = async(vid: string)=>{
  try {
    const response = await axios.post(`/api/raw/videodownloaded?vid=${vid}`);
    toast.success("Soon Video will be Downloaded.", {
      description: response.data.message,
    });
  } catch (error) {
    console.error("Error in Downloading Raw Video", error);
    const axiosError = error as AxiosError;
    let errorMessage = (axiosError.response?.data as { message: string })?.message ?? "Error in Uploading";
    toast.error("Downlaoding Process Failed", {
      description: errorMessage,
  });
}
}

  return (
    <>
    <div className="min-h-screen p-6 bg-black text-white">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-fit mx-auto">
        <div id="Raw Video List" className="p-4 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Raw Videos</h2>
        <Table className="text-sm">
            <TableCaption>A list of Raw Videos Uploaded.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Video ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Instructions</TableHead>
                    <TableHead>Download</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {rawVideos.map((video :RawVideo) => (
                    <TableRow key={video.vid}>
                    <TableCell onClick={() => handleClick(video.vid)} className="hover:text-gray-300">{video.vid}</TableCell>
                    <TableCell>{video.title}</TableCell>
                    <TableCell>{video.instructions}</TableCell>
                    <TableCell>{video.status}</TableCell>
                    <TableCell onClick={()=>statusClick(video.vid) }><Download2 href={video.filePath ?? ""} cloudinaryPublicID={video.cloudinaryPublicID ?? ""} status={video.status}/></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    </div>
    </div>
    </>
  )
}

export default RawSecondary;