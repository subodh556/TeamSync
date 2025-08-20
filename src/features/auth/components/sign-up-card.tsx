import { Card, CardHeader, CardDescription, CardContent, CardTitle } from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FcGoogle} from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { SignInFlow } from "../types"
import { useState } from "react"
import {TriangleAlert, Eye, EyeOff, Sparkles, Mail, User, Lock} from "lucide-react"
import { useAuthActions } from "@convex-dev/auth/react"

interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({setState}: SignUpCardProps) => {
    const [name , setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {signIn} = useAuthActions();

    const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setPending(true);
        signIn("password", {
            name,
            email,
            password,
            flow:"signUp"
        }).catch(() => {
            setError("Try with another email");
        }).finally(() => {
            setPending(false);
        });
    };  

    const onProviderSignUp = (value:"github" | "google") => {
        setPending(true);
        signIn(value)
            .finally(() => {setPending(false)});
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-4 px-6 pt-2">
                <div className="inline-flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Join TeamSync</h2>
                </div>
                <p className="text-gray-400 text-xs">
                    Create your account and start collaborating
                </p>
            </div>

            <div className="px-6 pb-6 space-y-4">
                {/* Error Message */}
                {!!error && (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-sm text-red-400 animate-pulse">
                        <TriangleAlert className="w-4 h-4 flex-shrink-0"/>
                        <p>{error}</p>
                    </div>
                )}

                {/* Social Sign Up */}
                <div className="space-y-2">
                    <Button 
                        disabled={pending} 
                        onClick={()=>onProviderSignUp("google")} 
                        variant="outline" 
                        size="sm" 
                        className="w-full h-10 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white transition-all duration-300 group text-sm"
                    >
                        <FcGoogle className="w-4 h-4 mr-2" />
                        <span className="font-medium">Continue with Google</span>
                    </Button>
                    
                    <Button 
                        disabled={pending} 
                        onClick={()=>onProviderSignUp("github")} 
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
                        <span className="bg-[#232528] px-4 text-gray-500 font-medium">Or continue with email</span>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={onPasswordSignUp} className="space-y-3">
                    {/* Name Input */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-300">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input 
                                disabled={pending}
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                placeholder="Enter your full name"
                                className="h-10 pl-10 bg-white/5 border-white/10 focus:border-purple-500/50 focus:bg-white/10 text-white placeholder:text-gray-500 transition-all duration-300 text-sm"
                                required
                            />
                        </div>
                    </div>

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
                                className="h-10 pl-10 bg-white/5 border-white/10 focus:border-purple-500/50 focus:bg-white/10 text-white placeholder:text-gray-500 transition-all duration-300 text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-300">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input 
                                disabled={pending}
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                placeholder="Create a password"
                                type={showPassword ? "text" : "password"}
                                className="h-10 pl-10 pr-10 bg-white/5 border-white/10 focus:border-purple-500/50 focus:bg-white/10 text-white placeholder:text-gray-500 transition-all duration-300 text-sm"
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

                    {/* Confirm Password Input */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-300">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <Input 
                                disabled={pending}
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                type={showConfirmPassword ? "text" : "password"}
                                className="h-10 pl-10 pr-10 bg-white/5 border-white/10 focus:border-purple-500/50 focus:bg-white/10 text-white placeholder:text-gray-500 transition-all duration-300 text-sm"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                        type="submit" 
                        size="sm" 
                        disabled={pending}
                        className="w-full h-10 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-4 text-sm"
                    >
                        {pending ? (
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                Creating...
                            </div>
                        ) : (
                            "Create Account"
                        )}
                    </Button>
                </form>

                {/* Footer */}
                <div className="text-center pt-3">
                    <p className="text-xs text-gray-400">
                        Already have an account?{" "}
                        <button 
                            onClick={()=>setState("signIn")} 
                            className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}