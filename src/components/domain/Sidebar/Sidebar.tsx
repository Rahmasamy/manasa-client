import React from "react";
import { ChevronDown, Send } from "lucide-react";

interface SidebarItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
}

interface SidebarProps {
  sections?: SidebarItem[];
  mostViewed?: SidebarItem[];
}

export default function Sidebar({
  sections = [
    {
      id: "1",
      title: "ملخصات رسائل الماجستير والدكتوراه بلعربي",
    },
    {
      id: "2",
      title: "ملخصات رسائل الماجستير والدكتوراه بلعربي",
    },
  ],
  mostViewed = [
    {
      id: "1",
      title: "ادارة الوقت بذكاء من قاعدة ابدا الآن الي العمل العميق",
    },
    {
      id: "2",
      title: "ادارة الوقت بذكاء من قاعدة ابدا الآن الي العمل العميق",
    },
    {
      id: "3",
      title: "ادارة الوقت بذكاء من قاعدة ابدا الآن الي العمل العميق",
    },
    {
      id: "4",
      title: "ادارة الوقت بذكاء من قاعدة ابدا الآن الي العمل العميق",
    },
  ],
}: SidebarProps) {
  return (
    <aside className="w-full lg:w-80 flex-shrink-0 px-6 lg:px-8 py-10 space-y-8 border-l-0 lg:border-l border-gray-200" dir="rtl">
      {/* Sections */}
      <div>
        <h3 className="font-bold text-xl mb-4 text-gray-800">الأقسام</h3>
        <div className="space-y-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href="#"
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors group border border-transparent hover:border-gray-200"
            >
              <span className="text-gray-500 text-sm font-medium flex-1 text-right">
                {section.title}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700 flex-shrink-0 mr-2" />
            </a>
          ))}
        </div>
      </div>

      {/* Most Viewed */}
      <div>
        <h3 className="font-bold text-xl mb-4 text-gray-800">الأكثر مشاهدة</h3>
        <div className="space-y-2">
          {mostViewed.map((item) => (
            <a
              key={item.id}
              href="#"
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors group border border-transparent hover:border-gray-200"
            >
              <Send className="w-4 h-4 text-[#2885AC] mt-1 flex-shrink-0 group-hover:text-gray-700" />
              <span className="text-gray-500 text-sm font-medium leading-relaxed text-right">
                {item.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

