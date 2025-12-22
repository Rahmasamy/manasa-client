"use client";

import ImageUpload from '@/src/components/dashboard/ImageUpload';
import SaveButton from '@/src/components/dashboard/SaveButton';
import SectionCard from '@/src/components/dashboard/SectionCard';
import TextField from '@/src/components/dashboard/TextField';
import { useState } from 'react';


export default function MainSectionPage() {
    const [backgroundImages, setBackgroundImages] = useState<string[]>([
        '/imgs/hero-1.jpg', // Replace with actual images
        '/imgs/hero-2.jpg'
    ]);

    const [formData, setFormData] = useState({
        mainTitle: 'للشهم الباحثين... ولمرشهم نحو العالم الأكاديمي',
        description: 'انضم إلى بوابة العلوم الإنسانية، حيث الإرشاد الأكاديمي والتدريب الثري بأحكي مرجع معتمدين.. نمكنك من تطوير مهاراتك، وتحقيق التميز الأكاديمية لتواكب المستقبل.',
        subText1: 'المنصة لها بصت تجاري',
        subText2: 'منصة تعليمية إلكترونية',
        subText3: 'تنضم اوراق رسمية للإلترزام بالخدمات'
    });

    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Data saved:', { backgroundImages, formData });
        alert('تم الحفظ بنجاح!');
        setLoading(false);
    };

    return (
        <div className="max-w-5xl space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">القسم الرئيسي</h1>

            {/* Background Images Section */}
            <SectionCard title="صور الخلفية">
                <ImageUpload
                    label=""
                    images={backgroundImages}
                    onImagesChange={setBackgroundImages}
                    maxImages={2}
                />
            </SectionCard>

            {/* Main Title Section */}
            <SectionCard title="العنوان الرئيسي">
                <TextField
                    label=""
                    placeholder="أدخل العنوان الرئيسي"
                    value={formData.mainTitle}
                    onChange={(value) => setFormData({ ...formData, mainTitle: value })}
                />
            </SectionCard>

            {/* Description Section */}
            <SectionCard title="الوصف">
                <TextField
                    label=""
                    placeholder="أدخل الوصف"
                    value={formData.description}
                    onChange={(value) => setFormData({ ...formData, description: value })}
                    rows={4}
                />
            </SectionCard>

            {/* Sub-sections */}
            <SectionCard title="النصوص الفرعية">
                <div className="space-y-4">
                    <TextField
                        label="النص الأول"
                        placeholder="أدخل النص الأول"
                        value={formData.subText1}
                        onChange={(value) => setFormData({ ...formData, subText1: value })}
                    />
                    <TextField
                        label="النص الثاني"
                        placeholder="أدخل النص الثاني"
                        value={formData.subText2}
                        onChange={(value) => setFormData({ ...formData, subText2: value })}
                    />
                    <TextField
                        label="النص الثالث"
                        placeholder="أدخل النص الثالث"
                        value={formData.subText3}
                        onChange={(value) => setFormData({ ...formData, subText3: value })}
                    />
                </div>
            </SectionCard>

            {/* Save Button */}
            <div className="flex justify-end">
                <SaveButton onClick={handleSave} loading={loading} />
            </div>
        </div>
    );
}
