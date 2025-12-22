import { DashboardTableRow } from "@/src/types/dashboard/analytics/anayltics";
import { TableColumn } from "./DataTable";


export const tableColumns: TableColumn<DashboardTableRow>[] = [
  {
    key: "date",
    header: "التاريخ",
  },
  {
    key: "title",
    header: "العنوان",
  },
  {
    key: "type",
    header: "النوع",
  },
  {
    key: "views",
    header: "عدد المشاهدات",
  },
  {
    key: "status",
    header: "الحالة",
    render: (value) => (
      <span
        className={`px-3 py-1 rounded-full text-xs ${
          value === "مفعل"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {value}
      </span>
    ),
  },
];
