"use client";

import ServiceTable, {
  ServiceItem,
} from "@/src/components/dashboard/ServiceTable";
import TableCard from "@/src/components/dashboard/TableCard";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AddServiceModal from "@/src/components/dashboard/AddServiceModal";
import { academicServiceApi } from "@/src/infrastructure/api/academicServiceApi";

export default function AcademicGuidancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<{ id: string; title: string; description: string } | null>(null);
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const categoryId = id as string;
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryTitle, setCategoryTitle] = useState<string>("");

  // Fetch services by category ID on component mount
  useEffect(() => {
    const fetchServices = async () => {
      if (!categoryId) return;

      try {
        setLoading(true);
        setError(null);
        const response = await academicServiceApi.getServicesByCategoryId(categoryId);
        
        // Map API response to ServiceItem format
        const mappedServices: ServiceItem[] = response.data.map((service) => ({
          id: service.id,
          name: service.title,
          identity: service.description,
        }));
        
        setServices(mappedServices);
        
        // Set category title if available in response
        if (response.category) {
          setCategoryTitle(response.category.title);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'فشل تحميل الخدمات');
        console.error('Error fetching services by category:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [categoryId]);

  const handleAddSection = async (title: string, description: string) => {
    if (!categoryId) {
      setError("معرف الفئة غير موجود");
      return;
    }

    try {
      setError(null);
      await academicServiceApi.createService(title, description, categoryId);
      
      // Refresh services list after successful creation
      const response = await academicServiceApi.getServicesByCategoryId(categoryId);
      const mappedServices: ServiceItem[] = response.data.map((service) => ({
        id: service.id,
        name: service.title,
        identity: service.description,
      }));
      setServices(mappedServices);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل إنشاء الخدمة';
      setError(errorMessage);
      console.error('Error creating service:', err);
      alert(errorMessage);
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الخدمة؟")) {
      return;
    }

    try {
      setError(null);
      await academicServiceApi.deleteService(id);
      
      // Refresh services list after successful deletion
      const response = await academicServiceApi.getServicesByCategoryId(categoryId);
      const mappedServices: ServiceItem[] = response.data.map((service) => ({
        id: service.id,
        name: service.title,
        identity: service.description,
      }));
      setServices(mappedServices);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل حذف الخدمة';
      setError(errorMessage);
      console.error('Error deleting service:', err);
      alert(errorMessage);
    }
  };

  const handleViewSection = (id: string) => {
    // Find the service and open edit modal
    const service = services.find(s => s.id === id);
    if (service) {
      setEditingService({
        id: service.id,
        title: service.name,
        description: typeof service.identity === 'string' ? service.identity : '',
      });
      setIsModalOpen(true);
    }
  };

  const handleEditService = async (title: string, description: string) => {
    if (!editingService) return;

    try {
      setError(null);
      await academicServiceApi.updateService(editingService.id, title, description);
      
      // Refresh services list after successful update
      const response = await academicServiceApi.getServicesByCategoryId(categoryId);
      const mappedServices: ServiceItem[] = response.data.map((service) => ({
        id: service.id,
        name: service.title,
        identity: service.description,
      }));
      setServices(mappedServices);
      setEditingService(null);
      setIsModalOpen(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'فشل تحديث الخدمة';
      setError(errorMessage);
      console.error('Error updating service:', err);
      alert(errorMessage);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <TableCard
        title={categoryTitle || "خدمات القسم"}
        onAdd={() => setIsModalOpen(true)}
        addButtonText="إضافة خدمة"
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
          />
        )}
      </TableCard>

      <AddServiceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingService(null);
        }}
        onSubmit={editingService ? handleEditService : handleAddSection}
        title={editingService ? "تعديل خدمة" : "إضافة خدمة"}
        initialData={editingService || undefined}
      />
    </div>
  );
}
