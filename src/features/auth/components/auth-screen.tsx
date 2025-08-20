"use client";

import { useState } from "react";
import { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";
import { MessageSquare, FileText, Users } from "lucide-react"; // icons

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");

  return (
    <div className="h-screen flex bg-[#1a1c20] text-white relative overflow-hidden">
      {/* Background accent blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 -right-5 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-30 animate-pulse" />

      {/* Left side - Landing */}
      <div className="hidden md:flex flex-col justify-center items-start px-16 w-3/5 relative z-10">
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
          TeamSync
        </h1>
        <p className="text-xl text-gray-300 mt-6 mb-10 max-w-lg leading-relaxed">
          The modern way to stay in sync. Collaborate, chat, and share files —
          all in one place built for teams like yours.
        </p>

        {/* Features */}
        <div className="space-y-5 mb-12">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-purple-400 w-6 h-6" />
            <span className="text-gray-300">Real-time team messaging</span>
          </div>
          <div className="flex items-center gap-3">
            <FileText className="text-indigo-400 w-6 h-6" />
            <span className="text-gray-300">File sharing & searchable history</span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="text-pink-400 w-6 h-6" />
            <span className="text-gray-300">Channels & private groups</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => setState("signUp")}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-2xl font-semibold shadow-xl transition transform hover:scale-105"
        >
          Get Started
        </button>
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
