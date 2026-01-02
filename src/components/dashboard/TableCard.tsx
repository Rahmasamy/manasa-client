"use client";

import React from 'react';
import { Plus } from 'lucide-react';

interface TableCardProps {
    title: string;
    onAdd?: () => void;
    addButtonText?: string;
    children: React.ReactNode;
}

export default function TableCard({ 
    title, 
    onAdd, 
    addButtonText = 'إضافة قسم',
    children 
}: TableCardProps) {
    return (
        <div className="bg-white rounded-lg overflow-hidden">
            {/* Header */}
            <div className=" px-6 py-4  flex items-center justify-between bg-gray-100">
                <h2 className="text-xl font-bold">{title}</h2>
                {onAdd && (
                    <button
                        onClick={onAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-[#0A66C2] border border-[#0A66C2] rounded-lg hover:bg-teal-50 transition-colors font-medium"
                    >
                        <Plus className="w-4 h-4" />
                        {addButtonText}
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="bg-white">
                {children}
            </div>
        </div>
    );
}
