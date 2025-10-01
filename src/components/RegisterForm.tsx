"use client"
import Link from 'next/link';
import { useDebounceCallback } from 'usehooks-ts'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter} from 'next/navigation';
import { signUpSchema,SignUpInput} from '@/schemas/registerSchema';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react';

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

function RegisterForm() {
  const [email,setEmail] = useState("");
  const [emailMessage,setEmailMessage] = useState("");
  const [,setIsCheckingEmail] = useState(false);
  const [isSubmiting,setIsSubmitting] = useState(false);
  //debounce
  const debounced = useDebounceCallback(setEmail,300);
  const router = useRouter();
  //zod
  const form = useForm<SignUpInput>({
    resolver:zodResolver(signUpSchema),
    defaultValues :{
      name : "",
      email:"",
      password:"",
      role :"select"
    }
  });
  useEffect(() => {
    const checkEmail = async () => {
      if (email && isValidEmail(email)) {
        setIsCheckingEmail(true);
        setEmailMessage("");
        try {
          const response = await axios.get(`/api/users/emailavailability?email=${email}`);
          setEmailMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError;
          setEmailMessage(
            (axiosError.response?.data as { message: string })?.message ?? "Error checking email"
          );
        } finally {
          setIsCheckingEmail(false);
        }
      }
    };
  
    checkEmail();
  }, [email]);  

  const onSubmit = async(data:SignUpInput) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/users/register",data, { withCredentials: true }) ///api/v1/users/register
      toast.success("You are Successfully Registered",{
        description: response.data.message
      })
      router.replace("/register/verification");
      setIsSubmitting(false)
    } catch (error) {
      console.error("error in signup",error);
      const axiosError = error as AxiosError;
      console.log("JI : ",axiosError);
      // const errorMessage = (axiosError.response?.data as {message : string})?.message ?? "error in signUp";
      const errorMessage = (axiosError as {message : string})?.message  ?? "Error in Sign up";
      toast.error("Registeration Failed",{
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
  }
  return(
      <>
      <div className='flex flex-col justify-center items-center mt-15 text-white'>
        <div className=" mt-2 p-5 rounded-2xl shadow-2xl w-full max-w-md space-y-4">
        <h2 className="text-3xl font-bold text-center text-white">Register</h2>
          <div>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Write your fullname" {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="mail@example.com" {...field} 
                      onChange={(e)=>{field.onChange(e)
                        debounced(e.target.value);
                      }}
                      />
                    </FormControl>
                    {emailMessage && (
                        <p className="text-sm text-yellow-400 mt-1">{emailMessage}</p>
                    )}
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
               <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className='w-full h-12'>
                            <SelectValue placeholder="Select a role"/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="select">select</SelectItem>
                          <SelectItem value="Primary">Primary</SelectItem>
                          <SelectItem value="Secondary">Secondary</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled= {isSubmiting} className='w-full mt-3'>
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
          <p>
          By Registering, you agree to our <Link href="/privacy" className="mt-4 text-blue-200 hover:underline">Privacy Policy </Link> and <Link href="/terms" className="mt-4 text-blue-200 hover:underline">Terms & Conditions.</Link>
          <br/>
          </p>
          <Link href="/login" className="mt-4 text-blue-400 hover:underline">If already registered, click to Login</Link>
        </div>
      </div>
      </>
  );
}
export default RegisterForm