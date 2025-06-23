"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { nameEditSchema, nameEditInput } from "@/schemas/nameEditSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserRoundPen } from "lucide-react";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type userDetailsType = {
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  linkedUserName: string;
  linkedUserEmail: string;
};

function SettingsPrimary() {
  const [loading, setLoading] = useState<boolean>(true);
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

  async function onSubmit(values: nameEditInput) {
    try {
      const response = await axios.patch("/api/users/editprofile", values); 
      toast.success("Name updated successfully");
      setUserDetails((prev) => ({ ...prev, name: values.name }));
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update name");
    }
  }

  return (
    <div>
      <Card className="w-90">
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
          <h1 className="text-gray-400">Linked User's Name</h1>
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
    </div>
  );
}

export default SettingsPrimary;