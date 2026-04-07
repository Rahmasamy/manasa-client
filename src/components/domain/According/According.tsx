import { AccordionItemProps } from "@/src/types/about-us/about-us";

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  isOpen = false,
  onClick,
}) => {
  return (
    <div className="border-b border-gray-200">

      
      <button
        onClick={onClick}
        className="w-full py-4 px-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-right"
      >
        <span className="font-semibold text-[#2885AC]">{title}</span>
        <svg
          className={`w-5 h-5 text-[#2885AC] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-sm text-gray-600 text-right leading-relaxed">
          محتوى القسم هنا...
        </div>
      )}
    </div>
  );
};
