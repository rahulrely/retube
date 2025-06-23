"use client"

import { Textarea } from "@/components/ui/textarea"
import { Download, StatusIcon } from "@/components/CustomIcon";
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { videoSchema , videoInput } from "@/schemas/videoSchema";
import { useForm } from "react-hook-form";
import { useState , useEffect} from "react";
import { toast } from "sonner";
import axios, { AxiosError } from 'axios';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input"
import { Loader2} from 'lucide-react';
function VideoSecondary(){
    const router = useRouter();
    const [tagsInput, setTagsInput] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmiting,setIsSubmitting] = useState(false);
    const [submitted,setSubmitted] = useState(false);
    const [videos, setVideos] = useState<any[]>([]);
    const handleFileUpload = (files: File[]) => {
      setFiles(files);
      console.log(files);
    };

      useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/videos/video/list");
        const videos = response?.data?.data?.videos || [];

        const formatted = videos
          .filter((v: any) => v)
          .map((video: any) => ({
            vid: video.vid,
            title: video.title?.length > 20
              ? video.title.slice(0, 17) + '...'
              : video.title,
            description: video.description?.length > 50
              ? video.description.slice(0, 47) + '...'
              : video.description,
            status: video.status,
            filePath: video.filePath,
            cloudinaryPublicID: video.cloudinaryPublicID,
          }));

        setVideos(formatted);
      } catch (error) {
        console.error("Error fetching raw videos:", error);
      }
    };

    fetchData();
  }, [isSubmiting]);

  //zod
  const form = useForm<videoInput>({
      resolver:zodResolver(videoSchema),
      defaultValues :{
          title : "",
          description : "",
          tags: []
      }
  });
  useEffect(() => {
  if (submitted) {
    form.reset();       
    setFiles([]);        
    setSubmitted(false); 
  }
}, [submitted]);
    
  const onSubmit = async (data: videoInput) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      const tagsArray = tagsInput
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0); // removes empty strings
      formData.append('tags', JSON.stringify(tagsArray)); // stringified if backend expects array
  
      files.forEach((file) => {
        formData.append('videoFile', file);
      });
  
      const response = await axios.post("/api/videos/cloud/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSubmitted(true);
      toast.success("You have successfully uploaded video.", {
        description: response.data.message,
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      let errorMessage = (axiosError.response?.data as { message: string })?.message ?? "Error in Uploading";
      toast.error("Uploading Process Failed", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-fit mx-auto">

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
            {videos.map((vid :any) => (
              <TableRow key={vid.vid}>
                <TableCell onClick={() => handleClick(vid.vid)} className="hover:text-gray-300">{vid.vid}</TableCell>
                <TableCell>{vid.title}</TableCell>
                <TableCell>{vid.description}</TableCell>
                <TableCell><StatusIcon youtubeVideoId={vid.youtubeVideoId} status={vid.status}/></TableCell>
                <TableCell><Download href={vid.filePath} cloudinaryPublicID ={vid.cloudinaryPublicID} status={vid.status}/></TableCell>
                <TableCell>{vid.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

        <div id="form for video upload" className="w-fit mb-8">  
        <h2 className="text-3xl font-bold text-center text-white">Send Video to Owner</h2>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Add a title to video" {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="uploaded from retube" {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Add tags</FormLabel>
                <FormControl>
                    <Input
                    placeholder="Retube, Youtube, API"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>

                <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                <FileUpload onChange={handleFileUpload} />
                </div>
                <Button type="submit" disabled= {isSubmiting} className="w-full">
                  {
                  isSubmiting ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please Wait
                    </>
                  ) : ("Submit")
                  }
                </Button>
              </form>
              </Form>
        </div>
        </div>
      </div>
    </>
  )
}

export default VideoSecondary;