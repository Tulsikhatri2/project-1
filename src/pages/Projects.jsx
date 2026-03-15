import React from 'react';
import { HiPlus, HiDotsVertical, HiUserGroup, HiCalendar, HiCheckCircle, HiClock } from "react-icons/hi";

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "Web App Redesign",
            status: "Active",
            progress: 75,
            team: 4,
            deadline: "Jan 28, 2026",
            tasks: { total: 24, completed: 18 },
            color: "indigo"
        },
        {
            id: 2,
            title: "Mobile API Integration",
            status: "On Hold",
            progress: 40,
            team: 3,
            deadline: "Feb 05, 2026",
            tasks: { total: 12, completed: 5 },
            color: "amber"
        },
        {
            id: 3,
            title: "Database Migration",
            status: "Completed",
            progress: 100,
            team: 2,
            deadline: "Jan 12, 2026",
            tasks: { total: 8, completed: 8 },
            color: "emerald"
        },
        {
            id: 4,
            title: "Marketing Campaign",
            status: "Active",
            progress: 25,
            team: 5,
            deadline: "Mar 10, 2026",
            tasks: { total: 40, completed: 10 },
            color: "sky"
        }
    ];

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Active': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
            case 'On Hold': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'Completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    const getColorStyles = (color) => {
        switch (color) {
            case 'indigo': return 'bg-indigo-600';
            case 'amber': return 'bg-amber-500';
            case 'emerald': return 'bg-emerald-500';
            case 'sky': return 'bg-sky-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up bg-[#0d0f14] min-h-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">Projects</h1>
                    <p className="mt-1 text-xs text-gray-500">Manage and track your active workspace projects.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-900/20 transition-all active:scale-95">
                    <HiPlus className="text-lg" />
                    New Project
                </button>
            </div>

            {/* Project Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Projects', value: '12', icon: HiPlus, color: 'indigo' },
                    { label: 'Active', value: '4', icon: HiClock, color: 'sky' },
                    { label: 'Completed', value: '6', icon: HiCheckCircle, color: 'emerald' },
                    { label: 'Team Members', value: '18', icon: HiUserGroup, color: 'rose' },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#161b22] p-4 rounded-2xl border border-gray-800/50 shadow-sm flex items-center gap-4 group hover:border-gray-700/50 transition-colors">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${stat.color}-500/10 text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                            <stat.icon className="text-xl" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</p>
                            <p className="text-xl font-black text-gray-100">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-[#161b22] rounded-2xl border border-gray-800/50 p-5 shadow-sm hover:shadow-xl hover:border-indigo-500/30 transition-all group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${getStatusStyles(project.status)}`}>
                                {project.status}
                            </span>
                            <button className="p-1 text-gray-500 hover:text-white transition-colors">
                                <HiDotsVertical />
                            </button>
                        </div>

                        <h3 className="text-lg font-bold text-gray-100 mb-2 group-hover:text-indigo-400 transition-colors">
                            {project.title}
                        </h3>

                        <div className="space-y-4">
                            {/* Progress */}
                            <div>
                                <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">
                                    <span>Progress</span>
                                    <span className="text-indigo-400">{project.progress}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full transition-all duration-1000 ease-out ${getColorStyles(project.color)}`}
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Details Row */}
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex -space-x-2">
                                    {[...Array(project.team)].map((_, i) => (
                                        <div key={i} className="w-7 h-7 rounded-full border-2 border-[#161b22] bg-gray-700 flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-1 ring-gray-800">
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                                    <HiCalendar className="text-indigo-500/50" />
                                    {project.deadline}
                                </div>
                            </div>

                            {/* Task Summary */}
                            <div className="pt-4 border-t border-gray-800/50 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-gray-300">{project.tasks.completed}</span> / <span>{project.tasks.total} Tasks</span>
                                </div>
                                <button className="text-indigo-400 hover:text-indigo-300 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* New Project Card (Draft Style) */}
                <button className="bg-[#161b22]/30 rounded-2xl border border-dashed border-gray-800 p-5 flex flex-col items-center justify-center gap-3 group hover:border-indigo-500/50 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-gray-800/50 flex items-center justify-center text-gray-500 group-hover:bg-indigo-600/10 group-hover:text-indigo-400 transition-all">
                        <HiPlus className="text-2xl" />
                    </div>
                    <span className="text-sm font-bold text-gray-500 group-hover:text-indigo-400 transition-colors">Start New Project</span>
                </button>
            </div>
        </div>
    );
};

export default Projects;
