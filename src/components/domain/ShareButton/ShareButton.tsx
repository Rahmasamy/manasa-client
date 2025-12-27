"use client";
import React, { useState, useRef } from "react";
import { Check } from "lucide-react";

interface ShareButtonProps {
  title?: string;
  url?: string;
  className?: string;
}

export default function ShareButton({
  title = document.title,
  url = window.location.href,
  className = "",
}: ShareButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const linkInputRef = useRef<HTMLInputElement>(null);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}&quote=${encodeURIComponent(title)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
    instagram: `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    const shareUrl = shareLinks[platform];
    window.open(shareUrl, "_blank", "width=600,height=400");
    setShowModal(false);
  };

  const handleCopyLink = () => {
    if (linkInputRef.current) {
      linkInputRef.current.select();
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset "Copied!" message after 2 seconds
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCopied(false); // Reset copied state when closing modal
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Share Button */}
      <button
        onClick={openModal}
        className="flex items-center gap-2 bg-[#2885AC] hover:bg-[#2885AC]/90 text-white px-4 py-2 rounded-lg transition-colors"
        aria-label="مشاركة"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
        </svg>
        <span className="text-sm font-medium">مشاركة</span>
      </button>

      {/* Share Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-xl font-bold text-gray-800 text-right">
              مشاركة الصفحة
            </h2>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 left-3 text-gray-400 hover:text-gray-600"
              aria-label="إغلاق"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Social Share Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6 sm:grid-cols-4">
              {/* Facebook */}
              <button
                onClick={() => handleShare("facebook")}
                className="flex flex-col items-center gap-1 p-3 transition-colors rounded-lg hover:bg-blue-50 group"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-blue-600"
                >
                  <circle cx="18" cy="18" r="18" fill="#1877F2" />
                  <path
                    d="M23 9H20.5455C19.4605 9 18.4199 9.44777 17.6527 10.2448C16.8856 11.0418 16.4545 12.1228 16.4545 13.25V15.8H14V19.2H16.4545V26H19.7273V19.2H22.1818L23 15.8H19.7273V13.25C19.7273 13.0246 19.8135 12.8084 19.9669 12.649C20.1204 12.4896 20.3285 12.4 20.5455 12.4H23V9Z"
                    fill="white"
                  />
                </svg>
                <span className="text-xs text-gray-600 group-hover:text-blue-600">
                  فيسبوك
                </span>
              </button>

              {/* Twitter/X */}
              <button
                onClick={() => handleShare("twitter")}
                className="flex flex-col items-center gap-1 p-3 transition-colors rounded-lg hover:bg-blue-50 group"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-black"
                >
                  <circle cx="18" cy="18" r="18" fill="#000000" />
                  <g clipPath="url(#clip0)">
                    <path
                      d="M22.6 10.7495H25.0537L19.6937 16.8912L26 25.2501H21.0629L17.1931 20.1815L12.7703 25.2501H10.3143L16.0469 18.6787L10 10.7507H15.0629L18.5554 15.3827L22.6 10.7495ZM21.7371 23.7781H23.0971L14.32 12.1449H12.8617L21.7371 23.7781Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(10 10)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-xs text-gray-600 group-hover:text-black">
                  تويتر
                </span>
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => handleShare("whatsapp")}
                className="flex flex-col items-center gap-1 p-3 transition-colors rounded-lg hover:bg-green-50 group"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-green-600"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                <span className="text-xs text-gray-600 group-hover:text-green-600">
                  واتساب
                </span>
              </button>

              {/* Instagram */}
              <button
                onClick={() => handleShare("instagram")}
                className="flex flex-col items-center gap-1 p-3 transition-colors rounded-lg hover:bg-pink-50 group"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-pink-600"
                >
                  <circle cx="18" cy="18" r="18" fill="#E4405F" />
                  <path
                    d="M21.3334 15.6665C21.8857 15.6665 22.3334 15.2188 22.3334 14.6665C22.3334 14.1142 21.8857 13.6665 21.3334 13.6665C20.7811 13.6665 20.3334 14.1142 20.3334 14.6665C20.3334 15.2188 20.7811 15.6665 21.3334 15.6665Z"
                    fill="white"
                  />
                  <path
                    d="M20.6667 12C22.5067 12 24 13.4933 24 15.3333V20.6667C24 22.5067 22.5067 24 20.6667 24H15.3333C13.4933 24 12 22.5067 12 20.6667V15.3333C12 13.4933 13.4933 12 15.3333 12H18H20.6667Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 15.3335C19.4734 15.3335 20.6667 16.5268 20.6667 18.0002C20.6667 19.4735 19.4734 20.6668 18 20.6668C16.5267 20.6668 15.3334 19.4735 15.3334 18.0002C15.3334 16.5268 16.5267 15.3335 18 15.3335Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs text-gray-600 group-hover:text-pink-600">
                  إنستغرام
                </span>
              </button>
            </div>

            {/* Link Copy Section */}
            <div className="mt-4 border-t pt-4">
              <label
                htmlFor="share-link"
                className="block mb-2 text-sm font-medium text-gray-700 text-right"
              >
                رابط الصفحة
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="share-link"
                  ref={linkInputRef}
                  type="text"
                  value={url}
                  readOnly
                  className="flex-grow p-2 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2885AC]"
                />
                <button
                  onClick={handleCopyLink}
                  className={`flex-shrink-0 flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    copied
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-[#2885AC] hover:bg-[#2885AC]/90 text-white"
                  }`}
                  disabled={copied}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>تم النسخ!</span>
                    </>
                  ) : (
                    <span>نسخ الرابط</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
