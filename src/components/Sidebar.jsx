import React, { useState } from 'react';
import { HiHome, HiUserGroup, HiCalendar, HiCog, HiLogout, HiChartPie, HiClock } from "react-icons/hi";
import { HiMiniQueueList } from 'react-icons/hi2';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from './Modal';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogoutConfirm = () => {
        localStorage.removeItem('todo-user');
        navigate('/login');
    };

    const openLogoutModal = () => setIsLogoutModalOpen(true);
    const closeLogoutModal = () => setIsLogoutModalOpen(false);

    return (
        <aside className="hidden md:flex flex-col w-64 bg-[#0a0c10] text-gray-300 h-screen fixed left-0 top-0 border-r border-gray-800/50 shadow-2xl z-40">
            {/* Logo Area */}
            <div className="p-6 flex items-center gap-3 border-b border-gray-800/50">
                <div className="w-8 h-8 flex items-center justify-center">
                    <HiMiniQueueList className="text-sky-500 text-3xl" />
                </div>
                <span className="text-2xl font-bold text-sky-500 tracking-tight">TASKO</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Workspace</div>
                
                <SidebarItem 
                  icon={HiHome} 
                  label="My Work" 
                  active={location.pathname === '/dashboard'} 
                  onClick={() => navigate('/dashboard')}
                />
                <SidebarItem 
                  icon={HiClock} 
                  label="Time Tracker" 
                  active={location.pathname === '/time-tracker'}
                  onClick={() => navigate('/time-tracker')}
                />
                <SidebarItem 
                  icon={HiUserGroup} 
                  label="Teams" 
                  active={location.pathname === '/teams'}
                  onClick={() => navigate('/teams')}
                />
                <SidebarItem 
                  icon={HiCalendar} 
                  label="Calendar" 
                  active={location.pathname === '/calendar'} 
                  onClick={() => navigate('/calendar')}
                />
                <SidebarItem 
                  icon={HiChartPie} 
                  label="Reports" 
                  active={location.pathname === '/reports'} 
                  onClick={() => navigate('/reports')}
                />
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-800/50 space-y-2">

                <button 
                    onClick={() => navigate('/settings')}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group ${
                        location.pathname === '/settings'
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                            : 'hover:text-white hover:bg-gray-800/50'
                    }`}
                >
                     <HiCog className={`transition-colors ${
                         location.pathname === '/settings' 
                             ? 'text-indigo-200' 
                             : 'text-gray-400 group-hover:text-indigo-400'
                     }`} />
                     <span>Settings</span>
                </button>
                <button 
                    onClick={openLogoutModal}
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all duration-200 mt-4"
                >
                     <HiLogout />
                     <span>Log Out</span>
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
        </aside>
    );
};

const SidebarItem = ({ icon: Icon, label, active, badge, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
        active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
        : 'hover:bg-gray-800/50 hover:text-white'
    }`}>
        <div className="flex items-center gap-3">
            <Icon className={`text-lg transition-colors ${active ? 'text-indigo-200' : 'text-gray-400 group-hover:text-indigo-400'}`} />
            <span>{label}</span>
        </div>
        {badge && (
            <span className="bg-gray-800 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-md group-hover:bg-gray-700 group-hover:text-white transition-colors">
                {badge}
            </span>
        )}
    </button>
);

export default Sidebar;
