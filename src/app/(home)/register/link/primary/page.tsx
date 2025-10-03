"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AxiosError } from 'axios';
import axios from '@/lib/axios';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react';
import {LinkPrimarySchema,LinkPrimaryInput} from "@/schemas/registerSchema"
import Footer from '@/components/Footer';
function PrimaryLink() {
  const [isSubmiting,setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<LinkPrimaryInput>({
    resolver:zodResolver(LinkPrimarySchema),
    defaultValues :{
      email:"",
      inviteCode:""
    }
  });

  const onSubmit = async(data:LinkPrimaryInput) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/users/linkprimary",data) ///api/v1/users/register
      toast.success("You are Successfully Linked with Your Primary Account",{
        description: response.data.message
      })
      router.replace("/login");
      setIsSubmitting(false)
    } catch (error) {
      console.error("Error in Linking Accounts",error)
      const axiosError = error as AxiosError;
      // const errorMessage = (axiosError.response?.data as {message : string})?.message ?? "Error in linking Accounts";
      const errorMessage = (axiosError as {message : string})?.message  ?? "Unknown error in linking accounts";
      toast.error("Accounts linking failed",{
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
  }

  return (
    <>
    <div className='flex flex-col justify-center items-center mt-15 text-white'>
        <div className=" mt-2 p-5 rounded-2xl shadow-2xl w-full max-w-md space-y-4">
        <h2 className="text-3xl font-bold text-center text-white mb-15">Link Your Account with Your Primary User</h2>
          <div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary User&apos;s Email</FormLabel>
                    <FormControl>
                      <Input placeholder="mail@example.com" {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inviteCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invite Code</FormLabel>
                    <FormControl>
                      <Input placeholder="abc@12.....5#$" {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
                <Button type="submit" disabled ={isSubmiting}>
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
      <footer className="mt-30"><Footer/></footer>
    </>

  )
}

export default PrimaryLink