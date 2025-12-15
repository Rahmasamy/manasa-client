import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BackgroundWrapper from "@/src/components/domain/BackgroundWrapper/BackgroundWrapper";
import BoxAuth from "@/src/components/domain/BoxAuth/BoxAuth";
import Image from "next/image";

export default function ForgetPass() {
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
            <h1 className="text-xl font-bold ">نسيت كلمة السر؟</h1>
            <p>ادخل رقم هاتفك للتاكيد,شوف نرسل لك كود علي رقمك</p>
            <label htmlFor="email" className="text-md font-bold ">
              رقم الهاتف
            </label>
            <Input
              placeholder="أدخل رقم الهاتف "
              id="email"
              className="bg-gray-200 rounded-sm p-3"
            />

            <Button className="w-full text-white text-center bg-[#2885AC] py-3">
              استمرار{" "}
            </Button>
          </div>
        </div>
      </BoxAuth>
    </BackgroundWrapper>
  );
}
