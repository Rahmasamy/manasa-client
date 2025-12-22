"use client";

import React from 'react';
import { Upload, X, FileText } from 'lucide-react';

interface FileUploadProps {
    label: string;
    files: File[];
    onChange: (files: File[]) => void;
    accept?: string;
    multiple?: boolean;
}

export default function FileUpload({ 
    label, 
    files, 
    onChange,
    accept = "*",
    multiple = true 
}: FileUploadProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            onChange(multiple ? [...files, ...newFiles] : newFiles);
        }
    };

    const handleRemoveFile = (index: number) => {
        onChange(files.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            
            {/* File List */}
            {files.length > 0 && (
                <div className="space-y-2 mb-3">
                    {files.map((file, index) => (
                        <div 
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-gray-400" />
                                <span className="text-sm text-gray-700">{file.name}</span>
                                <span className="text-xs text-gray-500">
                                    ({(file.size / 1024).toFixed(2)} KB)
                                </span>
                            </div>
                            <button
                                onClick={() => handleRemoveFile(index)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                                <X className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Button */}
            <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-teal-500 transition-colors">
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">اختر ملف للرفع</span>
                <input
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>
        </div>
    );
}
