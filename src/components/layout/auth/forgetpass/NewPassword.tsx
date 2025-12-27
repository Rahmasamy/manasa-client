import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BackgroundWrapper from "@/src/components/domain/BackgroundWrapper/BackgroundWrapper";
import BoxAuth from "@/src/components/domain/BoxAuth/BoxAuth";
import Image from "next/image";
export default function NewPassword() {
  return (
     <BackgroundWrapper>
      <BoxAuth>
        <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center w-full h-full min-h-0 overflow-y-auto">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            width={110}
            height={110}
            className="bg-white rounded-3xl w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover flex-shrink-0"
          />
          <div className="flex flex-col gap-2 sm:gap-3 justify-start w-full min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-center sm:text-right">كلمة سر جديدة</h1>
             <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-right">ادخل الكود المكون من 4 اراقم علي هاتفك</p>
            <label htmlFor="email" className="text-sm sm:text-md font-bold">كلمة السر الجديدة</label>
            <Input placeholder="أدخل كلمة السر الجديدة" id="email" 
            className="bg-gray-200 rounded-sm p-2 sm:p-3 w-full min-w-0"
            />
            <label htmlFor="pass" className="text-sm sm:text-md font-bold"> تأكيد كلمة السر </label>
            <Input placeholder="  تأكيد كلمة السر" id="pass" className="bg-gray-200 rounded-sm p-2 sm:p-3 w-full min-w-0" />

            <Button className="w-full text-white text-center bg-[#2885AC] py-2 sm:py-3 text-sm sm:text-base">
             تأكيد
            </Button>
          </div>
        </div>
      </BoxAuth>
    </BackgroundWrapper>
  )
}
