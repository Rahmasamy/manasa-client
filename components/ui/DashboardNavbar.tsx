import Image from "next/image";
import React from "react";

const DashboardNavbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4"><Image
              src="/icons/logo.png"
              alt="Logo"
              width={90}
              height={90}
              className=" rounded-3xl w-33! h-33! object-cover"
            /></div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <div className="w-10 h-10  rounded-full flex items-center justify-center">
            <span className="font-semibold">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
                  fill="#18181B"
                />
                <path
                  d="M13.0453 27H8.80735V13.9091H13.1795C14.4622 13.9091 15.5637 14.1712 16.4842 14.6953C17.4047 15.2152 18.1099 15.9631 18.6 16.9389C19.0943 17.9105 19.3414 19.076 19.3414 20.4354C19.3414 21.799 19.0922 22.9709 18.5936 23.951C18.0993 24.9311 17.3833 25.6854 16.4458 26.2138C15.5083 26.7379 14.3748 27 13.0453 27ZM10.7825 25.2741H12.9366C13.9338 25.2741 14.7626 25.0866 15.4231 24.7116C16.0836 24.3324 16.5779 23.7848 16.9061 23.0689C17.2342 22.3487 17.3983 21.4709 17.3983 20.4354C17.3983 19.4084 17.2342 18.5369 16.9061 17.821C16.5822 17.1051 16.0985 16.5618 15.4551 16.1911C14.8116 15.8203 14.0126 15.6349 13.0581 15.6349H10.7825V25.2741ZM30.2159 13.9091H32.1974V22.5192C32.1974 23.4354 31.9822 24.2472 31.5518 24.9545C31.1214 25.6577 30.5163 26.2116 29.7365 26.6165C28.9567 27.017 28.0426 27.2173 26.9943 27.2173C25.9503 27.2173 25.0384 27.017 24.2585 26.6165C23.4787 26.2116 22.8736 25.6577 22.4432 24.9545C22.0128 24.2472 21.7976 23.4354 21.7976 22.5192V13.9091H23.7727V22.3594C23.7727 22.9517 23.9027 23.478 24.1626 23.9382C24.4268 24.3984 24.7997 24.7607 25.2812 25.0249C25.7628 25.2848 26.3338 25.4148 26.9943 25.4148C27.6591 25.4148 28.2322 25.2848 28.7138 25.0249C29.1996 24.7607 29.5703 24.3984 29.826 23.9382C30.0859 23.478 30.2159 22.9517 30.2159 22.3594V13.9091Z"
                  fill="#FCFCFC"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
export default DashboardNavbar;
