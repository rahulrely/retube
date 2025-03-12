"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const urlToken = searchParams.get("token");

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyUserEmail = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error:any) {
      console.error("Verification error:", error.response?.data || error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError(false);
    if (urlToken) {
      setToken(urlToken);
    }
  }, [urlToken]);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      
      {loading && <h2 className="p-2 bg-yellow-500 text-black">Verifying...</h2>}

      {!loading && (
        <>
          {verified ? (
            <div className="p-4 bg-green-500 text-white rounded-md">
              <h2>Email Verified Successfully! ✅</h2>
              <Link href="/login" className="text-blue-300 underline">
                Go to Login
              </Link>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-500 text-white rounded-md">
              <h2>Verification Failed ❌</h2>
              <p>Invalid or expired token.</p>
            </div>
          ) : (
            <h2 className="p-2 bg-orange-500 text-black">Token: {token || "No token found"}</h2>
          )}
        </>
      )}
    </div>
  );
}
