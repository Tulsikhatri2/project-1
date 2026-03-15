import React, { useState, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';
import { HiPlus, HiCalendar } from "react-icons/hi";
import CustomSelect from './CustomSelect';
import toast from 'react-hot-toast';

const TodoForm = ({ onClose, initialDate }) => {
    const { addTodo } = useTodo();
    const [text, setText] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [date, setDate] = useState(initialDate || new Date().toISOString().split('T')[0]);

    // If initialDate prop changes (e.g. user clicks different day in calendar), update state
    useEffect(() => {
        if (initialDate) {
            setDate(initialDate);
        }
    }, [initialDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        addTodo(text, priority, date);
        toast.success("Task added successfully!");
        setText('');
        setPriority('Medium');
        // Reset date to today if we want, or keep it. Let's keep it as is or reset to today.
        // For better UX during rapid entry on a specific day, maybe keep it? 
        // But usually, one resets. Let's reset to today if no initialDate was forced, or keep initialDate.
        setDate(initialDate || new Date().toISOString().split('T')[0]);
        
        if (onClose) onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Task Name</label>
                <input 
                    type="text" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What needs to be done?"
                    className="w-full bg-[#1c2128] hover:bg-[#24292f] border border-gray-800/50 focus:bg-[#1c2128] focus:border-sky-500/50 outline-none text-gray-200 placeholder:text-gray-500 rounded-xl px-4 py-3.5 transition-all font-medium"
                    autoFocus
                />
            </div>
            
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Priority</label>
                    <CustomSelect 
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)}
                        options={[
                            { value: 'High', label: 'High Priority' },
                            { value: 'Medium', label: 'Medium Priority' },
                            { value: 'Low', label: 'Low Priority' }
                        ]}
                        className="!bg-[#1c2128] !text-gray-200 !border-gray-800/50"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Date</label>
                    <div className="relative">
                        <input 
                            type="date" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-[#1c2128] hover:bg-[#24292f] border border-gray-800/50 focus:bg-[#1c2128] focus:border-sky-500/50 outline-none text-gray-200 rounded-xl px-4 py-3.5 transition-all font-medium appearance-none"
                        />
                        <HiCalendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-lg"/>
                    </div>
                </div>
            </div>

            <button 
                type="submit"
                disabled={!text.trim()}
                className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3.5 font-medium shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 transition-all duration-200"
            >
                <HiPlus className="text-xl"/>
                <span>Add Task</span>
            </button>
        </form>
    );
};

export default TodoForm;
