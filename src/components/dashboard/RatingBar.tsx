interface RatingBarProps {
  label: string;
  value: number; // percentage
}

export const RatingBar = ({ label, value }: RatingBarProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="w-10 text-sm">{label}</span>
      <div className="flex-1 bg-gray-200 h-2 rounded">
        <div
          className="bg-yellow-400 h-2 rounded"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};
