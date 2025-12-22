"use client";

import React from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

interface SingleImageUploadProps {
    label: string;
    image: string | null;
    onChange: (image: string | null) => void;
}

export default function SingleImageUpload({ 
    label, 
    image, 
    onChange 
}: SingleImageUploadProps) {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            onChange(imageUrl);
        }
    };

    const handleRemove = () => {
        onChange(null);
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            {image ? (
                <div className="relative w-full h-48 border-2 border-gray-200 rounded-lg overflow-hidden group">
                    <Image 
                        src={image} 
                        alt="Upload" 
                        fill
                        className="object-cover"
                    />
                    <button
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-teal-500 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">اختر صورة للرفع</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </label>
            )}
        </div>
    );
}