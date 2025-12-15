import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BackgroundWrapper from "@/src/components/domain/BackgroundWrapper/BackgroundWrapper";
import BoxAuth from "@/src/components/domain/BoxAuth/BoxAuth";
import Image from "next/image";

export default function Login() {
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
            <h1 className="text-xl font-bold ">مرحبا بعودتك</h1>
            <label htmlFor="email" className="text-md font-bold ">بريدك الالكتروني</label>
            <Input placeholder="أدخل بريدك الالكتروني" id="email" 
            className="bg-gray-200 rounded-sm p-3"
            />
            <label htmlFor="pass" className="text-md font-bold ">كلمة السر</label>
            <Input placeholder="أدخل كلمة السر" id="pass" className="bg-gray-200 rounded-sm p-3" />

            <Button className="w-full text-white text-center bg-[#2885AC] py-3">
              تسجيل دخول
            </Button>
          </div>
        </div>
      </BoxAuth>
    </BackgroundWrapper>
  );
}
