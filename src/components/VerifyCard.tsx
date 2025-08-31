"use client"
import {useState} from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {ResetPasswordSchema,ResetPasswordInput} from "@/schemas/registerSchema"
import axios, { AxiosError } from "axios"
import Footer from "@/components/Footer"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"

function VerifyCard() {
  const [isSubmiting,setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      securityCode: "",
      password:"",
      cnfpassword:""
    },
  })

  const onSubmit = async()=> {
    setIsSubmitting(true);
    try {
      const response = await axios.get("/profile/verificationcode");
      console.log('response :',response);
      toast.success("Verification Code On Email Successfully Sent.",{
        description: response.data.message
      })
      setIsSubmitting(false);
    } catch (error) {
      console.error("Unable to Send Email For Verification Code",error);
      const axiosError = error as AxiosError;
      const errorMessage = (axiosError.response?.data as {message : string})?.message ?? "Error password";
      toast.error("Verification Code failed",{
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
  }
  return (
    <>
    <Card className="w-full max-w-sm border-0">
      <CardHeader>
        <CardTitle>Reset Your Password</CardTitle>
        <CardDescription>
          Please enter the verification code and your new password to proceed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
            control={form.control}
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
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
    </>
  )
}

export default VerifyCard