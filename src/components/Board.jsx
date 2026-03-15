import React from 'react';
import { useTodo } from '../context/TodoContext';
import TodoItem from './TodoItem';
import { HiPlus } from "react-icons/hi";

// Column component defined outside Board to avoid "Cannot create components during render" error
const Column = ({ title, tasks, colorClass, count }) => (
    <div className="flex flex-col h-full min-w-0 flex-1 bg-[#161b22] rounded-2xl p-3 border border-gray-800/40 shadow-xl">
        <div className="flex items-center justify-between mb-4 px-2">
            <h3 className={` text-sm ${colorClass} font-bold`}>{title}</h3>
            <span className="bg-[#0d0f14] text-gray-500 text-xs font-medium px-2 py-1 rounded-full border border-gray-800/50">
                {count}
            </span>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
            {tasks.map(todo => (
                <TodoItem key={todo.id} todo={todo} isBoardView={true} />
            ))}
            {tasks.length === 0 && (
                <div className="flex flex-col items-center justify-center h-32 text-gray-500 border-2 border-dashed border-gray-800/30 rounded-xl">
                    <span className="text-sm">No tasks</span>
                </div>
            )}
        </div>
    </div>
);

const Board = () => {
    const { allTodos } = useTodo();

    // Helper to filter tasks by status and priority
    const getTasks = (groupBy, priority = null) => {
        return allTodos.filter(todo => {
            const today = new Date().toISOString().split('T')[0];
            // Show task if no date set OR scheduled date is today or in the past
            const isVisible = !todo.scheduledDate || todo.scheduledDate <= today;

            if (!isVisible) return false;

            if (groupBy === 'Priority') {
                // Priority columns show only Pending tasks
                const isCorrectPriority = todo.priority === priority;
                const isPending = todo.status === 'Pending' || !todo.status; 
                return isCorrectPriority && isPending && !todo.isCompleted;
            } else if (groupBy === 'InProgress') {
                return todo.status === 'InProgress' && !todo.isCompleted;
            } else if (groupBy === 'Completed') {
                return todo.isCompleted || todo.status === 'Completed';
            }
            return false;
        });
    };

    const lowPriorityTasks = getTasks('Priority', 'Low');
    const mediumPriorityTasks = getTasks('Priority', 'Medium');
    const highPriorityTasks = getTasks('Priority', 'High');
    const inProgressTasks = getTasks('InProgress');
    const completedTasks = getTasks('Completed');

    return (
        <div className="flex gap-3 h-[calc(100vh-140px)] overflow-hidden pb-4">
            <Column 
                title="Low Priority" 
                tasks={lowPriorityTasks} 
                colorClass="text-emerald-400"
                count={lowPriorityTasks.length}
            />
            <Column 
                title="Medium Priority" 
                tasks={mediumPriorityTasks} 
                colorClass="text-amber-400"
                count={mediumPriorityTasks.length}
            />
            <Column 
                title="High Priority" 
                tasks={highPriorityTasks} 
                colorClass="text-rose-400"
                count={highPriorityTasks.length}
            />
            <Column 
                title="In Progress" 
                tasks={inProgressTasks} 
                colorClass="text-sky-400"
                count={inProgressTasks.length}
            />
            <Column 
                title="Completed" 
                tasks={completedTasks} 
                colorClass="text-indigo-400"
                count={completedTasks.length}
            />
        </div>
    );
};

export default Board;
