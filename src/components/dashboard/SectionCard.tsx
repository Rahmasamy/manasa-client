"use client";

import React from 'react';

interface SectionCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export default function SectionCard({ title, children, className = '' }: SectionCardProps) {
    return (
        <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
            <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-bold text-[#2885AC]">{title}</h2>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );
}
