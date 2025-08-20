import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FcGoogle} from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { SignInFlow } from "../types"
import { useState } from "react"
import {useAuthActions} from "@convex-dev/auth/react"
import {TriangleAlert, Eye, EyeOff, Mail, Lock, LogIn} from "lucide-react"

interface SignInCardProps {
    setState: (state: SignInFlow) => void;
}

export const SignInCard = ({setState}: SignInCardProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {signIn} = useAuthActions();
    const [pending, setPending] = useState(false);

    const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);
        signIn("password", {
            email,
            password,
            flow:"signIn"
        }).catch(() => {
            setError("Invalid email or password");
        }).finally(() => {
            setPending(false);
        });
    };

    const onProviderSignIn = (value:"github" | "google") => {
        setPending(true);
        signIn(value)
            .finally(() => {setPending(false)});
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-4 px-6 pt-6">
                <div className="inline-flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <LogIn className="w-3 h-3 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Welcome Back</h2>
                </div>
                <p className="text-gray-400 text-xs">
                    Sign in to your TeamSync account
                </p>
            </div>

            <div className="px-6 pb-6 space-y-4">
                {/* Error Message */}
                {!!error && (
                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex items-center gap-3 text-sm text-red-400 animate-pulse">
                        <TriangleAlert className="w-4 h-4 flex-shrink-0"/>
                        <p>{error}</p>
                    </div>
                )}

                {/* Social Sign In */}
                <div className="space-y-2">
                    <Button 
                        disabled={pending} 
                        onClick={()=>onProviderSignIn("google")} 
                        variant="outline" 
                        size="sm" 
                        className="w-full h-10 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white transition-all duration-300 group text-sm"
                    >
                        <FcGoogle className="w-4 h-4 mr-2" />
                        <span className="font-medium">Continue with Google</span>
                    </Button>
                    
                    <Button 
                        disabled={pending} 
                        onClick={()=>onProviderSignIn("github")} 
                        variant="outline" 
                        size="sm" 
                        className="w-full h-10 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white transition-all duration-300 group text-sm"
                    >
                        <FaGithub className="w-4 h-4 mr-2" />
                        <span className="font-medium">Continue with GitHub</span>
                    </Button>
                </div>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#232528] px-4 text-gray-500 font-medium">Or sign in with email</span>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={onPasswordSignIn} className="space-y-3">
                    {/* Email Input */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-300">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input 
                                disabled={pending}
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder="Enter your email"
                                type="email"
                                className="h-10 pl-10 bg-white/5 border-white/10 focus:border-indigo-500/50 focus:bg-white/10 text-white placeholder:text-gray-500 transition-all duration-300 text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-medium text-gray-300">Password</label>
                            <button 
                                type="button"
                                className="text-xs text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors"
                            >
                                Forgot password?
                            </button>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input 
                                disabled={pending}
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                                className="h-10 pl-10 pr-10 bg-white/5 border-white/10 focus:border-indigo-500/50 focus:bg-white/10 text-white placeholder:text-gray-500 transition-all duration-300 text-sm"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                        type="submit" 
                        size="sm" 
                        disabled={pending}
                        className="w-full h-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-4 text-sm"
                    >
                        {pending ? (
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                Signing in...
                            </div>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>

                {/* Footer */}
                <div className="text-center pt-3">
                    <p className="text-xs text-gray-400">
                        Don&apos;t have an account?{" "}
                        <button 
                            onClick={()=>setState("signUp")} 
                            className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}