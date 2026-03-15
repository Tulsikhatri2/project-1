import React, { useState, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import { HiPlay, HiPause, HiStop } from "react-icons/hi";
import Modal from '../components/Modal';

const TimeTracker = () => {
    const { allTodos, updateStatus, timeTracking, activeTimers, startTimer, pauseTimer, stopTimer } = useTodo();
    const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
    const [taskToActivate, setTaskToActivate] = useState(null);
    const [isStopModalOpen, setIsStopModalOpen] = useState(false);
    const [taskToStop, setTaskToStop] = useState(null);
    
    // Local state for UI refresh only
    const [tick, setTick] = useState(0);

    // Effect to update the UI every second if any timer is running
    useEffect(() => {
        const anyRunning = Object.values(activeTimers).some(t => t.isRunning);
        if (!anyRunning) return;

        const interval = setInterval(() => {
            setTick(t => t + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [activeTimers]);

    // Format time from seconds to HH:MM:SS
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    // Get current display time for a task (calculated on the fly using tick for refresh)
    const getDisplayTime = (taskId) => {
        const timer = activeTimers[taskId];
        if (!timer) {
            const tracked = timeTracking[taskId];
            return tracked ? formatTime(tracked.totalSeconds) : '00:00:00';
        }
        
        if (timer.isRunning) {
            const currentElapsed = timer.elapsed + Math.floor((Date.now() - timer.startTime) / 1000);
            return formatTime(currentElapsed);
        }
        return formatTime(timer.elapsed);
    };

    // Get total tracked time for a task
    const getTotalTime = (taskId) => {
        const tracked = timeTracking[taskId];
        if (!tracked) return '00:00:00';
        return formatTime(tracked.totalSeconds);
    };

    // Get completed tasks with their time data
    const completedTasks = allTodos
        .filter(todo => todo.status === 'Completed' || todo.isCompleted)
        .map(todo => ({
            ...todo,
            totalTime: timeTracking[todo.id]?.totalSeconds || 0,
            sessions: timeTracking[todo.id]?.sessions || []
        }))
        .sort((a, b) => {
            // Sort by completion date (most recent first) or by total time
            return (b.totalTime || 0) - (a.totalTime || 0);
        });

    // Active tasks (not completed)
    const activeTasks = allTodos.filter(todo => 
        todo.status !== 'Completed' && !todo.isCompleted
    );

    return (
        <div className="space-y-6 animate-fade-in-up bg-[#0d0f14] min-h-full">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">Time Tracker</h1>
                <p className="mt-1 text-xs text-gray-500">
                    Track time spent on your tasks with individual stopwatch controls.
                </p>
            </div>

            {/* Active Tasks with Stopwatches */}
            <div className="bg-[#161b22] rounded-2xl border border-gray-800/50 p-6 shadow-sm">
                <h2 className="text-sm font-bold text-gray-200 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Active Tasks
                </h2>
                {activeTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center bg-gray-800/20 rounded-2xl border border-dashed border-gray-800">
                        <p className="text-gray-500 text-sm italic">No active tasks to track</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {activeTasks.map(todo => {
                            const timer = activeTimers[todo.id];
                            const isRunning = timer?.isRunning || false;
                            const hasElapsed = timer && (timer.elapsed > 0 || isRunning);

                            return (
                                <div 
                                    key={todo.id}
                                    className="flex items-center justify-between p-4 bg-[#1c2128] rounded-xl border border-gray-800/50 hover:border-indigo-500/30 transition-all group"
                                >
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-gray-100 mb-1 group-hover:text-indigo-400 transition-colors">{todo.text}</h3>
                                        <div className="flex items-center gap-2 text-[10px]">
                                            <span className={`px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                                                todo.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                                todo.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            }`}>
                                                {todo.priority}
                                            </span>
                                            <span className="text-gray-500 font-medium">Status: </span>
                                            <span className="text-indigo-400 font-semibold">{todo.status}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        {/* Timer Display */}
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-gray-100 font-mono tracking-tighter">
                                                {getDisplayTime(todo.id)}
                                            </div>
                                            {timeTracking[todo.id] && (
                                                <div className="text-[10px] text-gray-500 mt-0.5 font-bold">
                                                    TOTAL: {getTotalTime(todo.id)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Control Buttons */}
                                        <div className="flex items-center gap-2">
                                            {!isRunning ? (
                                                <button
                                                    onClick={() => startTimer(todo.id)}
                                                    className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all shadow-lg shadow-emerald-950/20 active:scale-95"
                                                    title="Start"
                                                >
                                                    <HiPlay className="text-lg" />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => pauseTimer(todo.id)}
                                                    className="p-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl transition-all shadow-lg shadow-amber-950/20 active:scale-95"
                                                    title="Pause"
                                                >
                                                    <HiPause className="text-lg" />
                                                </button>
                                            )}
                                            
                                            {hasElapsed && (
                                                <button
                                                    onClick={() => {
                                                        setTaskToStop(todo.id);
                                                        setIsStopModalOpen(true);
                                                    }}
                                                    className="p-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl transition-all shadow-lg shadow-rose-950/20 active:scale-95"
                                                    title="Stop & Save"
                                                >
                                                    <HiStop className="text-lg" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Completed Tasks Table */}
            <div className="bg-[#161b22] rounded-2xl border border-gray-800/50 p-6 shadow-sm overflow-hidden">
                <h2 className="text-sm font-bold text-gray-200 mb-4">Completed Tasks - Time Summary</h2>
                {completedTasks.length === 0 ? (
                    <div className="text-center py-10 bg-gray-800/20 rounded-2xl border border-dashed border-gray-800">
                        <p className="text-gray-500 text-sm italic">No completed tasks yet</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto -mx-6">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-800 bg-gray-800/30">
                                    <th className="py-3 px-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Task</th>
                                    <th className="py-3 px-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Priority</th>
                                    <th className="py-3 px-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Time</th>
                                    <th className="py-3 px-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Sessions</th>
                                    <th className="py-3 px-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Completed</th>
                                    <th className="py-3 px-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {completedTasks.map(todo => (
                                    <tr key={todo.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="text-sm font-bold text-gray-200">{todo.text}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                                todo.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                                todo.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                            }`}>
                                                {todo.priority}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-mono text-sm font-black text-indigo-400">
                                                {formatTime(todo.totalTime)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-xs font-bold text-gray-400">
                                                {todo.sessions.length} {todo.sessions.length !== 1 ? 'SESSIONS' : 'SESSION'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-xs font-medium text-gray-500">
                                                {new Date(todo.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button 
                                                onClick={() => {
                                                    setTaskToActivate(todo.id);
                                                    setIsActivateModalOpen(true);
                                                }}
                                                className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-500/20 transition-all"
                                            >
                                                Activate
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Activation Confirmation Modal */}
            <Modal
                isOpen={isActivateModalOpen}
                onClose={() => setIsActivateModalOpen(false)}
                title="Activate Task"
            >
                <div className="flex flex-col gap-4">
                    <p className="text-gray-400 text-sm">Are you sure you want to activate this task again?</p>
                    <div className="flex gap-3 justify-end mt-2">
                        <button 
                            onClick={() => setIsActivateModalOpen(false)}
                            className="px-4 py-2 text-xs font-bold text-gray-500 bg-gray-800/50 hover:bg-gray-800 hover:text-gray-300 rounded-xl transition-all border border-gray-700"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => {
                                if (taskToActivate) {
                                    updateStatus(taskToActivate, 'Pending');
                                    setIsActivateModalOpen(false);
                                    setTaskToActivate(null);
                                }
                            }}
                            className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-950/20"
                        >
                            Confirm Activation
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Stop Confirmation Modal */}
            <Modal
                isOpen={isStopModalOpen}
                onClose={() => setIsStopModalOpen(false)}
                title="Finish Task"
            >
                <div className="flex flex-col gap-4">
                    <p className="text-gray-400 text-sm italic font-medium">Is this task completed?</p>
                    <div className="flex gap-3 justify-end mt-2">
                        <button 
                            onClick={() => setIsStopModalOpen(false)}
                            className="px-4 py-2 text-xs font-bold text-gray-500 bg-gray-800/50 hover:bg-gray-800 hover:text-gray-300 rounded-xl transition-all border border-gray-700"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={() => {
                                if (taskToStop) {
                                    stopTimer(taskToStop);
                                    updateStatus(taskToStop, 'Completed');
                                    setIsStopModalOpen(false);
                                    setTaskToStop(null);
                                }
                            }}
                            className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-all shadow-lg shadow-rose-950/20"
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TimeTracker;
