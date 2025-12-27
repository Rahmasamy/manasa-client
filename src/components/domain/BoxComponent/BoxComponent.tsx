import { BoxComponentProps } from "@/src/types/BoxComponentTypes/BoxComponentTypes";
import Link from "next/link";

export default function BoxComponent({
  title,
  description,
  icon,
  footerTitle,
  link,
}: BoxComponentProps) {
  const content = (
    <div className="border-2 border-[#2885AC] rounded-xl p-5 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#2885AC]/80 cursor-pointer">
      <div className="flex gap-3 items-start">
        <div className="flex-shrink-0 mt-1">{icon}</div>
        <div className="flex-1">
          <h2 className="font-bold py-2 text-lg text-gray-800">{title}</h2>
          <p className="text-gray-600 pb-3 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="flex justify-end items-center text-[#2885AC] font-semibold py-2 border-t border-gray-100 mt-2">
        <h3 className="text-sm">{footerTitle}</h3>
      </div>
    </div>
  );

  if (link) {
    return <Link href={link}>{content}</Link>;
  }

  return content;
}
