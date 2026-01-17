"use client";

import AddSectionModal from '@/src/components/dashboard/AddSectionModal';
import ServiceTable, { ServiceItem } from '@/src/components/dashboard/ServiceTable';
import TableCard from '@/src/components/dashboard/TableCard';
import { useRouter } from "next/navigation"; 
import { useState, useEffect } from 'react';
import { academicServiceApi } from '@/src/infrastructure/api/academicServiceApi';

export default function AcademicGuidancePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await academicServiceApi.getAllCategories();
                // Map API response to ServiceItem format
                const mappedServices: ServiceItem[] = response.data.map((category) => ({
                    id: category.id,
                    name: category.title,
                    identity: category.services?.length || 0,
                }));
                setServices(mappedServices);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'فشل تحميل الأقسام');
                console.error('Error fetching categories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleAddSection = async (title: string) => {
        try {
            setError(null);
            await academicServiceApi.createCategory(title);
            
            // Refresh categories list after successful creation
            const response = await academicServiceApi.getAllCategories();
            const mappedServices: ServiceItem[] = response.data.map((category) => ({
                id: category.id,
                name: category.title,
                identity: category.services?.length || 0,
            }));
            setServices(mappedServices);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'فشل إنشاء القسم';
            setError(errorMessage);
            console.error('Error creating category:', err);
            // Keep modal open on error so user can try again
            alert(errorMessage);
        }
    };

    const handleDeleteSection = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا القسم؟')) {
            return;
        }

        try {
            setError(null);
            await academicServiceApi.deleteCategory(id);
            
            // Refresh categories list after successful deletion
            const response = await academicServiceApi.getAllCategories();
            const mappedServices: ServiceItem[] = response.data.map((category) => ({
                id: category.id,
                name: category.title,
                identity: category.services?.length || 0,
            }));
            setServices(mappedServices);
        } catch (err) {
            let errorMessage = 'فشل حذف القسم';
            
            if (err instanceof Error) {
                // Check if it's a 400 error (category has services)
                const status = (err as any).status;
                if (status === 400) {
                    errorMessage = 'لا يمكن مسح مجموعة خدمات بدون مسح كل الخدمات داخل هذة المجموعة';
                } else {
                    errorMessage = err.message || errorMessage;
                }
            }
            
            setError(errorMessage);
            alert(errorMessage);
            console.error('Error deleting category:', err);
        }
    };

    const handleViewSection = (id: string) => {
        // Navigate to category detail page to view all services
        router.push(`/dashboard/AcademicGuide/${id}`);
    };

      const handleRowClick = (id: string) => {
    // navigate to dynamic route based on id
    //
     router.push(`/dashboard/AcademicGuide/${id}`)
    
  };

    return (
        <div className="space-y-6">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            <TableCard
                title="أقسام الإرشاد الأكاديمي"
                onAdd={() => setIsModalOpen(true)}
                addButtonText="إضافة قسم"
            >
                {loading ? (
                    <div className="px-6 py-8 text-center text-gray-500">
                        جاري التحميل...
                    </div>
                ) : (
                    <ServiceTable
                        items={services}
                        onDelete={handleDeleteSection}
                        onView={handleViewSection}
                        onRowClick={handleRowClick}
                    />
                )}
            </TableCard>

            <AddSectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddSection}
                title="إضافة قسم جديد"
            />
        </div>
    );
}