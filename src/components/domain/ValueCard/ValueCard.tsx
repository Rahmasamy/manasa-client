import { ValueCardProps } from "@/src/types/about-us/about-us";

export const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => {
  return (
    <div className="group bg-white rounded-lg border-2 border-[#2890bc] 
      hover:bg-[#2890bc] p-6 hover:shadow-lg transition-shadow transition-transform">

      {icon && (
        <div className="mb-4 group-hover:text-white">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-bold text-gray-800 mb-3 text-right 
        group-hover:text-white">
        {title}
      </h3>

      <p className="text-sm text-gray-600 text-right leading-relaxed 
        group-hover:text-white">
        {description}
      </p>
    </div>
  );
};
