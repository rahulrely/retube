"use client"
import {useState} from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import {VerifyCodeSchema,VerifyCodeInput} from "@/schemas/registerSchema"
import axios, { AxiosError } from "axios"
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

  const onSubmit = async()=> {
    setIsSubmitting(true);
    try {
      // const response = await axios.post("/api/users/verify",data, { withCredentials: true });
      const response = await axios.post("/api/users/bypassVerification", { withCredentials: true });  // changed api endpoint from "verify" to "bypassVerification"
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
        <div className='flex flex-col justify-center items-center mt-10 text-white'>
        <div className="mt-2 p-5 rounded-2xl shadow-2xl w-full max-w-md space-y-4">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Skip OTP Verification</h2>
          <p className="text-center text-sm text-gray-300">
            OTP verification is currently disabled for testing. Click below to continue.
          </p>

          <Button disabled={isSubmiting} onClick={form.handleSubmit(onSubmit)} className="w-full mt-6">
            {isSubmiting ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please Wait
              </>
            ) : (
              "Continue without OTP"
            )}
          </Button>
        </div>
      </div>
        </div>
        </div>
  <footer className="mt-32"><Footer/></footer>
  </>
  )
}

export default InputOTPForm