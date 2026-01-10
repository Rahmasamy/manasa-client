import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 items-start gap-6 sm:gap-8 lg:gap-10 p-6 sm:p-8 md:p-10 lg:p-14">
        {/* Social Icons - Full width on mobile, spans 2 cols on larger screens */}
        <div className="flex flex-col items-start gap-4 sm:gap-6 md:gap-9 col-span-1 sm:col-span-2 order-1 lg:order-none">
          <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-1 sm:mb-2">
            وسائل التواصل الأجتماعي
          </h3>
          <div className="flex gap-3 sm:gap-4 items-center flex-wrap">
            <a
              href="https://www.facebook.com/elacademia100/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Facebook"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
              >
                <circle cx="18" cy="18" r="18" fill="#18181B" />
                <path
                  d="M23 9H20.5455C19.4605 9 18.4199 9.44777 17.6527 10.2448C16.8856 11.0418 16.4545 12.1228 16.4545 13.25V15.8H14V19.2H16.4545V26H19.7273V19.2H22.1818L23 15.8H19.7273V13.25C19.7273 13.0246 19.8135 12.8084 19.9669 12.649C20.1204 12.4896 20.3285 12.4 20.5455 12.4H23V9Z"
                  fill="#FCFCFC"
                />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/elacademia1000/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Instagram"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
              >
                <circle cx="18" cy="18" r="18" fill="#18181B" />
                <path
                  d="M21.3334 15.6665C21.8857 15.6665 22.3334 15.2188 22.3334 14.6665C22.3334 14.1142 21.8857 13.6665 21.3334 13.6665C20.7811 13.6665 20.3334 14.1142 20.3334 14.6665C20.3334 15.2188 20.7811 15.6665 21.3334 15.6665Z"
                  fill="#FCFCFC"
                />
                <path
                  d="M20.6667 12C22.5067 12 24 13.4933 24 15.3333V20.6667C24 22.5067 22.5067 24 20.6667 24H15.3333C13.4933 24 12 22.5067 12 20.6667V15.3333C12 13.4933 13.4933 12 15.3333 12H18H20.6667Z"
                  stroke="#FCFCFC"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 15.3335C19.4734 15.3335 20.6667 16.5268 20.6667 18.0002C20.6667 19.4735 19.4734 20.6668 18 20.6668C16.5267 20.6668 15.3334 19.4735 15.3334 18.0002C15.3334 16.5268 16.5267 15.3335 18 15.3335Z"
                  stroke="#FCFCFC"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="WhatsApp"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
              >
                <circle cx="18" cy="18" r="18" fill="#18181B" />
                <g clipPath="url(#clip0_184_7590)">
                  <path
                    d="M21.42 19.49C21.23 19.4 20.32 18.95 20.15 18.88C19.98 18.81 19.86 18.79 19.73 18.98C19.6 19.17 19.25 19.58 19.14 19.71C19.03 19.84 18.93 19.85 18.74 19.71C18.194 19.4916 17.6899 19.1803 17.25 18.79C16.852 18.4143 16.5147 17.9791 16.25 17.5C16.14 17.32 16.25 17.22 16.33 17.12C16.41 17.02 16.51 16.91 16.61 16.8C16.683 16.7048 16.7435 16.6007 16.79 16.49C16.8148 16.4386 16.8277 16.3822 16.8277 16.325C16.8277 16.2679 16.8148 16.2115 16.79 16.16C16.79 16.07 16.37 15.16 16.21 14.79C16.05 14.42 15.91 14.47 15.8 14.47H15.4C15.2094 14.4775 15.0296 14.5602 14.9 14.7C14.6907 14.8997 14.525 15.1405 14.4131 15.4072C14.3013 15.6739 14.2457 15.9608 14.25 16.25C14.3017 16.9599 14.5627 17.6385 15 18.2C15.8027 19.3941 16.9019 20.359 18.19 21C18.63 21.19 18.97 21.3 19.24 21.39C19.6189 21.5058 20.0199 21.5297 20.41 21.46C20.6691 21.4075 20.9146 21.3022 21.1314 21.1509C21.3481 20.9995 21.5314 20.8052 21.67 20.58C21.7853 20.302 21.8233 19.9979 21.78 19.7C21.73 19.63 21.61 19.58 21.42 19.49Z"
                    fill="#FCFCFC"
                  />
                  <path
                    d="M23.29 12.6798C22.5984 11.9816 21.774 11.4291 20.8655 11.0547C19.9569 10.6803 18.9826 10.4916 18 10.4998C16.6983 10.5066 15.4211 10.8548 14.2961 11.5096C13.1711 12.1645 12.2376 13.1031 11.5888 14.2316C10.94 15.3601 10.5987 16.6391 10.5989 17.9408C10.5991 19.2426 10.9408 20.5214 11.59 21.6498L10.59 25.4998L14.53 24.4998C15.6192 25.0925 16.8399 25.4019 18.08 25.3998H18C19.4779 25.4094 20.9252 24.9786 22.1573 24.1624C23.3894 23.3462 24.3505 22.1815 24.9181 20.8169C25.4856 19.4522 25.6338 17.9495 25.3438 16.5002C25.0539 15.051 24.3389 13.721 23.29 12.6798ZM18 24.1198C16.8904 24.1217 15.8013 23.8209 14.85 23.2498L14.63 23.1198L12.29 23.7298L12.91 21.4498L12.77 21.2198C11.9713 19.9336 11.6726 18.399 11.9304 16.9072C12.1883 15.4153 12.9847 14.0701 14.1687 13.1266C15.3527 12.1831 16.8419 11.707 18.3536 11.7887C19.8654 11.8704 21.2945 12.5042 22.37 13.5698C22.9465 14.1417 23.4035 14.8226 23.7142 15.5728C24.025 16.3231 24.1833 17.1277 24.18 17.9398C24.1773 19.578 23.5254 21.1484 22.367 22.3068C21.2086 23.4652 19.6382 24.1171 18 24.1198Z"
                    fill="#FCFCFC"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_184_7590">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(10 10)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>

            <a
              href="https://x.com/elacademia100"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Twitter/X"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
              >
                <circle cx="18" cy="18" r="18" fill="#18181B" />
                <g clipPath="url(#clip0_184_7591)">
                  <mask
                    id="mask0_184_7591"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="10"
                    y="10"
                    width="16"
                    height="16"
                  >
                    <path d="M10 10H26V26H10V10Z" fill="white" />
                  </mask>
                  <g mask="url(#mask0_184_7591)">
                    <path
                      d="M22.6 10.7495H25.0537L19.6937 16.8912L26 25.2501H21.0629L17.1931 20.1815L12.7703 25.2501H10.3143L16.0469 18.6787L10 10.7507H15.0629L18.5554 15.3827L22.6 10.7495ZM21.7371 23.7781H23.0971L14.32 12.1449H12.8617L21.7371 23.7781Z"
                      fill="#FCFCFC"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_184_7591">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(10 10)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>

        {/* Pages */}
        <div className="order-2 lg:order-none">
          <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-2 sm:mb-3">
            الصفحات
          </h3>
          <ul className="space-y-1.5 sm:space-y-2 text-[#27272A] text-sm sm:text-base">
            <li className="hover:text-gray-600 cursor-pointer transition-colors">
              <a href="/acedemic">خدمات الإرشاد الأكاديمي</a>
            </li>
            <li className="hover:text-gray-600 cursor-pointer transition-colors">
              <a href="/courses">الدورات والبرامج</a>
            </li>
            <li className="hover:text-gray-600 cursor-pointer transition-colors">
              <a href="/articles">المقالات العلمية</a>
            </li>
            <li className="hover:text-gray-600 cursor-pointer transition-colors">
              <a href="/electronic-library">المكتبة الإلكترونية</a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="order-3 lg:order-none">
          <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-2 sm:mb-3">
            الخدمات
          </h3>
          <ul className="space-y-1.5 sm:space-y-2 text-[#27272A] text-sm sm:text-base">
            <li className="hover:text-gray-600 cursor-pointer transition-colors">
              <a href="/acedemic">خدمات الإرشاد الأكاديمي</a>
            </li>
            <li className="hover:text-gray-600 cursor-pointer transition-colors">
              <a href="/courses">الدورات والبرامج</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="order-4 lg:order-none">
          <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-2 sm:mb-3">
            تواصل معنا
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-[#27272A] text-sm sm:text-base">
            <li className="flex items-center gap-2 sm:gap-3">
              <span className="flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                >
                  <path
                    d="M13.832 16.568C14.0385 16.6628 14.2712 16.6845 14.4917 16.6294C14.7122 16.5744 14.9073 16.4458 15.045 16.265L15.4 15.8C15.5863 15.5516 15.8279 15.35 16.1056 15.2111C16.3833 15.0723 16.6895 15 17 15H20C20.5304 15 21.0391 15.2107 21.4142 15.5858C21.7893 15.9609 22 16.4696 22 17V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22C15.2261 22 10.6477 20.1036 7.27208 16.7279C3.89642 13.3523 2 8.7739 2 4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H7C7.53043 2 8.03914 2.21071 8.41421 2.58579C8.78929 2.96086 9 3.46957 9 4V7C9 7.31049 8.92771 7.61672 8.78885 7.89443C8.65 8.17214 8.44839 8.41371 8.2 8.6L7.732 8.951C7.54842 9.09118 7.41902 9.29059 7.36579 9.51535C7.31256 9.74012 7.33878 9.97638 7.44 10.184C8.80668 12.9599 11.0544 15.2048 13.832 16.568Z"
                    stroke="#27272A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

 0557818234
            </li>
            <li className="flex items-center gap-2 sm:gap-3 break-all">
              <span className="flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                >
                  <path
                    d="M22 7L13.009 12.727C12.7039 12.9042 12.3573 12.9976 12.0045 12.9976C11.6517 12.9976 11.3051 12.9042 11 12.727L2 7"
                    stroke="#27272A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
                    stroke="#27272A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="hover:text-gray-600 transition-colors">
                order@hspportal.com
              </span>
            </li>
            <li className="flex items-center gap-2 sm:gap-3">
              <span className="flex-shrink-0">
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-5 sm:w-5 sm:h-6"
                >
                  <path
                    d="M17 9C17 13.993 11.461 19.193 9.601 20.799C9.42772 20.9293 9.2168 20.9998 9 20.9998C8.7832 20.9998 8.57228 20.9293 8.399 20.799C6.539 19.193 1 13.993 1 9C1 6.87827 1.84285 4.84344 3.34315 3.34315C4.84344 1.84285 6.87827 1 9 1C11.1217 1 13.1566 1.84285 14.6569 3.34315C16.1571 4.84344 17 6.87827 17 9Z"
                    stroke="#27272A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              الرياض حي العليا
            </li>
          </ul>
        </div>

        {/* Logo - Last on mobile, positioned normally on desktop */}
        <div className="flex flex-col items-center sm:items-start md:items-center gap-2 order-5 lg:order-none col-span-1 sm:col-span-2 lg:col-span-1 mx-auto sm:mx-0 lg:mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 flex items-center justify-center overflow-hidden shadow-sm">
            <Image
              src="/icons/logo.png"
              alt="Logo"
              width={70}
              height={70}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#134053] text-white text-right text-xs sm:text-sm md:text-base py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8 lg:px-10">
        <p className="max-w-7xl mx-auto">
          © 2025 جميع الحقوق محفوظة لموقع بوابة العلوم الإنسانية
        </p>
      </div>
    </footer>
  );
};

export default Footer;
