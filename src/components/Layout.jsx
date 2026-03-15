import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="min-h-screen bg-[#0d0f14] flex">
            {/* Sidebar (Desktop) */}
            <Sidebar />

            <div className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden">
                {/* Navbar (Top) */}
                <Navbar />

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0d0f14] p-4 md:px-6 md:py-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
