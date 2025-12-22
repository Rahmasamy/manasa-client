import { DashboardCard } from "@/src/components/dashboard/DashboardCard";
import { DataTable } from "@/src/components/dashboard/DataTable";
import { SimpleLineChart } from "@/src/components/dashboard/LineChart";
import { RatingBar } from "@/src/components/dashboard/RatingBar";
import { StatCard } from "@/src/components/dashboard/StatCard";
import { tableColumns } from "@/src/components/dashboard/tableColumns";
import { ratingData, statsData, tableRows, usageChartData } from "@/src/lib/consts/dashboard/dashboardMock";
import React from "react";

const Analytics = () => {
  return (
    <div className="space-y-6 bg-gray-100">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {statsData.map((item, i) => (
          <StatCard key={i} {...item} />
        ))}
      </div>

      {/* Charts & Ratings */}
      <div className="grid grid-cols-2 gap-4">

        <DashboardCard title="التقييمات">
            <h1 className="text-3xl font-bold mb-5">
                4.2 
            </h1>
          <div className="space-y-3">
            {ratingData.map((r) => (
              <RatingBar key={r.label} {...r} />
            ))}
          </div>
        </DashboardCard>
        <DashboardCard title="نسبة استخدام المنصة">
          <SimpleLineChart data={usageChartData} />
        </DashboardCard>
      </div>

      {/* Table */}
      <DashboardCard title="آخر الأنشطة">
        <DataTable columns={tableColumns} data={tableRows} />
      </DashboardCard>
    </div>
  );
};
export default Analytics;
