"use client";
import { Button } from "@/components/ui/button";

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  subMessage?: string;
}

export default function SuccessPopup({
  isOpen,
  onClose,
  message = "تم تقديم الطلب سيتواصل معكم فريق العمل في أقرب وقت",
  subMessage = "شكراً لاختيارك العلوم الإنسانية",
}: SuccessPopupProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 flex flex-col items-center gap-4 sm:gap-6 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#39A975]/10 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12 text-[#39A975]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <div className="text-center space-y-2 sm:space-y-3">
          <p className="text-gray-800 font-semibold text-base sm:text-lg leading-relaxed">
            {message}
          </p>
          <p className="text-[#2885AC] font-bold text-lg sm:text-xl">
            {subMessage}
          </p>
        </div>

        {/* Close Button */}
        <Button
          onClick={onClose}
          className="bg-[#2885AC] text-white hover:bg-[#2885AC]/90 px-6 sm:px-8 py-2 rounded-md transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          موافق
        </Button>
      </div>
    </div>
  );
}

