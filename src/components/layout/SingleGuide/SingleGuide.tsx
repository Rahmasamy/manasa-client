import { services } from "@/src/lib/consts/services/services";
import React from "react";
import ServiceCard from "../../domain/ServiceComponent/ServiceComponent";
import { Button } from "@/components/ui/button";

export default function SingleGuide() {
  return (
    <div>
      <div className="w-full bg-gradient-to-br from-[#39A975] to-[#2885AC] min-h-[500px] flex flex-col items-center justify-center">
        <h2 className="text-center text-white font-bold text-5xl p-5">
          الأرشاد الأكاديمي{" "}
        </h2>
        <p className="text-center text-white font-bold text-xl p-5">
          25 دورة/ 7 اقسام
        </p>
      </div>
      <div className="w-full px-24 py-10">
        <div className="flex flex-col gap-4  mt-4">
          <h1 className="font-bold text-xl">خدمة موضوع البحث</h1>
          <p className="text-gray-500 font-semibold p-2 text-lg">
            تهدف هذه الخدمة إلى مساعدة الباحث في اختيار موضوع بحث دقيق وحديث
            ومناسب لتخصصه، وذلك من خلال تحليل اهتماماته ومعالجة الفجوات العلمية
            المتاحة في المجال، وتشمل الخدمة ترشيح موضوعات قابلة للدراسة، وتتوافر
            حولها مراجع ومصادر كافية، مع مراعاة معايير الجامعات والحداثة
            والأصالة، مما يمنح الباحث بداية قوية لبحث علمي متكامل.
          </p>
        </div>
        <div className="w-full flex justify-center items-center">

        <Button className="m-3 px-6 py-3">
            اطلب الخدمة
        </Button>
        </div>
        <section className="container mx-auto px-4 py-9">
            <h1 className="font-bold text-xl">
                خدمات أخري في التخطيط والتهيئة 
            </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
