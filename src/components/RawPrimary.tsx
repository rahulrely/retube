"use client"

import { Download2 } from "@/components/CustomIcon"
import { zodResolver } from "@hookform/resolvers/zod";
import { rawVideoSchema , rawVideoInput } from "@/schemas/rawVideoSchema";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from 'next/navigation';

function RawPrimary(){
type RawVideo = {
    vid: string;
    title: string;
    instructions?: string;
    status: string;
    filePath?: string;
    cloudinaryPublicID?: string;
};
    const router = useRouter();
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmiting,setIsSubmitting] = useState(false);
    const [submitted,setSubmitted] = useState(false);
    const [rawVideos, setRawVideos] = useState<RawVideo[]>([]);
    const handleFileUpload = (files: File[]) => {
      setFiles(files);
      console.log(files);
    };
    
    //zod
    const form = useForm<rawVideoInput>({
        resolver:zodResolver(rawVideoSchema),
        defaultValues :{
            title : "",
            instructions : ""
        }
  });



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/raw/video/list");
        const rawVideos = response?.data?.data?.rawVideos || [];

        const formatted = rawVideos
          .filter((v: RawVideo) => v)
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

        setRawVideos(formatted);
      } catch (error) {
        console.error("Error fetching raw videos:", error);
      }
    };
    fetchData();
    form.reset();
  }, [isSubmiting,form]);

  useEffect(() => {
  if (submitted) {
    form.reset();       
    setFiles([]);        
    setSubmitted(false); 
  }
}, [submitted]);


  const onSubmit = async (data: rawVideoInput) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('instructions', data.instructions);

      // Append the uploaded file(s)
      files.forEach((file) => {
        formData.append('rawVideoFile', file);  // 'rawVideoFile' is the field name in backend 
      });

      const response = await axios.post("/api/raw/cloud/upload", formData, {  //  /api/v1/raw/cloud/upload
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("You have successfully uploaded video.", {
        description: response.data.message,
      });
      setSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in Uploading Raw", error);
      const axiosError = error as AxiosError;
      let errorMessage = (axiosError.response?.data as { message: string })?.message ?? "Error in Uploading";
      toast.error("Uploading Process Failed", {
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
};

const handleClick = (vid: string) => {
    router.push(`rawvideos/${vid}`);
  };

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
          {rawVideos.map((video : RawVideo) => (
            <TableRow key={video.vid}>
              <TableCell onClick={() => handleClick(video.vid)} className="hover:text-gray-300">{video.vid}</TableCell>
              <TableCell>{video.title}</TableCell>
              <TableCell>{video.instructions}</TableCell>
              <TableCell>{video.status}</TableCell>
              <TableCell><Download2 href={video.filePath ?? ""} cloudinaryPublicID={video.cloudinaryPublicID ?? ""} status={video.status} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  
    <div id="formUpload" className="w-full p-6 rounded-xl shadow">
      <h2 className="text-3xl font-bold text-center mb-6">Send Video to Editor</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Add a title to video" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Instructions for Editor</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. remove the part from 1:49 to 2:02" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full border border-dashed bg-black border-neutral-700 rounded-lg p-4">
            <FileUpload onChange={handleFileUpload} />
          </div>
          <Button type="submit" disabled={isSubmiting} className="w-full">
            {isSubmiting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  </div>
</div>

    </>
  )
}
export default RawPrimary;