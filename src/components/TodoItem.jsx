import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';
import { HiTrash, HiPencil } from "react-icons/hi2";
import { HiCheck } from "react-icons/hi";
import CustomSelect from './CustomSelect';

import Modal from './Modal';

const TodoItem = ({ todo, isBoardView = false }) => {
    const { toggleComplete, deleteTodo, editTodo, updateStatus } = useTodo();
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [editPriority, setEditPriority] = useState(todo.priority);

    const handleSave = () => {
        if (!editText.trim()) return;
        editTodo(todo.id, editText, editPriority);
        setIsEditing(false);
    };

    const handleDelete = () => {
        deleteTodo(todo.id);
        setIsDeleteModalOpen(false);
    };

    const priorityColors = {
        High: "text-rose-400 bg-rose-500/10 border-rose-500/20",
        Medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
        Low: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    };

    const priorityBgColors = {
        High: "bg-[#1c2128] hover:bg-[#24292f] border-rose-500/30",
        Medium: "bg-[#1c2128] hover:bg-[#24292f] border-amber-500/30",
        Low: "bg-[#1c2128] hover:bg-[#24292f] border-emerald-500/30"
    };

    // Shared Edit View (unchanged logic, just ensuring return contains Modal)
    if (isEditing) {
        return (
            <div className="flex flex-col gap-3 p-4 bg-white rounded-xl border border-blue-200 shadow-md ring-2 ring-blue-50 z-10 relative">
                 <input 
                    type="text" 
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full bg-gray-50 border-none outline-none text-gray-700 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-100 text-sm font-medium"
                    autoFocus
                />
                 <div className="w-full">
                    <CustomSelect 
                        value={editPriority} 
                        onChange={(e) => setEditPriority(e.target.value)}
                        options={[
                            { value: 'High', label: 'High' },
                            { value: 'Medium', label: 'Medium' },
                            { value: 'Low', label: 'Low' }
                        ]}
                        className="!bg-[#1c2128] !text-gray-200"
                    />
                 </div>
                 <div className="flex gap-2 mt-2">
                    <button 
                        onClick={handleSave}
                        className="flex-1 px-3 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Save
                    </button>
                    <button 
                         onClick={() => {
                            setIsEditing(false);
                            setEditText(todo.text);
                            setEditPriority(todo.priority);
                        }}
                        className="flex-1 px-3 py-2 bg-gray-100 text-gray-400 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                 </div>
            </div>
        );
    }

    return (
        <>
            {isBoardView ? (
                <div className={`group p-2.5 rounded-xl border shadow-sm transition-all duration-200 animate-fade-in-up bg-[#1c2128] ${priorityBgColors[todo.priority]}`}>
                    <div className="flex justify-between items-start mb-1">
                        <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-md bg-black/20 text-gray-300`}>
                            {todo.priority}
                        </span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setIsEditing(true)} className="p-0.5 text-gray-500 hover:text-indigo-600 rounded"><HiPencil className="text-xs"/></button>
                            <button onClick={() => setIsDeleteModalOpen(true)} className="p-0.5 text-gray-500 hover:text-rose-600 rounded"><HiTrash className="text-xs"/></button>
                        </div>
                    </div>
                    
                    <p className={`text-xs font-normal text-gray-200 mb-1.5 line-clamp-2 leading-snug ${todo.isCompleted ? 'line-through text-gray-500' : ''}`}>
                        {todo.text}
                    </p>

                    <div className="flex items-center justify-between pt-1.5 border-t border-white/5 mt-0.5">
                        <span className="text-[9px] text-gray-500">{new Date(todo.createdAt).toLocaleDateString()}</span>
                        
                        {todo.status === 'InProgress' ? (
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => updateStatus(todo.id, 'Pending')}
                                    className="text-[10px] font-medium text-gray-400 hover:text-amber-400 bg-[#0d0f14] hover:bg-amber-500/10 px-2 py-1 rounded-md transition-all uppercase tracking-wide border border-gray-800 hover:border-amber-500/20"
                                >
                                    Revert
                                </button>
                                <button 
                                    onClick={() => updateStatus(todo.id, 'Completed')}
                                    className="text-[10px] font-medium text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 px-2 py-1 rounded-md transition-colors uppercase tracking-wide border border-sky-500/20"
                                >
                                    Complete
                                </button>
                            </div>
                        ) : todo.status === 'Completed' ? (
                            <button 
                                onClick={() => updateStatus(todo.id, 'Pending')}
                                className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-1 rounded-md transition-colors uppercase tracking-wide border border-emerald-500/20"
                            >
                                Undo
                            </button>
                        ) : (
                            <button 
                                onClick={() => updateStatus(todo.id, 'InProgress')}
                                className="text-[10px] font-medium text-gray-400 hover:text-sky-400 bg-[#0d0f14] hover:bg-sky-500/10 px-2 py-1 rounded-md transition-colors uppercase tracking-wide border border-gray-800"
                            >
                                In Progress
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className={`group flex items-center justify-between p-3 bg-[#1c2128] rounded-xl border border-gray-800 shadow-sm transition-all duration-300 hover:shadow-md hover:border-sky-900 animate-fade-in-up ${todo.isCompleted ? 'opacity-90' : 'opacity-100'}`}>
                    <div className="flex items-center gap-4 flex-1">
                        <button 
                            onClick={() => toggleComplete(todo.id)}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0 aspect-square ${
                                todo.isCompleted 
                                ? 'bg-sky-500 border-sky-500 text-white' 
                                : 'border-gray-300 text-transparent hover:border-sky-400'
                            }`}
                        >
                            <HiCheck className="text-sm" />
                        </button>
                        
                        <div className="flex flex-col gap-1 w-full">
                            <span className={`text-base font-medium break-all transition-all duration-300 ${
                                todo.isCompleted ? 'text-gray-400 line-through decoration-gray-500' : 'text-gray-200'
                            }`}>
                                {todo.text}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono">
                                {new Date(todo.createdAt).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${priorityColors[todo.priority]}`}>
                            {todo.priority}
                        </span>
                        
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="p-2 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                            title="Edit Task"
                        >
                             <HiPencil className="text-lg" />
                        </button>

                        <button 
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all duration-200"
                            title="Delete Task"
                        >
                            <HiTrash className="text-lg" />
                        </button>
                    </div>
                </div>
            )}

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Task"
            >
                <div className="flex flex-col gap-1">
                    <p className="text-gray-600">Are you sure you want to delete this task?</p>
                    <div className="flex gap-3 justify-end mt-2">
                        <button 
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="px-4 py-2 text-gray-400 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="px-4 py-2 text-white bg-rose-600 hover:bg-rose-700 rounded-lg font-medium transition-colors shadow-lg shadow-rose-200"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default TodoItem;
