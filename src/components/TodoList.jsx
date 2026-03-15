import React from 'react';
import { useTodo } from '../context/TodoContext';
import TodoItem from './TodoItem';
import { HiInbox } from "react-icons/hi";

const TodoList = () => {
    const { filteredTodos, filter, setFilter, todos } = useTodo();

    const counts = {
        All: todos.length,
        Pending: todos.filter(t => !t.isCompleted).length,
        Completed: todos.filter(t => t.isCompleted).length
    };

    return (
        <div className="w-full">
            <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl w-fit">
                {['All', 'Pending', 'Completed'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                            filter === f 
                            ? 'bg-white text-indigo-600 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {f} <span className="ml-1 opacity-60 text-xs">({counts[f]})</span>
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-3">
                {filteredTodos.length > 0 ? (
                    filteredTodos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))
                ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-gray-400 opacity-60">
                        <HiInbox className="text-6xl mb-4 text-gray-300" />
                        <p className="text-lg font-medium">No tasks found</p>
                        <p className="text-sm">Enjoy your day!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoList;
