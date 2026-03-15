import React, { useState, useRef, useEffect } from 'react';
import { HiChevronDown } from "react-icons/hi";

const CustomSelect = ({ value, onChange, options, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedLabel = options.find(opt => opt.value === value)?.label || value;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (optionValue) => {
        onChange({ target: { value: optionValue } }); // Mimic event object for compatibility
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-full flex items-center justify-between bg-[#1c2128] hover:bg-[#24292f] border border-gray-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-gray-300 transition-all focus:ring-2 focus:ring-sky-500/10 text-sm font-medium gap-4"
            >
                <span className="truncate">{selectedLabel}</span>
                <HiChevronDown className={`text-gray-500 text-lg transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1c2128] rounded-xl shadow-2xl border border-gray-800/50 py-2 z-50 min-w-[160px] animate-scale-in origin-top">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSelect(option.value)}
                            className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-indigo-600 hover:text-white flex items-center gap-2 ${
                                value === option.value ? 'bg-indigo-600/20 text-indigo-400' : 'text-gray-400'
                            }`}
                        >
                            {/* Optional: Add colored dots for priority */}
                            {option.value === 'High' && <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
                            {option.value === 'Medium' && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                            {option.value === 'Low' && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
