import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div
      id="hero"
      className="min-h-screen"
      style={{
        backgroundImage: 'url("/hero.svg")',
        backgroundSize: "cover",
        backgroundPosition: "unset",
      }}
    >
      {/* Content */}
      <div className="container min-h-screen mx-auto pt-40 pb-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Images */}

        <div className="text-black">
          <h1 className="text-4xl font-bold leading-relaxed mb-4">
            نُلهم الباحثين… ونوجّههم نحو التميُّز الأكاديمي
          </h1>
          <p className="text-lg opacity-90 mb-6 text-[#71717A]">
            انضم إلى بوابة العلوم الإنسانية، حيث الإرشاد الأكاديمي والتدريب
            النوعي بأيدي خبراء معتمدين، لتمكينك من تطوير مهاراتك وتحقيق إنجازات
            أكاديمية تواكب المستقبل.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mb-6">
            <Button className="rounded-lg px-9 py-4">
              اطلب الخدمة الآن
            </Button>
            <Button
              variant="outline"
              className="px-9 py-4"
            >
              اطلب استشارة مجانية
            </Button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 w-full max-w-sm bg-white rounded-lg ">
            <input
              className="flex-1 outline-none text-gray-700 px-4 py-2 rounded-lg "
              placeholder="ابحث عما تريده هنا"
            />
            <Button className="bg-[#0B72B9] hover:bg-[#0B72B9]/90 text-white rounded-lg px-6">
              بحث
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Image
              src="/imgs/hero-1.jpg"
              alt="students"
              width={270}
              height={350}
              className="rounded-2xl shadow-lg h-96 w-[300px] object-cover"
            />
            <Image
              src="/imgs/hero-2.jpg"
              alt="people"
              width={270}
              height={350}
              className="rounded-2xl shadow-lg h-96 w-[300px] object-cover relative top-24"
            />
          </div>
          <div className="bg-[#0B72B9] text-white p-4 rounded-xl shadow-md w-fit relative bottom-20 right-5">
            <ul className="space-y-2 text-sm ">
              <li className="flex gap-3 items-center">
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#FCFCFC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                المنصة لها سجل تجاري
              </li>
              <li className="flex gap-3 items-center">
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#FCFCFC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                منصة نظامية إلكترونية
              </li>
              <li className="flex gap-3 items-center">
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#FCFCFC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                تضمن أوراق رسمية للالتزام بالخدمات
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
