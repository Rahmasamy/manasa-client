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
      <BoxAuth className="h-[390px]">
        <div className="flex flex-col gap-4 justify-center items-center">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            width={110}
            height={110}
            className="bg-white rounded-3xl object-cover"
          />

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">تأكيد الرقم</h1>
            <p className="text-gray-600">ادخل الكود المكون من 6 أرقام</p>
          </div>

          <CustomOTPInput
            length={6}
            onComplete={(code) => {
              setOtp(code);
              console.log("OTP Complete:", code);
            }}
          />

          <p className="text-[#2885AC] font-semibold">00 : 30</p>

          <Button
            onClick={() => alert(`OTP: ${otp}`)}
            className="w-full text-white text-center bg-[#2885AC] py-3"
          >
            استمرار
          </Button>
        </div>
      </BoxAuth>
    </BackgroundWrapper>
  );
}
