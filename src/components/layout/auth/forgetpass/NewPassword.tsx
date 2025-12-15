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
        <div className="flex flex-col gap-4 justify-center items-center">
          <Image
            src="/icons/logo.png"
            alt="Logo"
            width={110}
            height={110}
            className="bg-white rounded-3xl w-33! h-33! object-cover"
          />
          <div className="flex flex-col gap-3 justify-start w-full">
            <h1 className="text-xl font-bold ">كلمة سر جديدة</h1>
             <p>ادخل الكود المكون من 4 اراقم علي هاتفك</p>
            <label htmlFor="email" className="text-md font-bold ">كلمة السر الجديدة

            </label>
            <Input placeholder="أدخل كلمة السر الجديدة" id="email" 
            className="bg-gray-200 rounded-sm p-3"
            />
            <label htmlFor="pass" className="text-md font-bold "> تأكيد كلمة السر </label>
            <Input placeholder="  تأكيد كلمة السر" id="pass" className="bg-gray-200 rounded-sm p-3" />

            <Button className="w-full text-white text-center bg-[#2885AC] py-3">
             تأكيد
            </Button>
          </div>
        </div>
      </BoxAuth>
    </BackgroundWrapper>
  )
}
