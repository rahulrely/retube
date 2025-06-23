"use client"

import { useRouter } from 'next/navigation';
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react'
import VideoPlayer from '@/components/VideoPlayer';
import axios, { AxiosError } from 'axios';
import { videoSchemaFinal, videoInputFinal } from "@/schemas/videoSchema";
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
  Select,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CategorySelectContent from "@/components/SelectCategory"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react';
import { useParams } from "next/navigation";

type videoProps = {
  vid: string
  filePath: string
  title: string
  description: string
  tags: []
  cloudinaryPublicID: string
}

function VidPrimary() {
  const router = useRouter();
  const { vid } = useParams();
  const [tagsInput, setTagsInput] = useState("");
  const [isSubmiting, setIsSubmitting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState<videoProps>({
    vid: "",
    filePath: '',
    title: '',
    description: '',
    tags: [],
    cloudinaryPublicID: '',
  });
  
  const form = useForm<videoInputFinal>({
    resolver: zodResolver(videoSchemaFinal),
    defaultValues: {
      title: video.title,
      description: video.description,
      tags: video.tags,
      categoryId: "22"
    }
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
    form.reset();
  }, [vid,form]);


  const onSubmit = async (data: videoInputFinal) => {
    setIsSubmitting(true);
    try {
      const payload = {
      ...data,
      tags: tagsInput.split(',').map(tag => tag.trim()), // inject tags here
    };
      console.log("rahul 11");
      const response = await axios.post(`/api/videos/youtube/approval?vid=${vid}`,payload);
      console.log("rahul 22");
      setSubmitted(true);
      toast.success("You have successfully uploaded the video.", {
        description: response.data.message,
      });
      router.back();
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError;
      let errorMessage = (axiosError.response?.data as { message: string })?.message ?? "Error in Uploading";
      toast.error("Uploading Process Failed", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const rejectVideo = async () => {
    setIsRejecting(true);
    try {
      const response = await axios.post(`/api/videos/youtube/reject?vid=${vid}`);
      toast.success("Video Rejection Successful.", {
        description: response.data.message,
      });
      router.back();
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = (axiosError.response?.data as { message: string })?.message ?? "Error in Rejection";
      toast.error("Video Rejection Failed", {
        description: errorMessage,
      });
    } finally {
      setIsRejecting(false);
    }
  };

  useEffect(() => {
    if (submitted) {
      form.reset();
      setSubmitted(false);
    }
  }, [submitted]);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-6 w-fit">
      <h1 className="text-2xl md:text-4xl font-bold">Approve the Video</h1>
      <p className="text-gray-400 text-sm md:text-base mt-1">
        Upon Approval, video will be pushed to your YouTube Channel
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 w-fit">
        {/* Form */}
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-center text-white mb-4">Upload Details</h2>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder={video.title} {...field} className="w-full" />
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder={video.description} {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="e.g. Retube, YouTube, API"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <CategorySelectContent />
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="w-full sm:w-auto bg-green-500"
                  type="submit"
                  disabled={isSubmiting}
                >
                  {isSubmiting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                    </>
                  ) : "Approve"}
                </Button>

                <Button
                  className="w-full sm:w-auto bg-red-500"
                  type="button"
                  onClick={rejectVideo}
                  disabled={isRejecting}
                >
                  {isRejecting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                    </>
                  ) : "Reject"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Video Player */}
        <div className="w-fit">
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
      </div>
    </div>
  );
}

export default VidPrimary;