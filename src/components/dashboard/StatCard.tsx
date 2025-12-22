// components/dashboard/StatCard.tsx
export interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  trend?: "up" | "down";
  percentage?: string;
}

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  percentage,
}: StatCardProps) => {
  return (
    <div className="bg-white border border-gray rounded-xl p-5 shadow-sm flex justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>

        {percentage && (
          <span
            className={`text-sm ${
              trend === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {percentage}
          </span>
        )}
      </div>

      {icon && <div className="text-gray-400">{icon}</div>}
    </div>
  );
};
