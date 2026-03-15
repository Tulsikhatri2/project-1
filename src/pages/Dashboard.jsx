import React, { useState } from 'react';
import Board from '../components/Board';
// Sidebar import removed
import TodoForm from '../components/TodoForm';
import Modal from '../components/Modal';
import { HiPlus } from "react-icons/hi";

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col h-full animate-fade-in-up">
            {/* Header Area */}
            <div className="flex flex-col justify-center items-center gap-4 mb-3">
                <div className="w-[93%] flex items-center justify-between">
                     <h1 className="text-2xl font-light text-gray-400 w-[50%] text-right font-bold underline">My Tasks</h1>
                     
                     <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl p-3 shadow-sm shadow-indigo-200 transition-all active:scale-95"
                        title="Add New Task"
                     >
                         <HiPlus className="text-xl" />
                     </button>
                </div>
            </div>

            {/* Board Area */}
            <Board />

            {/* Add Task Modal */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title="Add New Task"
            >
                <TodoForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default Dashboard;
