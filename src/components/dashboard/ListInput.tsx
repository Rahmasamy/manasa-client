"use client";

import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface ListInputProps {
    label: string;
    items: string[];
    onChange: (items: string[]) => void;
    placeholder?: string;
}

export default function ListInput({ 
    label, 
    items, 
    onChange,
    placeholder = "أدخل عنصر جديد" 
}: ListInputProps) {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
        if (inputValue.trim()) {
            onChange([...items, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleRemove = (index: number) => {
        onChange(items.filter((_, i) => i !== index));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            {/* Items List */}
            {items.length > 0 && (
                <div className="space-y-2 mb-3">
                    {items.map((item, index) => (
                        <div 
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg group"
                        >
                            <span className="text-gray-700">{item}</span>
                            <button
                                onClick={() => handleRemove(index)}
                                className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded transition-all"
                            >
                                <X className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Input */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2885AC] text-right"
                />
                <button
                    onClick={handleAdd}
                    className="px-4 py-3 bg-[#2885AC] text-white rounded-lg hover:bg-[#2885AC] transition-colors"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
