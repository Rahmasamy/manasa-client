"use client";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
export default function QuestionComponent({
  questionType,
  questionText,
  questionAnswer,
  id,
}: {
  questionType: string;
  questionText: string;
  questionAnswer: string;
  id: number;
}) {
  const [openId, setOpenId] = useState<number | null>(null);
  const toggle = () => {
    setOpenId(openId === id ? null : id);
  };
  return (
    <div className="p-5 bg-white rounded-lg self-start w-full ">
      <span
        className={
          questionType === "خدمات التدريب"
            ? "bg-[#EAF5FA] p-2 rounded-full text-[#1D607C] m-2"
            : "bg-[#ECF9F3] p-2 rounded-full text-[#27724F] m-2"
        }
      >
        {questionType}
      </span>
      <div className="mt-3">
        <button
          onClick={toggle}
          className="flex items-center justify-between w-full gap-4"
        >
          <h1 className="text-[#1D607C] font-bold text-lg flex-1 text-right">
            {questionText}
          </h1>
          <span className="flex-shrink-0">
            {openId === id ? (
              <Minus className="w-6 h-6 text-[#004b6d]" />
            ) : (
              <Plus className="w-6 h-6 text-[#004b6d]" />
            )}
          </span>
        </button>

        {openId === id && (
          <div className="px-6 pb-6 pr-16 text-gray-600 leading-relaxed">
            {questionAnswer}
          </div>
        )}
      </div>
    </div>
  );
}
