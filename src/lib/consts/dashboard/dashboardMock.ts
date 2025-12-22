import { DashboardTableRow } from "@/src/types/dashboard/analytics/anayltics";

// dashboardMock.ts
export const statsData = [
  {
    title: "عدد المستخدمين",
    value: 3543,
    trend: "up" as const,
    percentage: "+12%",
  },
  {
    title: "عدد الدورات",
    value: 45,
    trend: "down" as const,
    percentage: "-3%",
  },
  {
    title: "عدد المقالات",
    value: 128,
    trend: "up" as const,
    percentage: "+8%",
  },
  {
    title: "معدل التفاعل",
    value: "4.2",
    trend: "up" as const,
    percentage: "+0.4",
  },
];
export const usageChartData = [
  { name: "يناير", value: 80 },
  { name: "فبراير", value: 65 },
  { name: "مارس", value: 72 },
  { name: "أبريل", value: 60 },
  { name: "مايو", value: 55 },
  { name: "يونيو", value: 48 },
];
export const ratingData = [
  { label: "5 نجوم", value: 70 },
  { label: "4 نجوم", value: 20 },
  { label: "3 نجوم", value: 7 },
  { label: "2 نجوم", value: 2 },
  { label: "1 نجمة", value: 1 },
];
export const tableRows: DashboardTableRow[] = [
  {
    id: 1,
    title: "مقالة عن الإرشاد الأكاديمي",
    type: "مقال",
    views: 544,
    status: "مفعل",
    date: "15/12/2025",
  },
  {
    id: 2,
    title: "دورة تطوير المهارات",
    type: "دورة",
    views: 432,
    status: "مفعل",
    date: "14/12/2025",
  },
  {
    id: 3,
    title: "مقالة عن البحث العلمي",
    type: "مقال",
    views: 389,
    status: "موقوف",
    date: "13/12/2025",
  },
  {
    id: 4,
    title: "دورة إدارة الوقت",
    type: "دورة",
    views: 298,
    status: "مفعل",
    date: "12/12/2025",
  },
];
