"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Settings, X } from 'lucide-react';

interface ImageUploadProps {
    label: string;
    images: string[];
    onImagesChange: (images: string[]) => void;
    maxImages?: number;
}

export default function ImageUpload({ 
    label, 
    images, 
    onImagesChange,
    maxImages = 2 
}: ImageUploadProps) {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && images.length < maxImages) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            onImagesChange([...images, ...newImages].slice(0, maxImages));
        }
    };

    const handleRemoveImage = (index: number) => {
        onImagesChange(images.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">{label}</h3>
            <div className="flex gap-4 flex-wrap">
                {images.map((image, index) => (
                    <div key={index} className="relative group">
                        <div className="w-40 h-40 rounded-xl overflow-hidden border-2 border-gray-200">
                            <Image 
                                src={image} 
                                alt={`Upload ${index + 1}`}
                                width={190}
                                height={190}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="absolute top-2 left-2 p-1.5 bg-white rounded-full shadow-md">
                            <Settings className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                ))}
                
                {images.length < maxImages && (
                    <label className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-[#2885AC] transition-colors">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            multiple
                        />
                        <div className="text-center">
                            <div className="text-4xl text-gray-400 mb-2">+</div>
                            <p className="text-xs text-gray-500">إضافة صورة</p>
                        </div>
                    </label>
                )}
            </div>
        </div>
    );
}