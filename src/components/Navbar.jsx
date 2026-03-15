import React, { useState } from 'react';
import { HiMiniQueueList } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";
import Modal from './Modal';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    
    // Simulate getting user data, maybe from local storage too if we stored it
    const user = JSON.parse(localStorage.getItem('todo-user')) || { name: 'User', email: 'user@example.com' };

    const handleLogoutConfirm = () => {
        localStorage.removeItem('todo-user');
        navigate('/login');
    };

    const openLogoutModal = () => {
        setIsLogoutModalOpen(true);
    };

    const closeLogoutModal = () => {
        setIsLogoutModalOpen(false);
    };

    return (
        <nav className="bg-[#0d0f14]/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800/50 px-6 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
                 {/* <span className="text-sky-600 text-3xl">
                    <HiMiniQueueList />
                 </span>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600 tracking-tight">
                    TASKO
                </span> */}
            </div>
            
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                        {user.name.charAt(0)}
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-gray-200">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                </div>
                <button 
                    onClick={openLogoutModal}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 text-sm font-medium"
                    title="Logout"
                >
                    <IoLogOutOutline className="text-lg"/>
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>

            {/* Logout Confirmation Modal */}
            <Modal
                isOpen={isLogoutModalOpen}
                onClose={closeLogoutModal}
                title="Logout confirmation"
            >
                <p className="text-sm text-gray-600 mb-4">
                    Are you sure you want to logout?
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={closeLogoutModal}
                        className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleLogoutConfirm}
                        className="px-4 py-2 text-sm rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </Modal>
        </nav>
    );
};

export default Navbar;
