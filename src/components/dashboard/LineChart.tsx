// components/dashboard/LineChart.tsx
"use client";

import { LineChart, Line, ResponsiveContainer } from "recharts";

export const SimpleLineChart = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="value" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  );
};
