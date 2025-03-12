"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login success", response.data);

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      console.log("login failed", error);
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false); //
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "Login"}</h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 border-gray-900 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        type="text"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 border-gray-900 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        type="password"
      />

      <button
        onClick={onLogin}
        disabled={buttonDisabled || loading}
        className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <Link href="/signup">Don't have an account? Sign up</Link>
    </div>
  );
}