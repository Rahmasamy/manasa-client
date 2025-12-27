import { Represntations } from "@/src/lib/consts/WhatRepersant/WhatRepersant";
import React from "react";
import BoxComponent from "../../domain/BoxComponent/BoxComponent";

export default function WhatRepresent() {
  return (
    <div className="flex flex-col gap-2 px-4 sm:px-8 lg:px-24 py-8 sm:py-10">
      <h2 className="font-bold p-2 text-base sm:text-lg lg:text-xl">ماذا نقدم لك؟</h2>
      <p className="text-[#3c3c40] py-2 text-sm sm:text-base">نقدّم لك كل ما تحتاجه لتطوير نفسك وتحقيق أهدافك بثقة.</p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {Represntations.map((item, index) => (
        <BoxComponent
          key={index}
          title={item.title}
          description={item.description}
          icon={item.icon}
          footerTitle={item.footer}
          className={item.className}
          link={item.link}
        />
      ))}
    </div>
    </div>
  );
}
