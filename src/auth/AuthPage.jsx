import React from "react";
import { HiMiniQueueList } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";

const AuthPage = () => {
  const navigate = useNavigate();

  // const handleLogin = () => {
    
  //   const mockUser = {
  //     name: "Demo User",
  //     email: "demo.user@gmail.com",
  //     photo: ""
  //   };
  //   localStorage.setItem("todo-user", JSON.stringify(mockUser));
  //   navigate("/dashboard");
  // };

  const responseMessage = (response) => {
localStorage.setItem("todo-user", response.credential);
  const mockUser = {
      name: "Demo User",
      email: "demo.user@gmail.com",
      photo: ""
    };
    localStorage.setItem("todo-user", JSON.stringify(mockUser));
    navigate("/dashboard");
navigate("/dashboard")
  }

    const errorMessage = (response) => {
console.log(response,"response")
  }

  return (
    <div className="min-h-screen w-full bg-[#0d0f14] flex items-center justify-center p-4">
      <div className="bg-[#161b22] rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md flex flex-col items-center text-center animate-scale-in border border-gray-800/50">
        
        <div className="flex items-center gap-2 mb-8">
             <span className="text-sky-500 text-4xl">
                <HiMiniQueueList />
             </span>
             <span className="text-3xl font-bold text-gray-100 tracking-tight">
                TASKO
            </span>
        </div>

        <div className="mb-8 text-center">
            <h1 className="text-2xl font-medium text-gray-200 mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to manage your productivity</p>
        </div>
        
        <div className="space-y-4 w-full flex items-center justify-center">
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage}/>
        </div>
        
        <p className="mt-8 text-xs text-gray-500">
           Protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>

        <p className="mt-4 text-xs text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Secure Login
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
