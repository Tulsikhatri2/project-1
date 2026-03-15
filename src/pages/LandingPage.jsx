import React from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from "../assets/login-page-image.webp";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-[#0d0f14] overflow-hidden relative font-sans">
            {/* Main Container */}
            <div className="max-w-7xl mx-auto h-screen flex flex-col lg:flex-row items-center px-6 md:px-12 relative z-10">
                
                {/* Left Content */}
                <div className="w-full lg:w-5/12 pt-20 lg:pt-0 flex flex-col items-start z-20">
                    <div className="flex flex-col leading-none tracking-tight mb-8">
                        <span className="text-[5vw] font-light text-sky-400">FREE</span>
                        <span className="text-[5vw] font-thin text-gray-100">TASK</span>
                        <div className="text-[5vw] font-thin text-gray-100">
                            CHECKLIST
                        </div>
                        <span className="text-[5vw] font-thin text-gray-100">APP</span>
                    </div>

                    <p className="text-md md:text-md text-gray-400 mb-10 max-w-md leading-relaxed">
                        Organize and manage your tasks like a boss with <span className="font-bold text-gray-100">Tasko</span>, 
                        a free online task checklist app packing more capabilities than you can imagine.
                    </p>

                    <button 
                        onClick={() => navigate('/auth')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xl px-10 py-4 rounded-full transition-all duration-300 shadow-lg shadow-indigo-900/20 transform hover:-translate-y-1"
                    >
                        Get Started
                    </button>
                </div>

                {/* Right Content / Hero Image */}
                <div className="w-full lg:w-7/12 h-[50vh] lg:h-full relative flex items-center justify-center lg:justify-end">
                    
                    {/* Darker Shape Background */}
                    <div className="absolute top-1/2 left-1/2 lg:left-auto lg:right-0 transform -translate-x-1/2 lg:translate-x-20 -translate-y-1/2 w-[120vw] h-[120vw] lg:w-[60vw] lg:h-[60vw] bg-sky-500/10 rounded-full opacity-20 blur-3xl z-0"></div>

                    <div className="relative z-10 w-full max-w-3xl transform lg:translate-x-20 hover:scale-[1.02] transition-transform duration-700 ease-out animate-slide-in-down">
                         <img 
                            src={loginImage} 
                            alt="Tasko App Interface" 
                            className="w-full object-contain drop-shadow-2xl opacity-90 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                         />
                         
                         {/* Decorative Floating Elements */}
                         <div className="absolute -top-10 -left-10 w-24 h-24 bg-sky-500 rounded-full opacity-10 animate-pulse hidden lg:block"></div>
                         <div className="absolute -bottom-10 right-20 w-32 h-32 bg-indigo-500 rounded-full opacity-10 animate-pulse delay-300 hidden lg:block"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
