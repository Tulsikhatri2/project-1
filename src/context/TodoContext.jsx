import React, { createContext, useState, useEffect, useContext } from 'react';

const TodoContext = createContext();

export const useTodo = () => {
    return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
    // Load initial state from local storage
    const [todos, setTodos] = useState(() => {
        try {
            const stored = localStorage.getItem('todo-app-data');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Failed to load todos", error);
            return [];
        }
    });

    const [filter, setFilter] = useState('All'); // All, Pending, Completed

    // Time Tracking States
    const [timeTracking, setTimeTracking] = useState(() => {
        try {
            const stored = localStorage.getItem('time-tracking-data');
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error("Failed to load time tracking data", error);
            return {};
        }
    });

    const [activeTimers, setActiveTimers] = useState(() => {
        try {
            const stored = localStorage.getItem('active-timers-data');
            // We need to handle timers that were running when the app closed
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error("Failed to load active timers", error);
            return {};
        }
    });

    // Save to local storage whenever todos change
    useEffect(() => {
        try {
            localStorage.setItem('todo-app-data', JSON.stringify(todos));
        } catch (error) {
            console.error("Failed to save todos", error);
        }
    }, [todos]);

    // Save time tracking and active timers to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('time-tracking-data', JSON.stringify(timeTracking));
            localStorage.setItem('active-timers-data', JSON.stringify(activeTimers));
        } catch (error) {
            console.error("Failed to save time tracking data", error);
        }
    }, [timeTracking, activeTimers]);

    const startTimer = (taskId) => {
        // Update task status to InProgress when timer starts
        const task = todos.find(t => t.id === taskId);
        if (task && task.status !== 'Completed' && !task.isCompleted && task.status !== 'InProgress') {
            updateStatus(taskId, 'InProgress');
        }

        // Stop any other running timers first
        Object.keys(activeTimers).forEach(id => {
            if (activeTimers[id].isRunning && id !== taskId) {
                pauseTimer(id);
            }
        });

        setActiveTimers(prev => {
            const existing = prev[taskId];
            const startTime = Date.now();
            const elapsed = existing ? existing.elapsed : 0;

            return {
                ...prev,
                [taskId]: {
                    startTime,
                    elapsed,
                    isRunning: true
                }
            };
        });
    };

    const pauseTimer = (taskId) => {
        setActiveTimers(prev => {
            const timer = prev[taskId];
            if (!timer || !timer.isRunning) return prev;

            const elapsed = timer.elapsed + Math.floor((Date.now() - timer.startTime) / 1000);
            return {
                ...prev,
                [taskId]: {
                    ...timer,
                    elapsed,
                    isRunning: false
                }
            };
        });
    };

    const stopTimer = (taskId) => {
        setActiveTimers(prev => {
            const timer = prev[taskId];
            if (!timer) return prev;

            const elapsed = timer.isRunning 
                ? timer.elapsed + Math.floor((Date.now() - timer.startTime) / 1000)
                : timer.elapsed;

            // Save to time tracking data
            setTimeTracking(prevTracking => {
                const existing = prevTracking[taskId] || { totalSeconds: 0, sessions: [] };
                const newTotal = existing.totalSeconds + elapsed;
                return {
                    ...prevTracking,
                    [taskId]: {
                        totalSeconds: newTotal,
                        sessions: [
                            ...existing.sessions,
                            {
                                seconds: elapsed,
                                date: new Date().toISOString()
                            }
                        ]
                    }
                };
            });

            // Remove timer from activeTimers
            const newTimers = { ...prev };
            delete newTimers[taskId];
            return newTimers;
        });
    };

    const addTodo = (text, priority, scheduledDate) => {
        const newTodo = {
            id: Date.now().toString(),
            text,
            isCompleted: false,
            priority, // 'High', 'Medium', 'Low'
            status: 'Pending', // 'Pending', 'InProgress', 'Completed'
            scheduledDate: scheduledDate || new Date().toISOString().split('T')[0], // Default to today if not provided
            createdAt: new Date().toISOString()
        };
        setTodos((prev) => [newTodo, ...prev]);
    };

    const updateStatus = (id, newStatus) => {
        setTodos((prev) => prev.map(todo => 
             todo.id === id ? { ...todo, status: newStatus, isCompleted: newStatus === 'Completed' } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter(todo => todo.id !== id));
        // Also cleanup time tracking if needed? 
        // For now let's keep it to keep history even if task deleted.
    };

    const toggleComplete = (id) => {
        setTodos((prev) => prev.map(todo => 
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted, status: !todo.isCompleted ? 'Completed' : 'Pending' } : todo
        ));
        // If toggling to complete, stop timer if running
        if (activeTimers[id]) {
            stopTimer(id);
        }
    };

    const editTodo = (id, newText, newPriority) => {
        setTodos((prev) => prev.map(todo => 
            todo.id === id ? { ...todo, text: newText, priority: newPriority } : todo
        ));
    };

    // Derived state for filtered todos
    const filteredTodos = todos.filter(todo => {
        if (filter === 'Completed') return todo.isCompleted;
        if (filter === 'Pending') return !todo.isCompleted;
        return true;
    });

    return (
        <TodoContext.Provider value={{
            todos,
            filteredTodos,
            addTodo,
            deleteTodo,
            toggleComplete,
            updateStatus,
            editTodo,
            filter,
            setFilter,
            allTodos: todos,
            timeTracking,
            activeTimers,
            startTimer,
            pauseTimer,
            stopTimer
        }}>
            {children}
        </TodoContext.Provider>
    );
};
