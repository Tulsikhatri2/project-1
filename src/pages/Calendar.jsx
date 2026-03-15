import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { HiChevronLeft, HiChevronRight, HiPlus, HiArrowLeft } from "react-icons/hi";
import Modal from '../components/Modal';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';

const Calendar = () => {
    const { allTodos, addTodo } = useTodo();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingInline, setIsAddingInline] = useState(false);
    const [newTodoText, setNewTodoText] = useState('');
    const [newTodoPriority, setNewTodoPriority] = useState('Medium');

    // Helpers for Calendar Logic
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handleDayClick = (dateStr) => {
        setSelectedDate(dateStr);
        setIsAddingInline(false);
        setIsModalOpen(true);
    };

    const getTasksForDate = (dateStr) => {
        return allTodos.filter(todo => todo.scheduledDate === dateStr);
    };

    const handleInlineAdd = () => {
        if (!newTodoText.trim()) return;
        addTodo(newTodoText, newTodoPriority, selectedDate);
        setNewTodoText('');
        setNewTodoPriority('Medium');
        setIsAddingInline(false);
    };

    const renderCalendarDays = () => {
        const days = [];
        // Empty slots for days before the 1st
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-gray-800/10 rounded-xl"></div>);
        }

        // Actual days
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = new Date().toISOString().split('T')[0] === dateStr;
            const tasks = getTasksForDate(dateStr);

            days.push(
                <div 
                    key={day} 
                    onClick={() => handleDayClick(dateStr)}
                    className={`h-24 md:h-32 bg-[#161b22] border border-gray-800/40 rounded-xl p-3 flex flex-col justify-between transition-all hover:border-indigo-500/50 hover:shadow-lg cursor-pointer group ${isToday ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#0d0f14]' : ''}`}
                >
                    <div className="flex justify-between items-start">
                        {/* Date Number */}
                        <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 bg-gray-800/50'}`}>
                            {day}
                        </span>
                        
                        {/* Task Count Badge (Subtle) */}
                        {tasks.length > 0 && (
                            <span className="text-[10px] font-bold text-indigo-400/80">
                                {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
                            </span>
                        )}
                    </div>

                    {/* Action Area */}
                    <div className="flex flex-col gap-2">
                        {tasks.length > 0 ? (
                            <button 
                                className="w-full py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-indigo-500/20 transition-all"
                            >
                                View Tasks
                            </button>
                        ) : (
                            <button 
                                className="w-full py-1.5 bg-gray-800/30 hover:bg-gray-800/50 text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-gray-800/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-1"
                            >
                                <HiPlus className="text-xs" />
                                Add
                            </button>
                        )}
                    </div>
                </div>
            );
        }
        return days;
    };

    const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

    return (
        <div className="h-full flex flex-col animate-fade-in-up bg-[#0d0f14]">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400">Calendar</h1>
                <div className="flex items-center gap-4 bg-[#161b22] p-1.5 rounded-xl border border-gray-800/50 shadow-sm">
                    <button onClick={prevMonth} className="p-2 hover:bg-gray-800 rounded-lg text-gray-500 hover:text-indigo-400 transition-colors">
                        <HiChevronLeft className="text-xl" />
                    </button>
                    <span className="font-semibold text-gray-200 w-32 text-center select-none tracking-tight">
                        {monthNames[month]} {year}
                    </span>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-800 rounded-lg text-gray-500 hover:text-indigo-400 transition-colors">
                        <HiChevronRight className="text-xl" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#161b22]/30 rounded-2xl p-6 border border-gray-800/50 shadow-inner backdrop-blur-sm">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-4 mb-6">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <div key={d} className="text-center text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                            {d}
                        </div>
                    ))}
                </div>
                
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-4">
                    {renderCalendarDays()}
                </div>
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title={`Tasks for ${selectedDate}`}
            >
                <div className="space-y-4">
                    <div className="max-h-[60vh] overflow-y-auto pr-1 space-y-3 custom-scrollbar">
                        {/* Inline Add Form */}
                        {isAddingInline && (
                            <div className="flex flex-col gap-3 p-3 bg-[#1c2128] rounded-xl border border-indigo-500/30 shadow-lg animate-scale-in">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full border-2 border-gray-500 shrink-0 aspect-square"></div>
                                    <input 
                                        type="text" 
                                        value={newTodoText}
                                        onChange={(e) => setNewTodoText(e.target.value)}
                                        placeholder="Add new task..."
                                        className="flex-1 bg-transparent border-none outline-none text-gray-200 text-sm font-medium placeholder:text-gray-600"
                                        autoFocus
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleInlineAdd();
                                            if (e.key === 'Escape') setIsAddingInline(false);
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-gray-800/50">
                                    <div className="flex gap-2">
                                        {['Low', 'Medium', 'High'].map(p => (
                                            <button 
                                                key={p}
                                                onClick={() => setNewTodoPriority(p)}
                                                className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md border transition-all ${
                                                    newTodoPriority === p 
                                                    ? 'bg-indigo-500 border-indigo-500 text-white' 
                                                    : 'bg-gray-800/50 border-gray-700 text-gray-500 hover:border-gray-600'
                                                }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => setIsAddingInline(false)}
                                            className="px-3 py-1.5 text-[10px] font-bold text-gray-500 hover:text-gray-300 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={handleInlineAdd}
                                            disabled={!newTodoText.trim()}
                                            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedDateTasks.length === 0 && !isAddingInline ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center bg-gray-800/20 rounded-2xl border border-dashed border-gray-800">
                                <p className="text-gray-500 text-sm italic">No tasks for this date</p>
                            </div>
                        ) : (
                            selectedDateTasks.map(todo => (
                                <TodoItem key={todo.id} todo={todo} />
                            ))
                        )}
                    </div>
                    
                    {!isAddingInline && (
                        <div className="pt-4 border-t border-gray-800 flex justify-end">
                            <button 
                                onClick={() => setIsAddingInline(true)}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-950/20 transition-all active:scale-95"
                            >
                                <HiPlus className="text-lg" />
                                Add Task
                            </button>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default Calendar;
