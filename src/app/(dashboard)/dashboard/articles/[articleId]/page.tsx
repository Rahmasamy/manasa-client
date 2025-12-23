"use client";

import AddNewArticle from "@/src/components/dashboard/AddNewArticle";
import AddSectionModal from "@/src/components/dashboard/AddSectionModal";
import ServiceTable, {
  ServiceItem,
} from "@/src/components/dashboard/ServiceTable";
import TableCard from "@/src/components/dashboard/TableCard";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Articles() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([
    { id: "1", name: "الصياغة الأكاديمية والتحرير العلمي", identity: 50 },
    { id: "2", name: "الصياغة الأكاديمية والتحرير العلمي", identity: 50 },
    { id: "3", name: "الصياغة الأكاديمية والتحرير العلمي", identity: 50 },
    { id: "4", name: "الصياغة الأكاديمية والتحرير العلمي", identity: 50 },
    { id: "5", name: "الصياغة الأكاديمية والتحرير العلمي", identity: 50 },
    { id: "6", name: "الصياغة الأكاديمية والتحرير العلمي", identity: 50 },
    { id: "7", name: "الصياغة الأكاديمية والتحرير العلمي", identity: 50 },
    { id: "8", name: "الصياغة الأكاديمية والتحرير العلمي", identity: 50 },
    { id: "9", name: "الصياغة الأكاديمية والتحرير العلمي", identity: 50 },
    { id: "10", name: "الصياغة الأكاديمية والتحرير العلمي", identity: 50 },
    { id: "11", name: "الصياغة الأكاديمية والتحرير العلمي", identity: 50 },
    { id: "12", name: "الصياغة الأكاديمية والتحرير العلمي", identity: 50 },
  ]);
  const router = useRouter();
  const { articleId } = useParams();
  const handleAddSection = (name: string, identity: number) => {
    const newService: ServiceItem = {
      id: Date.now().toString(),
      name,
      identity,
    };
    setServices([...services, newService]);
  };

  const handleDeleteSection = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا القسم؟")) {
      setServices(services.filter((service) => service.id !== id));
    }
  };

  const handleViewSection = (id: string) => {
    const service = services.find((s) => s.id === id);
    console.log("View section:", service);
    // Navigate to detail page or show modal
    alert(`عرض القسم: ${service?.name}`);
  };
  const handleRowClick = (id: string) => {
    // navigate to dynamic route based on id
    //
    router.push(`/dashboard/articles/${articleId}/${id}`);
  };
  return (
    <div className="space-y-6">
      <TableCard
        title="  مقالة نباتات مرضية   "
        onAdd={() => setIsModalOpen(true)}
        addButtonText=" اضف مقالة"
      >
        <ServiceTable
          items={services}
          onDelete={handleDeleteSection}
          onView={handleViewSection}
          serviceHeadline="  الكاتب  "
          onRowClick={handleRowClick}
        />
      </TableCard>

      <AddNewArticle
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSection}
        title="إضافة مقالة جديد"
      />
    </div>
  );
}
