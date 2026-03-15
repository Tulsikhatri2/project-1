import React from 'react'; // Re-triggering build
import { HiDotsHorizontal } from 'react-icons/hi';
import { HiPlus, HiChatBubbleLeftRight, HiUserGroup, HiCheckCircle, HiBolt } from "react-icons/hi2";

const Teams = () => {
    const members = [
        {
            id: 1,
            name: "Alex Johnson",
            email: "alex.j@tasko.com",
            role: "Product Lead",
            status: "Online",
            lastActive: "Today, 12:45 PM",
            avatar: "AJ",
            color: "indigo"
        },
        {
            id: 2,
            name: "Sarah Chen",
            email: "sarah@tasko.com",
            role: "Senior Designer",
            status: "Away",
            lastActive: "2 hours ago",
            avatar: "SC",
            color: "emerald"
        },
        {
            id: 3,
            name: "Michael Ross",
            email: "m.ross@tasko.com",
            role: "Frontend Developer",
            status: "Online",
            lastActive: "Today, 9:20 AM",
            avatar: "MR",
            color: "sky"
        },
        {
            id: 4,
            name: "Elena Rodriguez",
            email: "elena@tasko.com",
            role: "UX Researcher",
            status: "Offline",
            lastActive: "Yesterday",
            avatar: "ER",
            color: "rose"
        },
        {
            id: 5,
            name: "David Kim",
            email: "david@tasko.com",
            role: "Backend Engineer",
            status: "Away",
            lastActive: "5 hours ago",
            avatar: "DK",
            color: "amber"
        }
    ];

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Online': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'Away': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
            case 'Offline': return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
            default: return 'text-gray-400 bg-gray-800/50 border-gray-700/50';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Online': return 'bg-emerald-500';
            case 'Away': return 'bg-amber-500';
            case 'Offline': return 'bg-gray-500';
            default: return 'bg-gray-700';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up bg-[#0d0f14] min-h-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">Teams</h1>
                    <p className="mt-1 text-xs text-gray-500">Manage your team members and their workspace activity.</p>
                </div>
                <button className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-sky-900/20 transition-all active:scale-95">
                    <HiPlus className="text-lg" />
                    Add Member
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Total Members', value: '18', icon: HiUserGroup, color: '[#1C2128]' },
                    { label: 'Active Tasks', value: '42', icon: HiBolt, color: '[#1C2128]' },
                    { label: 'Completion Rate', value: '88%', icon: HiCheckCircle, color: '[#1C2128]' },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#161b22] p-5 rounded-2xl border border-gray-800/50 flex items-center justify-between group hover:border-gray-700/50 transition-all">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{stat.label}</p>
                            <p className="text-2xl font-black text-gray-100">{stat.value}</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-gray-800/50 flex items-center justify-center text-sky-500 group-hover:scale-110 group-hover:bg-sky-500/10 transition-all">
                            <stat.icon className="text-2xl" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Members Table */}
            <div className="bg-[#161b22] rounded-2xl border border-gray-800/50 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800 bg-gray-800/30">
                                <th className="py-4 px-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Member</th>
                                <th className="py-4 px-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Role</th>
                                <th className="py-4 px-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Status</th>
                                <th className="py-4 px-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Last Active</th>
                                <th className="py-4 px-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {members.map((member) => (
                                <tr key={member.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-lg bg-${member.color}-600/20 border border-${member.color}-500/20 relative`}>
                                                {member.avatar}
                                                <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#161b22] ${getStatusIcon(member.status)}`}></div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-200 group-hover:text-sky-400 transition-colors">{member.name}</div>
                                                <div className="text-[10px] text-gray-500 font-medium">{member.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="text-xs font-semibold text-gray-300">{member.role}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getStatusStyles(member.status)}`}>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-xs text-gray-500 font-medium">
                                        {member.lastActive}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-400 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition-all" title="Message">
                                                <HiChatBubbleLeftRight className="text-lg" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
                                                <HiDotsHorizontal className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Teams;
