// components/dashboard/DashboardCard.tsx
export const DashboardCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h3 className="mb-4 font-semibold">{title}</h3>
      {children}
    </div>
  );
};
