"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { nameEditSchema, nameEditInput } from "@/schemas/nameEditSchema";
import {ResetPasswordSchema,ResetPasswordInput} from "@/schemas/registerSchema"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserRoundPen } from "lucide-react";
import RotateCcwKey from "@/icons/rotate-ccw-key.svg";
import { Loader2 } from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogHeader
} from "@/components/ui/alert-dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VerifyCard from "./VerifyCard";

type userDetailsType = {
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  linkedUserName: string;
  linkedUserEmail: string;
};
function SettingsSecondary(){
  const [isSubmiting,setIsSubmitting] = useState(false);
  const [, setLoading] = useState<boolean>(true);
  const [cooldown, setCooldown] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<userDetailsType>({
    name: "",
    email: "",
    role: "",
    isVerified: false,
    linkedUserName: "",
    linkedUserEmail: "",
  });

  const form = useForm<nameEditInput>({
    resolver: zodResolver(nameEditSchema),
    defaultValues: {
      name: "",
    },
  });

  const resetPasswordForm = useForm<ResetPasswordInput>({
      resolver: zodResolver(ResetPasswordSchema),
      defaultValues: {
        securityCode: "",
        password:"",
        cnfpassword:""
      },
    })

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/users/details");
        const userData = response?.data?.data;

        if (!userData) throw new Error("No user data returned");

        setUserDetails({
          name: userData.name,
          email: userData.email,
          role: userData.role,
          isVerified: userData.isVerified,
          linkedUserName: userData.linkedUserName,
          linkedUserEmail: userData.linkedUserEmail,
        });

        form.setValue("name", userData.name); // Set initial value in form
      } catch (error) {
        const axiosError = error as AxiosError;
        const errorMessage =
          (axiosError.response?.data as { message: string })?.message ??
          "Error in fetching user";
        toast.error("Failed in fetching User Details", {
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [form]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [cooldown]);

  async function onSubmit(values: nameEditInput) {
    try {
      const response = await axios.patch("/api/users/editprofile", values);
      toast.success("Name updated successfully",{
        description: response.status,
      });
      setUserDetails((prev) => ({ ...prev, name: values.name }));
      setIsEditing(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = (axiosError.response?.data as {message : string})?.message ?? "Error in Editting Name";
      toast.error("Failed to update name",{
        description:errorMessage
      });
    }
  }

  async function onSubmitGetVerificationCode(){
    try {
      const response = await axios.get("/api/users/profile/verificationcode");
      console.log('response :',response);
      toast.success("Verification Code On Email Successfully Sent.",{
        description: response.data.message
      })
    } catch (error) {
      console.error("Unable to Send Email For Verification Code",error);
      const axiosError = error as AxiosError;
      const errorMessage = (axiosError.response?.data as {message : string})?.message ?? "Error password";
      toast.error("Verification Code failed",{
        description: errorMessage,
      });
    }
  }

  async function onSubmitResetPassword(values: ResetPasswordInput){
      setIsSubmitting(true);
      try {
        const response = await axios.post("/api/users/profile/passwordreset",values);
        console.log('response :',response);
        toast.success("Password Changed Successfully.",{
          description: response.data.message
        })
        setIsSubmitting(false);
      } catch (error) {
        console.error("Password Change Failed",error);
        const axiosError = error as AxiosError;
        const errorMessage = (axiosError.response?.data as {message : string})?.message ?? "Error password";
        toast.error("Password Change Failed",{
          description: errorMessage,
        });
        setIsSubmitting(false);
      }
    }

  return (
    <div className="grid gap-3 m-3 grid-cols-2">
      <Card className="w-90 col-span-1">
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>View Your Profile Details</CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="text-gray-400">Name</h1>
          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-2 mb-2 ">
                  Save
                </Button>
              </form>
            </Form>
          ) : (
            <h5 className="border border-solid border-gray-400 rounded-lg p-1.5 pl-6 m-1.5">
              {userDetails.name}
            </h5>
          )}
          <h1 className="text-gray-400">Email ID</h1>
          <h5 className="border border-solid border-gray-400 rounded-lg p-1.5 pl-6 m-1.5">
            {userDetails.email}
          </h5>
          <h1 className="text-gray-400">Role</h1>
          <h5 className="border border-solid border-gray-400 rounded-lg p-1.5 pl-6 m-1.5">
            {userDetails.role}
          </h5>
          <h1 className="text-gray-400">Linked User&apos;s Name</h1>
          <h5 className="border border-solid border-gray-400 rounded-lg p-1.5 pl-6 m-1.5">
            {userDetails.linkedUserName}
          </h5>
          <h1 className="text-gray-400">Linked User Email ID</h1>
          <h5 className="border border-solid border-gray-400 rounded-lg p-1.5 pl-6 m-1.5">
            {userDetails.linkedUserEmail}
          </h5>
        </CardContent>
        {!isEditing && (
          <CardFooter>
            <Button onClick={() => setIsEditing(true)}>
              <UserRoundPen className="mr-2" />
              Edit the Name
            </Button>
          </CardFooter>
        )}
      </Card>

      <Card className="w-90 col-span-1">
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>View Your Security Details</CardDescription>
        </CardHeader>
        <CardContent>
            <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button onClick={() => onSubmitGetVerificationCode()}><RotateCcwKey/> Reset Your Password</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
          <AlertDialogTitle>Reset Your Password</AlertDialogTitle>
          <AlertDialogDescription>
          Please enter the verification code and your new password to proceed.
          </AlertDialogDescription>
        </AlertDialogHeader>
                  <Form {...resetPasswordForm}>
          <form onSubmit={resetPasswordForm.handleSubmit(onSubmitResetPassword)} className="w-2/3 space-y-6">
            <FormField
            control={resetPasswordForm.control}
            name="securityCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
            />
            <FormField
                control={resetPasswordForm.control}
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
                control={resetPasswordForm.control}
                name="cnfpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled= {isSubmiting} className="w-full">
          {
          isSubmiting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please Wait
            </>
          ) : ("Submit")
          }</Button>
          </form>
        </Form>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogContent>
          </AlertDialog>
          </CardContent>
      </Card>
    </div>
  );
}

export default SettingsSecondary;