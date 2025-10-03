"use client"

import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { signInSchema,SignInInput} from '@/schemas/signInSchema';
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


function LoginPage() {
  const [isSubmiting,setIsSubmitting] = useState(false);
  const router = useRouter();
  //zod
  const form = useForm<SignInInput>({
    resolver:zodResolver(signInSchema),
    defaultValues :{
      email:"",
      password:"",
    }
  });
  const onSubmit = async(data:SignInInput) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/users/login",data); ///api/v1/users/register
      toast.success("You are Successfully Logged In",{
        description: response.data.message
      })
      router.replace("/dashboard");
      setIsSubmitting(false)
    } catch (error) {
      console.error("Error In Login",error)
      const axiosError = error as AxiosError;
      const errorMessage = (axiosError.response?.data as {message : string})?.message ?? "Logging Failed";
      toast.error("Logging In Failed",{
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
  }
  return (
    <>
      <div className='flex flex-col justify-center items-center mt-15 text-white'>
        <div className=" mt-2 p-5 rounded-2xl shadow-2xl w-full max-w-md space-y-4">
        <h2 className="text-3xl font-bold text-center text-white">Log In</h2>
          <div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <Button type="submit" disabled= {isSubmiting} className='w-full mt-4'>
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
          <Link href="/register" className="mt-4 text-blue-400 hover:underline">Not Registered, Click to Register</Link>
        </div>
      </div>
      </>
  )
}

export default LoginPage