"use client";

import AddSectionModal from "@/src/components/dashboard/AddSectionModal";
import ServiceTable, {
  ServiceItem,
} from "@/src/components/dashboard/ServiceTable";
import TableCard from "@/src/components/dashboard/TableCard";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AddServiceModal from "@/src/components/dashboard/AddServiceModal";

export default function AcademicGuidancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
   const params = useParams();
  const { id, ServiceId } = params;
  const [services, setServices] = useState<any[]>([
    {
      id: "1",
      name: "الصياغة الأكاديمية والتحرير العلمي",
      identity:
        "تهدف هذه الخدمة إلى مساعدة الباحث في اختيار موضوع بحث دقيق وحديث ومناسب لتخصصة .....",
    },
    {
      id: "2",
      name: "الصياغة الأكاديمية والتحرير العلمي",
      identity:
        "تهدف هذه الخدمة إلى مساعدة الباحث في اختيار موضوع بحث دقيق وحديث ومناسب لتخصصة .....",
    },
    {
      id: "3",
      name: "الصياغة الأكاديمية والتحرير العلمي",
      identity:
        "تهدف هذه الخدمة إلى مساعدة الباحث في اختيار موضوع بحث دقيق وحديث ومناسب لتخصصة .....",
    },
    {
      id: "4",
      name: "الصياغة الأكاديمية والتحرير العلمي",
      identity:
        "تهدف هذه الخدمة إلى مساعدة الباحث في اختيار موضوع بحث دقيق وحديث ومناسب لتخصصة .....",
    },
    {
      id: "5",
      name: "الصياغة الأكاديمية والتحرير العلمي",
      identity:
        "تهدف هذه الخدمة إلى مساعدة الباحث في اختيار موضوع بحث دقيق وحديث ومناسب لتخصصة .....",
    },
    {
      id: "6",
      name: "الصياغة الأكاديمية والتحرير العلمي",
      identity:
        "تهدف هذه الخدمة إلى مساعدة الباحث في اختيار موضوع بحث دقيق وحديث ومناسب لتخصصة .....",
    },
    {
      id: "7",
      name: "الصياغة الأكاديمية والتحرير العلمي",
      identity:
        "تهدف هذه الخدمة إلى مساعدة الباحث في اختيار موضوع بحث دقيق وحديث ومناسب لتخصصة .....",
    },
    {
      id: "8",
      name: "الصياغة الأكاديمية والتحرير العلمي",
      identity:
        "تهدف هذه الخدمة إلى مساعدة الباحث في اختيار موضوع بحث دقيق وحديث ومناسب لتخصصة .....",
    },
    {
      id: "9",
      name: "الصياغة الأكاديمية والتحرير العلمي",
      identity:
        "تهدف هذه الخدمة إلى مساعدة الباحث في اختيار موضوع بحث دقيق وحديث ومناسب لتخصصة .....",
    },
    {
      id: "10",
      name: "الصياغة الأكاديمية والتحرير العلمي",
      identity:
        "تهدف هذه الخدمة إلى مساعدة الباحث في اختيار موضوع بحث دقيق وحديث ومناسب لتخصصة .....",
    },
    {
      id: "11",
      name: "الصياغة الأكاديمية والتحرير العلمي",
      identity:
        "تهدف هذه الخدمة إلى مساعدة الباحث في اختيار موضوع بحث دقيق وحديث ومناسب لتخصصة .....",
    },
    {
      id: "12",
      name: "الصياغة الأكاديمية والتحرير العلمي",
      identity:
        "تهدف هذه الخدمة إلى مساعدة الباحث في اختيار موضوع بحث دقيق وحديث ومناسب لتخصصة .....",
    },
  ]);

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
    router.push(`/dashboard/AcademicGuide/${id}/${ServiceId}`);
  };
  const handleRowClick = () => {
    // navigate to dynamic route based on id
    //
    router.push(`/dashboard/AcademicGuide/${id}/${ServiceId}`);
  };
  return (
    <div className="space-y-6">
      <TableCard
        title="أقسام الإرشاد الأكاديمي"
        onAdd={() => setIsModalOpen(true)}
        addButtonText="وصف القسم "
      >
        <ServiceTable
          items={services}
          onDelete={handleDeleteSection}
          onView={handleViewSection}
          onRowClick={handleRowClick}
        />
      </TableCard>

      <AddServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSection}
        title="اضافة خدمة  "
      />
    </div>
  );
}
