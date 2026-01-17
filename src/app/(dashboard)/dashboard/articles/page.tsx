"use client";

import AddArticleModal from "@/src/components/dashboard/AddArticleModal";
import ServiceTable, {
  ServiceItem,
} from "@/src/components/dashboard/ServiceTable";
import TableCard from "@/src/components/dashboard/TableCard";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { articleApi, ApiArticle } from "@/src/infrastructure/api/articleApi";

export default function Articles() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ApiArticle | null>(null);
  const router = useRouter();
  const [articles, setArticles] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await articleApi.getAllArticles();
        
        // Backend returns { message, data } or array directly
        const items: ApiArticle[] = Array.isArray(response) 
          ? response 
          : (response.data || response.articles || []);

        // Map API response to ServiceItem format
        const mappedItems: ServiceItem[] = items.map((item) => {
          // Format creation date or show category name if available
          const identityDisplay = item.category?.title 
            ? item.category.title 
            : new Date(item.createdAt).toLocaleDateString("ar-SA");

          return {
            id: String(item.id),
            name: item.title,
            identity: identityDisplay,
          };
        });

        setArticles(mappedItems);
      } catch (err) {
        setError(err instanceof Error ? err.message : "فشل تحميل المقالات");
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleAddSection = () => {
    setEditingArticle(null);
    setIsModalOpen(true);
  };

  const handleEditArticle = (id: string) => {
    // Find the original article from the API response
    const fetchAndEdit = async () => {
      try {
        setError(null);
        const response = await articleApi.getAllArticles();
        const items: ApiArticle[] = Array.isArray(response) 
          ? response 
          : (response.data || response.articles || []);
        
        const article = items.find((a) => String(a.id) === id);
        if (article) {
          setEditingArticle(article);
          setIsModalOpen(true);
        } else {
          setError("المقال غير موجود");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "فشل تحميل بيانات المقال");
        console.error("Error fetching article for edit:", err);
      }
    };

    fetchAndEdit();
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المقال؟")) {
      return;
    }

    try {
      setError(null);
      await articleApi.deleteArticle(id);

      // Refresh articles after successful deletion
      const response = await articleApi.getAllArticles();
      const items: ApiArticle[] = Array.isArray(response) 
        ? response 
        : (response.data || response.articles || []);

      const mappedItems: ServiceItem[] = items.map((item) => {
        const identityDisplay = item.category?.title 
          ? item.category.title 
          : new Date(item.createdAt).toLocaleDateString("ar-SA");

        return {
          id: String(item.id),
          name: item.title,
          identity: identityDisplay,
        };
      });

      setArticles(mappedItems);
    } catch (err) {
      let errorMessage = "فشل حذف المقال";
      
      if (err instanceof Error) {
        const status = (err as any).status;
        if (status === 404) {
          errorMessage = "المقال غير موجود";
        } else {
          errorMessage = err.message || errorMessage;
        }
      }

      setError(errorMessage);
      alert(errorMessage);
      console.error("Error deleting article:", err);
    }
  };

  const handleSubmitModal = async (formData: FormData) => {
    try {
      setError(null);

      if (editingArticle) {
        // Update existing article
        await articleApi.updateArticle(String(editingArticle.id), formData);
      } else {
        // Create new article
        await articleApi.createArticle(formData);
      }

      // Refresh articles after successful create/update
      const response = await articleApi.getAllArticles();
      const items: ApiArticle[] = Array.isArray(response) 
        ? response 
        : (response.data || response.articles || []);

      const mappedItems: ServiceItem[] = items.map((item) => {
        const identityDisplay = item.category?.title 
          ? item.category.title 
          : new Date(item.createdAt).toLocaleDateString("ar-SA");

        return {
          id: String(item.id),
          name: item.title,
          identity: identityDisplay,
        };
      });

      setArticles(mappedItems);
      setIsModalOpen(false);
      setEditingArticle(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : (editingArticle ? "فشل تحديث المقال" : "فشل إنشاء المقال");
      setError(errorMessage);
      console.error(`Error ${editingArticle ? "updating" : "creating"} article:`, err);
      alert(errorMessage);
    }
  };

  const handleViewSection = (id: string) => {
    // Use for editing (change "تعديل" button to call this)
    handleEditArticle(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <TableCard
        title="عناصر المقالات"
        onAdd={handleAddSection}
        addButtonText="إضافة مقال"
      >
        {loading ? (
          <div className="px-6 py-8 text-center text-gray-500">
            جاري التحميل...
          </div>
        ) : (
          <ServiceTable
            items={articles}
            onDelete={handleDeleteSection}
            onView={handleViewSection}
            serviceHeadline="التاريخ / التصنيف"
          />
        )}
      </TableCard>

      <AddArticleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        title={editingArticle ? "تعديل مقال" : "إضافة مقال"}
        initialData={editingArticle ? {
          id: String(editingArticle.id),
          title: editingArticle.title,
          content: editingArticle.content || null,
          imageUrl: editingArticle.imageUrl || editingArticle.photoUrl || null,
        } : undefined}
      />
    </div>
  );
}
