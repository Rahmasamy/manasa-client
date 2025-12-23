"use client";

import AddCourseModal from "@/src/components/dashboard/AddCourse";
import AddMasterSection from "@/src/components/dashboard/AddMasterSections";
import AddSectionModal from "@/src/components/dashboard/AddSectionModal";
import ServiceTable, {
  ServiceItem,
} from "@/src/components/dashboard/ServiceTable";
import TableCard from "@/src/components/dashboard/TableCard";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function CourseDetailsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const { MasterId } = params;
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

  const handleViewSection = (MasterId: string) => {
    const service = services.find((s) => s.id === MasterId);
    console.log("View section:", service);
    // Navigate to detail page or show modal
  
    router.push(`/dashboard/electronic-library/${MasterId}/${MasterId}`);
  };

  const handleRowClick = (MasterId: string) => {
    // navigate to dynamic route based on id
    //
    router.push(`/dashboard/electronic-library/${MasterId}/${MasterId}`);
  };

  return (
    <div className="space-y-6">
      <TableCard
        title="رسائل الماجستير بلعربي"
        onAdd={() => setIsModalOpen(true)}
        addButtonText="  موضوع"
      >
        <ServiceTable
          items={services}
          onDelete={handleDeleteSection}
          onView={handleViewSection}
          onRowClick={handleRowClick}
          serviceHeadline="الكاتب"
        />
      </TableCard>

      <AddMasterSection
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddSection}
        title="  دورة"
      />
    </div>
  );
}
