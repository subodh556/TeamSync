"use client";

import { useState } from "react";
import { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";
import { MessageSquare, FileText, Users } from "lucide-react"; // icons

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");

  return (
    <div className="h-screen flex bg-[#1a1c20]  text-white relative overflow-hidden">
      {/* Background accent blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 -right-5 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-30 animate-pulse" />

      {/* Left side - Landing */}
       <div className="hidden md:flex flex-col justify-center items-start px-16 w-3/5 relative z-10">
        {/* Floating elements */}
        <div className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl rotate-12 animate-float" />
        <div className="absolute top-40 right-32 w-12 h-12 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-full animate-pulse" />
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-gradient-to-br from-indigo-500/25 to-cyan-500/25 rounded-xl -rotate-6 animate-float-delayed" />
        
        {/* Main content */}
        <div className="space-y-2 mb-8">
          
          <h1 className="text-7xl font-black bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent leading-tight">
            TeamSync
          </h1>
          
          <div className="relative">
            <h2 className="text-3xl font-bold text-gray-200 mt-4">
              Where teams come <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">alive</span>
            </h2>
            <div className="absolute -right-5 top-0 w-8 h-8 bg-yellow-400 rounded-full animate-bounce opacity-80" />
          </div>
        </div>

        <p className="text-lg text-gray-400 mb-12 max-w-xl leading-relaxed font-light">
          Experience seamless collaboration with real-time messaging, smart file sharing, 
          and intuitive team management. Built for the modern workplace.
        </p>

        {/* Enhanced Features */}
        <div className="grid grid-cols-1 gap-4 mb-16 w-full max-w-lg">
          <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 border border-purple-500/10 rounded-2xl hover:border-purple-500/30 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Lightning Fast Chat</h3>
              <p className="text-gray-400 text-sm">Instant messaging with typing indicators</p>
            </div>
          </div>
          
          <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 border border-indigo-500/10 rounded-2xl hover:border-indigo-500/30 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Smart File Sharing</h3>
              <p className="text-gray-400 text-sm">Drag, drop, and find anything instantly</p>
            </div>
          </div>
          
          <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-pink-500/5 to-rose-500/5 border border-pink-500/10 rounded-2xl hover:border-pink-500/30 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Team Spaces</h3>
              <p className="text-gray-400 text-sm">Organized channels for every project</p>
            </div>
          </div>
        </div>


      </div>
      {/* Right side - Auth */}
      <div className="flex w-full md:w-2/5 items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md bg-[#232528] p-1 rounded-2xl shadow-2xl border border-gray-800">
          {state === "signIn" ? (
            <SignInCard setState={setState} />
          ) : (
            <SignUpCard setState={setState} />
          )}
        </div>
      </div>
    </div>
  );
};
