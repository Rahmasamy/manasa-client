"use client";
import { useEffect } from "react";

interface ConsultationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onRedirect: () => void;
}

export default function ConsultationPopup({
  isOpen,
  onClose,
  onRedirect,
}: ConsultationPopupProps) {
  useEffect(() => {
    if (isOpen) {
      // Trigger email redirect at 1 second (while popup is still visible)
      const redirectTimer = setTimeout(() => {
        onRedirect();
      }, 1000); // 1 second

      // Close popup at 2 seconds
      const closeTimer = setTimeout(() => {
        onClose();
      }, 2000); // 2 seconds

      return () => {
        clearTimeout(redirectTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [isOpen, onClose, onRedirect]);

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
        {/* Loading Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#2885AC]/10 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12 text-[#2885AC] animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>

        {/* Messages */}
        <div className="text-center space-y-2 sm:space-y-3">
          <p className="text-gray-800 font-semibold text-base sm:text-lg leading-relaxed">
            نحن في الخدمة
          </p>
          <p className="text-[#2885AC] font-medium text-sm sm:text-base leading-relaxed">
            نرجو توضيح الإستفسار مع إرفاق أي مستندات لازمة
          </p>
        </div>
      </div>
    </div>
  );
}

