import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HiX } from "react-icons/hi";

const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-fade-in" onClick={onClose}>
            <div 
                className="bg-[#161b22] rounded-2xl shadow-2xl w-full max-w-[400px] transform transition-all animate-scale-in flex flex-col border border-gray-800/50"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800/50">
                    <h3 className="text-lg font-medium text-gray-200">{title}</h3>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 rounded-lg transition-colors"
                    >
                        <HiX className="text-xl" />
                    </button>
                </div>
                
                <div className="px-5 py-6">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
