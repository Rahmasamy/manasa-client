"use client";

import AddLibraryItemModal from "@/src/components/dashboard/AddLibraryItemModal";
import ServiceTable, {
  ServiceItem,
} from "@/src/components/dashboard/ServiceTable";
import TableCard from "@/src/components/dashboard/TableCard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { electronicLibraryApi, ApiElectronicLibrary } from "@/src/infrastructure/api/electronicLibraryApi";

export default function ElectronicLibrary() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ApiElectronicLibrary | null>(null);
  const router = useRouter();
  const [libraryItems, setLibraryItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch library items on component mount
  useEffect(() => {
    const fetchLibraryItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await electronicLibraryApi.getAllLibraryItems();
        
        // Backend returns array directly or wrapped in data property
        const items: ApiElectronicLibrary[] = Array.isArray(response) 
          ? response 
          : (response.data || response.library || []);

        // Map API response to ServiceItem format
        const mappedItems: ServiceItem[] = items.map((item) => {
          // Get type display text
          const typeDisplay = item.type || item.ResearchType || "";
          const typeText = typeDisplay === "ARABIC_ABSTRACTS" 
            ? "عربي" 
            : typeDisplay === "ENGLISH_ABSTRACTS" 
            ? "إنجليزي" 
            : typeDisplay || "غير محدد";

          return {
            id: String(item.id), // Convert to string for ServiceItem compatibility
            name: item.title,
            identity: typeText, // Display type in the identity column
          };
        });

        setLibraryItems(mappedItems);
      } catch (err) {
        setError(err instanceof Error ? err.message : "فشل تحميل عناصر المكتبة");
        console.error("Error fetching library items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLibraryItems();
  }, []);

  const handleAddSection = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (id: string) => {
    // Find the original item from the API response
    const fetchAndEdit = async () => {
      try {
        setError(null);
        const response = await electronicLibraryApi.getAllLibraryItems();
        const items: ApiElectronicLibrary[] = Array.isArray(response) 
          ? response 
          : (response.data || response.library || []);
        
        const item = items.find((i) => String(i.id) === id);
        if (item) {
          // Map ResearchType to type if needed
          const itemToEdit: ApiElectronicLibrary = {
            ...item,
            type: item.type || item.ResearchType || "",
          };
          setEditingItem(itemToEdit);
          setIsModalOpen(true);
        } else {
          setError("العنصر غير موجود");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "فشل تحميل بيانات العنصر");
        console.error("Error fetching item for edit:", err);
      }
    };

    fetchAndEdit();
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا العنصر؟")) {
      return;
    }

    try {
      setError(null);
      await electronicLibraryApi.deleteLibraryItem(id);

      // Refresh library items after successful deletion
      const response = await electronicLibraryApi.getAllLibraryItems();
      const items: ApiElectronicLibrary[] = Array.isArray(response) 
        ? response 
        : (response.data || response.library || []);

      const mappedItems: ServiceItem[] = items.map((item) => {
        const typeDisplay = item.type || item.ResearchType || "";
        const typeText = typeDisplay === "ARABIC_ABSTRACTS" 
          ? "عربي" 
          : typeDisplay === "ENGLISH_ABSTRACTS" 
          ? "إنجليزي" 
          : typeDisplay || "غير محدد";

        return {
          id: String(item.id),
          name: item.title,
          identity: typeText,
        };
      });

      setLibraryItems(mappedItems);
    } catch (err) {
      let errorMessage = "فشل حذف العنصر";
      
      if (err instanceof Error) {
        const status = (err as any).status;
        if (status === 404) {
          errorMessage = "العنصر غير موجود";
        } else {
          errorMessage = err.message || errorMessage;
        }
      }

      setError(errorMessage);
      alert(errorMessage);
      console.error("Error deleting library item:", err);
    }
  };

  const handleSubmitModal = async (formData: FormData) => {
    try {
      setError(null);

      if (editingItem) {
        // Update existing item
        await electronicLibraryApi.updateLibraryItem(editingItem.id, formData);
      } else {
        // Create new item
        await electronicLibraryApi.createLibraryItem(formData);
      }

      // Refresh library items after successful create/update
      const response = await electronicLibraryApi.getAllLibraryItems();
      const items: ApiElectronicLibrary[] = Array.isArray(response) 
        ? response 
        : (response.data || response.library || []);

      const mappedItems: ServiceItem[] = items.map((item) => {
        const typeDisplay = item.type || item.ResearchType || "";
        const typeText = typeDisplay === "ARABIC_ABSTRACTS" 
          ? "عربي" 
          : typeDisplay === "ENGLISH_ABSTRACTS" 
          ? "إنجليزي" 
          : typeDisplay || "غير محدد";

        return {
          id: String(item.id),
          name: item.title,
          identity: typeText,
        };
      });

      setLibraryItems(mappedItems);
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : (editingItem ? "فشل تحديث العنصر" : "فشل إنشاء العنصر");
      setError(errorMessage);
      console.error(`Error ${editingItem ? "updating" : "creating"} library item:`, err);
      alert(errorMessage);
    }
  };

  const handleViewSection = (id: string) => {
    // This can be used for navigation if needed in the future
    // For now, we'll use it for editing
    handleEditItem(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <TableCard
        title="عناصر المكتبة الألكترونية"
        onAdd={handleAddSection}
        addButtonText="إضافة عنصر"
      >
        {loading ? (
          <div className="px-6 py-8 text-center text-gray-500">
            جاري التحميل...
          </div>
        ) : (
          <ServiceTable
            items={libraryItems}
            onDelete={handleDeleteSection}
            onView={handleViewSection}
            serviceHeadline="النوع"
          />
        )}
      </TableCard>

      <AddLibraryItemModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        title={editingItem ? "تعديل عنصر مكتبة" : "إضافة عنصر مكتبة"}
        initialData={editingItem ? {
          id: editingItem.id,
          title: editingItem.title,
          type: editingItem.type || editingItem.ResearchType || "",
          content: editingItem.content || null,
          imageUrl: editingItem.imageUrl || editingItem.photoUrl || null,
        } : undefined}
      />
    </div>
  );
}
