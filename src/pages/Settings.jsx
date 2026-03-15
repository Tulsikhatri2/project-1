import React, { useState } from 'react';
import { HiUser, HiBell, HiShieldCheck, HiGlobeAlt, HiPaintBrush, HiCloudArrowUp } from "react-icons/hi2";

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile', icon: HiUser },
        { id: 'notifications', label: 'Notifications', icon: HiBell },
        { id: 'security', label: 'Security', icon: HiShieldCheck },
        { id: 'workspace', label: 'Workspace', icon: HiGlobeAlt },
        { id: 'appearance', label: 'Appearance', icon: HiPaintBrush },
    ];

    return (
        <div className="space-y-6 animate-fade-in-up bg-[#0d0f14] min-h-full">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">Settings</h1>
                <p className="mt-1 text-xs text-gray-500">Configure your personal preferences and workspace settings.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
                {/* Vertical Tabs */}
                <aside className="space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                activeTab === tab.id
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/20'
                                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                            }`}
                        >
                            <tab.icon className={`text-lg ${activeTab === tab.id ? 'text-indigo-200' : 'text-gray-500'}`} />
                            {tab.label}
                        </button>
                    ))}
                </aside>

                {/* Content Area */}
                <main className="bg-[#161b22] rounded-2xl border border-gray-800/50 p-8 shadow-sm">
                    {activeTab === 'profile' && (
                        <div className="space-y-8 animate-fade-in">
                            <section>
                                <h3 className="text-lg font-bold text-gray-100 mb-6 flex items-center gap-2">
                                    <HiUser className="text-indigo-400" />
                                    Public Profile
                                </h3>
                                
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-3xl font-black text-indigo-400 border border-indigo-500/20 shadow-xl overflow-hidden">
                                            JD
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:scale-110 transition-transform">
                                            <HiCloudArrowUp className="text-sm" />
                                        </button>
                                    </div>

                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Full Name</label>
                                            <input type="text" defaultValue="John Doe" className="w-full bg-[#0d0f14] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Job Title</label>
                                            <input type="text" defaultValue="Senior Product Manager" className="w-full bg-[#0d0f14] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all" />
                                        </div>
                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email Address</label>
                                            <input type="email" defaultValue="j.doe@tasko.com" className="w-full bg-[#0d0f14] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="pt-8 border-t border-gray-800/50 flex justify-end gap-3">
                                <button className="px-5 py-2.5 text-xs font-bold text-gray-400 hover:text-white transition-colors">Discard</button>
                                <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-900/20 transition-all active:scale-95">Save Changes</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="text-lg font-bold text-gray-100 mb-6 flex items-center gap-2">
                                <HiBell className="text-amber-400" />
                                Notification Settings
                            </h3>
                            
                            {[
                                { title: 'Email Notifications', desc: 'Get updates on task assignments and comments.' },
                                { title: 'Desktop Alerts', desc: 'Real-time notifications for urgent deadlines.' },
                                { title: 'Marketing Emails', desc: 'Receive news about project updates and features.' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-[#0d0f14]/50 border border-gray-800 rounded-xl">
                                    <div>
                                        <p className="text-sm font-bold text-gray-200">{item.title}</p>
                                        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{item.desc}</p>
                                    </div>
                                    <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner">
                                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="text-lg font-bold text-gray-100 mb-6 flex items-center gap-2">
                                <HiShieldCheck className="text-emerald-400" />
                                Security & Privacy
                            </h3>
                            
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl mb-6">
                                <p className="text-xs text-emerald-400 font-medium">Your account is currently protected with Two-Factor Authentication (2FA).</p>
                            </div>

                            <button className="w-full text-left p-4 bg-[#0d0f14]/50 border border-gray-800 rounded-xl hover:border-indigo-500/30 transition-all group">
                                <p className="text-sm font-bold text-gray-200 group-hover:text-indigo-400">Change Password</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Last updated 3 months ago</p>
                            </button>

                            <button className="w-full text-left p-4 bg-[#0d0f14]/50 border border-gray-800 rounded-xl hover:border-rose-500/30 transition-all group">
                                <p className="text-sm font-bold text-rose-400">Deactivate Account</p>
                                <p className="text-[10px] text-rose-900/50 uppercase tracking-widest mt-1">This action is permanent and cannot be undone.</p>
                            </button>
                        </div>
                    )}

                    {activeTab !== 'profile' && activeTab !== 'notifications' && activeTab !== 'security' && (
                        <div className="py-20 text-center space-y-3">
                            <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto text-gray-600">
                                <HiGlobeAlt className="text-3xl" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-200">Coming Soon</h3>
                            <p className="text-xs text-gray-500 max-w-xs mx-auto">We're working on making these settings available. Stay tuned for future updates!</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Settings;
