"use client";

import AddSectionModal from "@/src/components/dashboard/AddSectionModal";
import ServiceTable, {
  ServiceItem,
} from "@/src/components/dashboard/ServiceTable";
import TableCard from "@/src/components/dashboard/TableCard";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ElectronicLibrary() {
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
    router.push(`/dashboard/electronic-library/${id}`);
  };
  const handleRowClick = (id: string) => {
    // navigate to dynamic route based on id
    //
    router.push(`/dashboard/electronic-library/${id}`);
  };

  return (
    <div className="space-y-6">
      <TableCard
        title=" أقسام المكتبة الألكترونية "
        onAdd={() => setIsModalOpen(true)}
        addButtonText="إضافة قسم"
      >
        <ServiceTable
          items={services}
          onDelete={handleDeleteSection}
          onView={handleViewSection}
          serviceHeadline=" عدد المواضيع "
          onRowClick={handleRowClick}
        />
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
