"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import BackgroundWrapper from "@/src/components/domain/BackgroundWrapper/BackgroundWrapper";
import BoxAuth from "@/src/components/domain/BoxAuth/BoxAuth";
import Image from "next/image";

import { CustomOTPInput } from "@/src/components/domain/customInput/CustomInput";

export default function OtpVerified() {
  const [otp, setOtp] = useState("");

  return (
    <BackgroundWrapper>
      <BoxAuth className="min-h-[390px]">
        <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center w-full h-full min-h-0 overflow-y-auto">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            width={110}
            height={110}
            className="bg-white rounded-3xl w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover flex-shrink-0"
          />

          <div className="text-center space-y-1 sm:space-y-2 w-full">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">تأكيد الرقم</h1>
            <p className="text-xs sm:text-sm text-gray-600">ادخل الكود المكون من 6 أرقام</p>
          </div>

          <div className="w-full flex justify-center">
            <CustomOTPInput
              length={6}
              onComplete={(code) => {
                setOtp(code);
                console.log("OTP Complete:", code);
              }}
            />
          </div>

          <p className="text-[#2885AC] font-semibold text-sm sm:text-base">00 : 30</p>

          <Button
            onClick={() => alert(`OTP: ${otp}`)}
            className="w-full text-white text-center bg-[#2885AC] py-2 sm:py-3 text-sm sm:text-base"
          >
            استمرار
          </Button>
        </div>
      </BoxAuth>
    </BackgroundWrapper>
  );
}
