"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import SectionCard from './SectionCard';
import TextField from './TextField';
import SingleImageUpload from './SingleImageUpload';

interface AddSectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string, servicesCount: number) => void;
    title?: string;
}

export default function AddServiceModal({ 
    isOpen, 
    onClose, 
    onSubmit,
    title = 'إضافة قسم جديد'
}: AddSectionModalProps) {
    const [sectionName, setSectionName] = useState('');
    const [servicesCount, setServicesCount] = useState(0);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (sectionName.trim()) {
            onSubmit(sectionName, servicesCount);
            setSectionName('');
            setServicesCount(0);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50" onClick={onClose}>
            <div 
                className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 m-2  pb-20"
                onClick={(e) => e.stopPropagation()}
            >
            
             

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-2 space-y-4">
                   <SectionCard title="عن الخدمة ">
                           <div className="space-y-4">
                             <TextField
                               label="عنوان الخدمة "
                               placeholder="التخطيط والتهيئة البحثية  "
                               value={"formData.mainTitle"}
                               onChange={(value) => {}}
                             />
                             <TextField
                               label=" وصف الخدمة"
                               placeholder=" وصف الخدمة   "
                               value={""}
                               onChange={(value) => {}}
                               rows={2}
                             />
                             <SingleImageUpload
                               label="  صورة الأيقون"
                               image={""}
                               onChange={(image) => {}}
                             />
                           </div>
                         </SectionCard>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-[#2885AC] text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
                        >
                            إضافة
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}