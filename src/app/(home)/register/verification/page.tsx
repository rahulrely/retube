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
import {VerifyCodeSchema,VerifyCodeInput} from "@/schemas/registerSchema"
import { AxiosError } from "axios";
import axios from '@/lib/axios';
import Footer from "@/components/Footer"

function InputOTPForm() {
  const [isSubmiting,setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<VerifyCodeInput>({
    resolver: zodResolver(VerifyCodeSchema),
    defaultValues: {
      verifyCode: "",
    },
  })

  const onSubmit = async(data: VerifyCodeInput)=> {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/users/verify",data);
      // const response = await axios.post("/api/users/bypassVerification");  // changed api endpoint from "verify" to "bypassVerification"
      console.log('response :',response);
      const role = response?.data?.data?.role;
      toast.success("You are Successfully Verified",{
        description: response.data.message
      })
      if(role === "Primary"){
        router.replace("/register/link/google");
      }else{
        router.replace("/register/link/primary")
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in OTP Verification",error);
      const axiosError = error as AxiosError;
      const errorMessage = (axiosError.response?.data as {message : string})?.message ?? "Error in OTP Verification";
      toast.error("OTP Verification Failed",{
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
  }
  return (
    <>
<div className='flex flex-col justify-center items-center mt-10 text-white'>
<div className=" mt-2 p-5 rounded-2xl shadow-2xl w-full max-w-md space-y-4">
        <h2 className="text-3xl font-bold text-center text-white mb-15">Verify Your Acccount</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
            control={form.control}
            name="verifyCode"
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
                <FormDescription>
                  Please enter the one-time password sent to your email.
                </FormDescription>
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
  <footer className="mt-32"><Footer/></footer>
  </>
  )
}

export default InputOTPForm