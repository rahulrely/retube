"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";

export function HomeSection() {
  return (
    <div className="h-[40rem] w-full top-10 rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-3xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
        Collaborate, Approve, Publish <br/> Seamlessly to  YouTube!.
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
        A web app that lets collaborators upload videos for approval before going live on your YouTube channel. Streamline content creation with secure access and effortless publishing!
        </p>
      </div>
    </div>
  );
}
